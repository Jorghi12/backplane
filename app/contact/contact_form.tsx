// app/contact/ContactForm.tsx
'use client';

import { useActionState } from 'react';
import { SubmitButton } from '../(dashboard)/pricing/submit-button';
import { Building2, Mail, User, Cloud, MessageSquareText } from 'lucide-react';
import { contactAction, type Result } from './actions';

export function ContactForm({
  defaultName = '',
  defaultEmail = '',
  defaultCompany = '',
  defaultRole = '',
  defaultCloud = '',
  defaultTopic = 'demo',
  hiddenPlan = '',
  utm = {},
}: {
  defaultName?: string;
  defaultEmail?: string;
  defaultCompany?: string;
  defaultRole?: string;
  defaultCloud?: string;
  defaultTopic?: 'demo' | 'security' | 'pricing' | 'partnership';
  hiddenPlan?: string;
  utm?: Record<string, string>;
}) {
  const initial: Result = { ok: false, error: null, fieldErrors: {} };
  const [state, formAction] = useActionState<Result, FormData>(contactAction, initial);

  return (
    <form action={formAction} className="rounded-xl bg-white border border-gray-200 p-6 grid gap-4" noValidate>
      {/* Anti‑spam: time trap + honeypot + UTM passthrough */}
      <input type="hidden" name="form_started_at" value={String(Date.now())} />
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {hiddenPlan ? <input type="hidden" name="plan" value={hiddenPlan} /> : null}
      {Object.entries(utm).map(([k, v]) => (
        <input key={k} type="hidden" name={`utm_${k}`} value={v} />
      ))}

      {/* Success / error banners */}
      {state.ok && state.success ? (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-gray-800">
          <div className="font-medium">{state.success}</div>
          <div className="mt-1">We’ll reply within one business day with the fastest path to a governed canary and a certified rollout.</div>
        </div>
      ) : null}

      {!state.ok && state.error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {state.error}
        </div>
      ) : null}

      <div className="grid sm:grid-cols-2 gap-4">
        <LabeledInput
          type="text"
          name="name"
          label="Full name"
          defaultValue={defaultName}
          error={state.fieldErrors?.name}
          icon={<User className="h-4 w-4" />}
          autoComplete="name"
        />
        <LabeledInput
          type="email"
          name="email"
          label="Work email"
          required
          defaultValue={defaultEmail}
          error={state.fieldErrors?.email}
          icon={<Mail className="h-4 w-4" />}
          autoComplete="email"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <LabeledInput
          type="text"
          name="company"
          label="Company"
          defaultValue={defaultCompany}
          error={state.fieldErrors?.company}
          icon={<Building2 className="h-4 w-4" />}
        />
        <LabeledInput
          type="text"
          name="role"
          label="Role"
          defaultValue={defaultRole}
          error={state.fieldErrors?.role}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <LabeledInput
          type="text"
          name="cloud"
          label="Cloud(s)"
          placeholder="AWS, GCP, Azure"
          defaultValue={defaultCloud}
          error={state.fieldErrors?.cloud}
          icon={<Cloud className="h-4 w-4" />}
        />
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-900">Topic</label>
          <select
            id="topic"
            name="topic"
            defaultValue={defaultTopic}
            className="mt-1 h-11 w-full rounded-md border border-gray-300 px-3 text-sm text-gray-900"
          >
            <option value="demo">Demo</option>
            <option value="security">Security brief</option>
            <option value="pricing">Pricing</option>
            <option value="partnership">Partnership</option>
          </select>
          {state.fieldErrors?.topic ? <p className="mt-1 text-xs text-red-600">{state.fieldErrors.topic}</p> : null}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-900">
          Message <span className="text-red-600">*</span>
        </label>
        <div className="mt-1 relative">
          <textarea
            id="message"
            name="message"
            required
            rows={7}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900"
            placeholder="What are you building? What does success in 30/60/90 days look like? Mention SSO provider, data platforms, and must‑have controls."
          />
          <MessageSquareText className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
        </div>
        {state.fieldErrors?.message ? <p className="mt-1 text-xs text-red-600">{state.fieldErrors.message}</p> : null}
        <p className="mt-1 text-xs text-gray-500">We respond within one business day. Procurement support (MSA, DPA, marketplace) available.</p>
      </div>

      <SubmitButton label="Send request" pendingLabel="Sending…" variant="default" />
    </form>
  );
}

function LabeledInput({
  type = 'text',
  name,
  label,
  required,
  autoComplete,
  placeholder,
  icon,
  defaultValue,
  error,
}: {
  type?: React.HTMLInputTypeAttribute;
  name: string;
  label: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  defaultValue?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-900">
        {label}{required ? ' *' : ''}
      </label>
      <div className="mt-1 relative">
        <input
          id={name}
          type={type}
          name={name}
          defaultValue={defaultValue}
          required={required}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          className="h-11 w-full rounded-md border border-gray-300 px-3 pr-9 text-sm text-gray-900"
        />
        {icon ? <span className="absolute right-3 top-3 text-gray-400">{icon}</span> : null}
      </div>
      {error ? <p id={`${name}-error`} className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
