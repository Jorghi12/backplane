// app/contact/page.tsx
import { ContactForm } from './contact_form';
import { Shield, FileText, Cloud as CloudIcon } from 'lucide-react';
import { getUser } from '@/lib/db/queries';

export const metadata = { title: 'Contact — TrustPlane' };

export default async function ContactPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  // Prefill from signed-in user if available
  const user = await getUser();

  // Map query params -> default topic
  // /contact?topic=security (from Security page) /contact?plan=enterprise (from Pricing)
  const topicParam = (searchParams?.topic as string) || '';
  const planParam = (searchParams?.plan as string) || '';
  const defaultTopic =
    topicParam === 'security' ? 'security' :
    topicParam === 'pricing' ? 'pricing' :
    planParam === 'enterprise' ? 'pricing' :
    'demo';

  // Capture common UTM params if present
  const utm: Record<string, string> = {};
  ['source', 'medium', 'campaign', 'term', 'content'].forEach((k) => {
    const v = searchParams?.[`utm_${k}`] as string | undefined;
    if (v) utm[k] = v;
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
          Share your workloads and success criteria. We’ll respond within one business day with the fastest path to a governed canary and a certified rollout.
        </p>
      </header>

      {/* Trust signals */}
      <div className="rounded-xl bg-white border border-gray-200 p-4 mb-6 grid gap-3 md:grid-cols-3">
        <Signal icon={<Shield className="h-4 w-4" />} title="Runs in your VPC" />
        <Signal icon={<FileText className="h-4 w-4" />} title="Security pack on request" />
        <Signal icon={<CloudIcon className="h-4 w-4" />} title="AWS · GCP · Azure" />
      </div>

      <ContactForm
        defaultName={user?.name || ''}
        defaultEmail={user?.email || ''}
        //defaultCompany={user?.company || ''}
        defaultRole={user?.role || ''}
        defaultCloud=""
        defaultTopic={defaultTopic as any}
        hiddenPlan={planParam}
        utm={utm}
      />

      <p className="mt-6 text-xs text-gray-500">By submitting, you agree to our Privacy and Terms.</p>
      <div className="mt-6 text-sm text-gray-600">
        Prefer email? Write to <a className="underline hover:text-gray-900" href="mailto:hello@trustplane.example">hello@trustplane.example</a>.
      </div>
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
