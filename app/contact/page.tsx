// app/contact/page.tsx
import { ContactForm } from './contact_form';
import { Cloud, FileText, Shield } from 'lucide-react';

export const metadata = { title: 'Contact — TrustPlane' };

type SearchParams = {
  plan?: string;
  topic?: 'demo' | 'security' | 'pricing' | 'partnership';
  name?: string;
  email?: string;
  company?: string;
  role?: string;
  cloud?: string;
  [k: string]: string | string[] | undefined;
};

export default function ContactPage({ searchParams }: { searchParams: SearchParams }) {
  const plan = (searchParams.plan ?? '') as string;
  const topic = (searchParams.topic ?? 'demo') as 'demo' | 'security' | 'pricing' | 'partnership';

  // collect utm_* passthroughs
  const utm: Record<string, string> = {};
  Object.keys(searchParams).forEach((k) => {
    if (k.startsWith('utm_')) {
      const v = searchParams[k];
      if (typeof v === 'string') utm[k.slice(4)] = v;
    }
  });

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
          Share your workloads and success criteria. We’ll respond within one business day with the fastest path
          to a governed canary and a certified rollout.
        </p>
      </header>

      {/* Trust signals */}
      <div className="rounded-xl bg-white border border-gray-200 p-4 mb-6 grid gap-3 md:grid-cols-3">
        <Signal icon={<Shield className="h-4 w-4" />} title="Runs in your VPC" />
        <Signal icon={<FileText className="h-4 w-4" />} title="Security pack on request" />
        <Signal icon={<Cloud className="h-4 w-4" />} title="AWS · GCP · Azure" />
      </div>

      <ContactForm
        defaultName={(searchParams.name as string) || ''}
        defaultEmail={(searchParams.email as string) || ''}
        defaultCompany={(searchParams.company as string) || ''}
        defaultRole={(searchParams.role as string) || ''}
        defaultCloud={(searchParams.cloud as string) || ''}
        defaultTopic={topic}
        hiddenPlan={plan}
        utm={utm}
      />

      <p className="mt-6 text-xs text-gray-500">By submitting, you agree to our Privacy and Terms.</p>
    </main>
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
