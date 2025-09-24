// app/contact/actions.ts
'use server';

import { z } from 'zod';

/** Per-field error bag used by the client to show messages inline. */
export type FieldErrors = Partial<{
  name: string;
  email: string;
  company: string;
  role: string;
  cloud: string;
  topic: string;
  message: string;
}>;

/** Single-shaped result so the client can always read `error` / `fieldErrors`. */
export type Result = {
  ok: boolean;
  error?: string | null;
  success?: string;
  fieldErrors?: FieldErrors;
};

const schema = z
  .object({
    name: z.string().trim().max(120).optional(),
    email: z.string().trim().email('Enter a valid work email'),
    company: z.string().trim().max(200).optional(),
    role: z.string().trim().max(200).optional(),
    cloud: z.string().trim().max(200).optional(),
    topic: z.enum(['demo', 'security', 'pricing', 'partnership']).default('demo'),
    message: z.string().trim().min(10, 'Please add a bit more detail.'),
    plan: z.string().optional(),
    // anti-spam helpers
    website: z.string().max(0).optional(),        // honeypot: any value = bot
    form_started_at: z.string().optional()        // can be used as an additional time-trap
  })
  .passthrough(); // keep UTM params (utm_*) without failing validation

/** React `useActionState`-compatible server action. */
export async function contactAction(
  _prev: Result,
  formData: FormData
): Promise<Result> {
  const obj = Object.fromEntries(formData.entries());

  // Validation
  const parsed = schema.safeParse(obj);
  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();
    const fe: FieldErrors = {};
    for (const [k, v] of Object.entries(fieldErrors)) {
      if (v && v.length) {
        // k is unknown string; narrow to FieldErrors keys where applicable
        (fe as Record<string, string>)[k] = v[0];
      }
    }
    return { ok: false, error: 'Please fix the highlighted fields.', fieldErrors: fe };
  }

  // Honeypot: if "website" was filled, silently succeed to thwart bots.
  if (parsed.data.website) {
    return { ok: true, success: 'Thanks — request received.' };
  }

  const {
    name = '',
    email,
    company = '',
    role = '',
    cloud = '',
    topic,
    plan = '',
    message
  } = parsed.data;

  // Post to a webhook if configured; else log to console (your existing behavior).
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  const payload = {
    text:
`New TrustPlane contact:
- Name: ${name || '—'}
- Email: ${email}
- Company: ${company || '—'}
- Role: ${role || '—'}
- Cloud(s): ${cloud || '—'}
- Topic: ${topic}${plan ? ` (plan: ${plan})` : ''}
- Message: ${message}`
  };

  try {
    if (webhook) {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } else {
      // mirrors your previous console fallback
      console.log('Contact form submission:', { name, email, company, role, cloud, topic, plan, message });
    }
  } catch {
    // Don’t block UX on webhook failure; still show success but note the error server-side if desired
    console.warn('CONTACT_WEBHOOK_URL call failed.');
  }

  return { ok: true, success: 'Thanks — request received.' };
}
