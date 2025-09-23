// app/contact/actions.ts
'use server';

import { headers } from 'next/headers';
import { z } from 'zod';

export type Result = {
  ok: boolean;
  error: string | null;
  fieldErrors?: Record<string, string>;
};

const schema = z.object({
  name: z.string().max(200).optional().default(''),
  email: z.string().email('Enter a valid work email'),
  company: z.string().max(200).optional().default(''),
  role: z.string().max(200).optional().default(''),
  cloud: z.string().max(200).optional().default(''),
  topic: z.enum(['demo', 'security', 'pricing', 'partnership']).default('demo'),
  message: z.string().min(10, 'Please provide a bit more detail (≥ 10 characters)'),
  website: z.string().max(0).optional().default(''),                // honeypot
  form_started_at: z.string().transform((s) => Number(s) || 0),    // time-trap
  plan: z.string().optional().default(''),
}).refine((data) => !/@(gmail|yahoo|outlook|hotmail)\./i.test(data.email), {
  path: ['email'],
  message: 'Please use your work email (no personal domains)',
});

export async function contactAction(formData: FormData): Promise<Result> {
  const parsed = schema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    parsed.error.issues.forEach((i) => {
      const key = (i.path[0] as string) || 'form';
      fieldErrors[key] = i.message;
    });
    return { ok: false, error: 'Please fix the highlighted fields.', fieldErrors };
  }

  const data = parsed.data;

  // Basic anti-bot: honeypot and < 3s submit time
  const tooFast = Date.now() - (data.form_started_at || 0) < 3000;
  if (data.website || tooFast) {
    return { ok: true, error: null }; // pretend success to avoid probing
  }

  // Optional Slack/Teams webhook (won’t throw)
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  const h = headers();
  const meta = {
    ip: (await h).get('x-forwarded-for') || '',
    ua: (await h).get('user-agent') || '',
    referer: (await h).get('referer') || '',
  };

  if (webhook) {
    const payload = {
      text: `New TrustPlane contact:
- Name: ${data.name || '—'}
- Email: ${data.email}
- Company: ${data.company || '—'}
- Role: ${data.role || '—'}
- Cloud(s): ${data.cloud || '—'}
- Topic: ${data.topic}${data.plan ? ` (plan: ${data.plan})` : ''}
- Message: ${data.message}
- Meta: ip=${meta.ip} ua=${meta.ua} ref=${meta.referer}`,
    };
    try {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch {
      // Do not surface webhook errors to the user
    }
  } else {
    console.log('Contact form submission:', { ...data, meta });
  }

  return { ok: true, error: null };
}
