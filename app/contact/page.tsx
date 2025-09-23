// app/contact/page.tsx
import { contactAction } from './actions';
import { SubmitButton } from '../(dashboard)/pricing/submit-button';
import { Building2, Mail, User, Cloud, MessageSquareText, Shield, FileText } from 'lucide-react';

export const metadata = { title: 'Contact — TrustPlane' };

export default function ContactPage() {
  // Wrap the server action so the form action returns Promise<void>
  async function submit(formData: FormData) {
    'use server';
    await contactAction(formData);
  }

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8">
        <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
          Talk to engineering
        </span>
        <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
          Request a demo, security brief, or pricing
        </h1>
        <p className="mt-3 text-gray-600">
          Share your workloads and success criteria. We’ll respond within one business day with the fastest path to a governed canary and a certified rollout.
        </p>
      </header>

      {/* Trust signals */}
      <div className="rounded-xl bg-white border border-gray-200 p-4 mb-6 grid gap-3 md:grid-cols-3">
        <Signal icon={<Shield className="h-4 w-4" />} title="Runs in your VPC" />
        <Signal icon={<FileText className="h-4 w-4" />} title="Security pack on request" />
        <Signal icon={<Cloud className="h-4 w-4" />} title="AWS · GCP · Azure" />
      </div>

      <form action={submit} className="rounded-xl bg-white border border-gray-200 p-6 grid gap-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <LabeledInput type="text" name="name" label="Full name" icon={<User className="h-4 w-4" />} autoComplete="name" />
          <LabeledInput type="email" name="email" label="Work email" required icon={<Mail className="h-4 w-4" />} autoComplete="email" />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <LabeledInput type="text" name="company" label="Company" icon={<Building2 className="h-4 w-4" />} />
          <LabeledInput type="text" name="role" label="Role" />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <LabeledInput type="text" name="cloud" label="Cloud(s)" placeholder="AWS, GCP, Azure" icon={<Cloud className="h-4 w-4" />} />
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-900">Topic</label>
            <select id="topic" name="topic" className="mt-1 h-11 w-full rounded-md border border-gray-300 px-3 text-sm text-gray-900" defaultValue="demo">
              <option value="demo">Demo</option>
              <option value="security">Security brief</option>
              <option value="pricing">Pricing</option>
              <option value="partnership">Partnership</option>
            </select>
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
          <p className="mt-1 text-xs text-gray-500">
            We respond within one business day. Procurement support (MSA, DPA, marketplace) available.
          </p>
        </div>

        <SubmitButton label="Send request" pendingLabel="Sending…" variant="default" />
      </form>

      <p className="mt-6 text-xs text-gray-500">By submitting, you agree to our Privacy and Terms.</p>

      {/* Extra contact routes */}
      <div className="mt-6 text-sm text-gray-600">
        Prefer email? Write to <a className="underline hover:text-gray-900" href="mailto:hello@trustplane.example">hello@trustplane.example</a>.
      </div>
    </main>
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
}: {
  type?: React.HTMLInputTypeAttribute;
  name: string;
  label: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  icon?: React.ReactNode;
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
          required={required}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className="h-11 w-full rounded-md border border-gray-300 px-3 pr-9 text-sm text-gray-900"
        />
        {icon ? <span className="absolute right-3 top-3 text-gray-400">{icon}</span> : null}
      </div>
    </div>
  );
}

function Signal({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="border border-gray-200 rounded-lg p-3 bg-white/60 flex items-center gap-2">
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-orange-500/10 text-orange-700">
        {icon}
      </span>
      <span className="text-sm font-medium text-gray-900">{title}</span>
    </div>
  );
}
