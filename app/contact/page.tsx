// app/contact/page.tsx
import { contactAction } from './actions';
import { SubmitButton } from '../(dashboard)/pricing/submit-button';
import { Building2, Mail, User, Cloud, MessageSquareText } from 'lucide-react';

export const metadata = {
  title: 'Contact — TrustPlane',
};

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
          Tell us about your workloads and requirements. We’ll reply with the fastest path to a
          governed, economical production rollout.
        </p>
      </header>

      <form action={submit} className="rounded-xl bg-white border border-gray-200 p-6 grid gap-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <LabeledInput
            type="text"
            name="name"
            label="Full name"
            icon={<User className="h-4 w-4" />}
            autoComplete="name"
          />
          <LabeledInput
            type="email"
            name="email"
            label="Work email"
            required
            icon={<Mail className="h-4 w-4" />}
            autoComplete="email"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <LabeledInput
            type="text"
            name="company"
            label="Company"
            icon={<Building2 className="h-4 w-4" />}
          />
          <LabeledInput type="text" name="role" label="Role" />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <LabeledInput
            type="text"
            name="cloud"
            label="Cloud(s)"
            placeholder="AWS, GCP, Azure"
            icon={<Cloud className="h-4 w-4" />}
          />
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-900">
              Topic
            </label>
            <select
              id="topic"
              name="topic"
              className="mt-1 h-11 w-full rounded-md border border-gray-300 px-3 text-sm text-gray-900"
              defaultValue="demo"
            >
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
              rows={6}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900"
              placeholder="What are you building and what would success look like?"
            />
            <MessageSquareText className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
          </div>
          <p className="mt-1 text-xs text-gray-500">We respond within one business day.</p>
        </div>

        <SubmitButton label="Send request" pendingLabel="Sending…" variant="default" />
      </form>

      <p className="mt-6 text-xs text-gray-500">
        By submitting, you agree to our Privacy and Terms.
      </p>
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
        {label}
        {required ? ' *' : ''}
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
