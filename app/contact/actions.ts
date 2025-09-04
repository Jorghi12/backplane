// app/contact/actions.ts
'use server';

type Result =
  | { ok: true }
  | { ok: false; error: string };

export async function contactAction(formData: FormData): Promise<Result> {
  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const company = String(formData.get('company') || '').trim();
  const role = String(formData.get('role') || '').trim();
  const cloud = String(formData.get('cloud') || '').trim();
  const message = String(formData.get('message') || '').trim();
  const topic = String(formData.get('topic') || '').trim();

  if (!email || !message) {
    return { ok: false, error: 'Email and message are required.' };
  }

  // Optional: post to Slack/MS Teams webhook if configured
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    const payload = {
      text: `New Backplane contact:
- Name: ${name || '—'}
- Email: ${email}
- Company: ${company || '—'}
- Role: ${role || '—'}
- Cloud(s): ${cloud || '—'}
- Topic: ${topic || '—'}
- Message: ${message}`,
    };

    await fetch(webhook, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      // We intentionally don't throw on non‑200 to avoid blocking UX
    }).catch(() => {});
  } else {
    console.log('Contact form submission:', { name, email, company, role, cloud, topic, message });
  }

  return { ok: true };
}
