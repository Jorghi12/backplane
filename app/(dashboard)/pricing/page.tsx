import { checkoutAction } from '@/lib/payments/actions';
import { getStripePrices, getStripeProducts } from '@/lib/payments/stripe';
import { SubmitButton } from './submit-button';
import { Check, Shield, Clock, FileCheck2, KeyRound } from 'lucide-react';
import Link from 'next/link';

// Prices are fresh for one hour max
export const revalidate = 3600;

type Price = {
  id: string;
  productId: string;
  unitAmount: number; // cents
  interval: 'month' | 'year' | string;
  trialPeriodDays?: number | null;
};

type Product = {
  id: string;
  name: string;
};

export default async function PricingPage() {
  const [prices, products] = await Promise.all([getStripePrices(), getStripeProducts()]);

  const findProductId = (name: string) => (products as Product[]).find((p) => p.name === name)?.id;
  const findPrice = (productName: string, interval: 'month' | 'year') => {
    const pid = findProductId(productName);
    return (prices as Price[]).find((p) => p.productId === pid && p.interval === interval);
  };

  // Base
  const baseMonthly = findPrice('Base', 'month');
  const baseYearly = findPrice('Base', 'year');
  const baseTrial = baseMonthly?.trialPeriodDays ?? baseYearly?.trialPeriodDays ?? 7;

  // Plus
  const plusMonthly = findPrice('Plus', 'month');
  const plusYearly = findPrice('Plus', 'year');
  const plusTrial = plusMonthly?.trialPeriodDays ?? plusYearly?.trialPeriodDays ?? 7;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <section className="text-center mb-12">
        <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700">
          In‑VPC request‑path control plane
        </span>
        <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
          Pricing aligned to <span className="text-orange-600">time‑to‑live</span>
        </h1>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Start with a {Math.max(baseTrial, plusTrial)}‑day free trial. Bring your own clouds and models—no compute resell.
          When you route inference/tools through TrustPlane, you gain cost/showback, per‑action audit, and promotion gates.
        </p>
      </section>

      {/* Plans */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Base */}
        <PlanCard
          name="Base"
          badge={null}
          monthly={baseMonthly?.unitAmount ?? 800}
          yearly={baseYearly?.unitAmount}
          monthlyPriceId={baseMonthly?.id}
          yearlyPriceId={baseYearly?.id}
          intervalLabel="per user / month"
          trialDays={baseTrial}
          features={[
            'Governed canary kit',
            'Read‑first connectors',
            'Per‑team cost/showback',
            'Email support',
          ]}
        />

        {/* Plus */}
        <PlanCard
          name="Plus"
          badge="Most popular"
          highlight
          monthly={plusMonthly?.unitAmount ?? 1200}
          yearly={plusYearly?.unitAmount}
          monthlyPriceId={plusMonthly?.id}
          yearlyPriceId={plusYearly?.id}
          intervalLabel="per user / month"
          trialDays={plusTrial}
          features={[
            'Everything in Base',
            'Action Certificates',
            'SIEM/OTel export (Datadog/Splunk)',
            '24/7 support + Slack access',
          ]}
        />

        {/* Enterprise */}
        <EnterpriseCard />
      </div>

      {/* Comparison */}
      <Comparison />

      {/* Value proof strip */}
      <section className="mt-16 rounded-xl border border-gray-200 bg-white/60 p-6">
        <h3 className="text-lg font-semibold text-gray-900">What you unlock when traffic flows through TrustPlane</h3>
        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-700">
          <Value icon={<Clock className="h-5 w-5" />} title="≤ 7 days TTE" desc="Time‑to‑evidence for governed canary." />
          <Value icon={<Shield className="h-5 w-5" />} title="Deterministic audit" desc="Per‑action lineage + policy hashes." />
          <Value icon={<KeyRound className="h-5 w-5" />} title="SSO & SCIM" desc="Okta, Entra ID, Ping—least‑privilege roles." />
          <Value icon={<FileCheck2 className="h-5 w-5" />} title="Evidence packs" desc="Export for EU AI Act / NIST AI RMF." />
        </div>
      </section>

      {/* FAQ */}
      <FAQ />
    </main>
  );
}

/* ----------------------------- Components ----------------------------- */

function Value({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-lg border border-gray-200 p-4 flex items-start gap-3 bg-white/60">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-orange-500/10 text-orange-700">{icon}</span>
      <div>
        <div className="text-sm font-medium text-gray-900">{title}</div>
        <div className="text-sm text-gray-600">{desc}</div>
      </div>
    </div>
  );
}

function formatUsd(cents?: number) {
  if (typeof cents !== 'number') return '';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(cents / 100);
}

function savePercent(monthlyCents?: number, yearlyCents?: number) {
  if (!monthlyCents || !yearlyCents) return null;
  const annualAtMonthly = monthlyCents * 12;
  if (annualAtMonthly === 0) return null;
  return Math.max(0, Math.round((1 - yearlyCents / annualAtMonthly) * 100));
}

function PlanCard({
  name,
  badge,
  highlight = false,
  monthly,
  yearly,
  monthlyPriceId,
  yearlyPriceId,
  intervalLabel,
  trialDays,
  features,
}: {
  name: string;
  badge?: string | null;
  highlight?: boolean;
  monthly?: number;
  yearly?: number;
  monthlyPriceId?: string;
  yearlyPriceId?: string;
  intervalLabel: string;
  trialDays: number;
  features: string[];
}) {
  const savings = savePercent(monthly, yearly);

  return (
    <div className={['relative rounded-2xl border p-6 shadow-sm', highlight ? 'border-orange-300 ring-1 ring-orange-200' : 'border-gray-200', 'bg-white/60'].join(' ')}>
      {badge ? <div className="absolute -top-3 left-6 inline-flex items-center rounded-full bg-orange-600 px-3 py-1 text-xs font-semibold text-white shadow">{badge}</div> : null}

      <h2 className="text-2xl font-semibold text-gray-900">{name}</h2>
      <p className="mt-1 text-sm text-gray-600">Includes {trialDays}-day free trial</p>

      <div className="mt-4">
        <div className="text-4xl font-semibold text-gray-900">
          {formatUsd(monthly)} <span className="text-base font-normal text-gray-600">{intervalLabel}</span>
        </div>
        {yearly ? (
          <p className="mt-1 text-sm text-gray-600">
            or {formatUsd(yearly / 12)} / user / month{' '}
            <span className="text-gray-500">(billed annually{typeof savings === 'number' ? ` — save ${savings}%` : ''})</span>
          </p>
        ) : null}
      </div>

      <ul className="mt-6 space-y-3">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start">
            <Check className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTAs */}
      <div className="mt-6 space-y-3">
        {monthlyPriceId ? (
          <form action={checkoutAction}>
            <input type="hidden" name="priceId" value={monthlyPriceId} />
            <SubmitButton label="Start monthly" variant={highlight ? 'default' : 'outline'} className="w-full rounded-full" />
          </form>
        ) : null}

        {yearlyPriceId ? (
          <form action={checkoutAction}>
            <input type="hidden" name="priceId" value={yearlyPriceId} />
            <SubmitButton label={typeof savings === 'number' ? `Start annual — save ${savings}%` : 'Start annual'} variant={highlight ? 'outline' : 'default'} className="w-full rounded-full" />
          </form>
        ) : null}
      </div>
    </div>
  );
}

function EnterpriseCard() {
  return (
    <div className="relative rounded-2xl border border-gray-200 bg-white/60 p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-900">Enterprise</h2>
      <p className="mt-1 text-sm text-gray-600">Custom pricing &amp; deployment for regulated and large‑scale workloads</p>

      <div className="mt-4 text-3xl font-semibold text-gray-900">Let’s scope it</div>
      <p className="mt-1 text-sm text-gray-600">In‑VPC deployment, SSO/SAML, dedicated SLA</p>

      <ul className="mt-6 space-y-3">
        {[
          'In‑VPC deployment (AWS/GCP/Azure)',
          'Advanced governance & audit',
          'Priority on‑call + dedicated Slack',
          'Security review & procurement support',
          'Marketplace procurement (AWS/GCP/Azure)',
          'MSA, DPA, and data‑residency options',
        ].map((f, i) => (
          <li key={i} className="flex items-start">
            <Check className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <Link href="/contact?plan=enterprise" className="inline-flex w-full items-center justify-center rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
          Contact sales
        </Link>
      </div>
    </div>
  );
}

function Comparison() {
  return (
    <section className="mt-16">
      <h3 className="text-lg font-semibold text-gray-900">What’s in each plan</h3>
      <div className="mt-4 grid gap-4 rounded-xl border border-gray-200 bg-white/60 p-6 md:grid-cols-3">
        <div>
          <h4 className="font-medium text-gray-900">Base</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-700">
            {['Governed canary kit', 'Read‑first connectors', 'Per‑team cost/showback'].map((t) => (
              <li key={t} className="flex"><Check className="mr-2 h-5 w-5 text-orange-500" />{t}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-gray-900">Plus</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-700">
            {['Everything in Base', 'Action Certificates', 'SIEM/OTel export (Datadog/Splunk)', '24/7 support + Slack'].map((t) => (
              <li key={t} className="flex"><Check className="mr-2 h-5 w-5 text-orange-500" />{t}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-gray-900">Enterprise</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-700">
            {[
              'In‑VPC deployment & multi‑region',
              'Advanced governance & audit',
              'Priority on‑call & dedicated Slack',
              'Security review & procurement support',
              'Marketplace procurement',
            ].map((t) => (
              <li key={t} className="flex"><Check className="mr-2 h-5 w-5 text-orange-500" />{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="mt-16">
      <h3 className="text-lg font-semibold text-gray-900">FAQ</h3>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <details className="rounded-lg border border-gray-200 bg-white/60 p-4">
          <summary className="cursor-pointer font-medium text-gray-900">How does billing work?</summary>
          <p className="mt-2 text-sm text-gray-700">
            Pricing is per user, with optional annual billing. For enterprise contracts, usage‑based fees can be added when you route inference through the control plane.
          </p>
        </details>

        <details className="rounded-lg border border-gray-200 bg-white/60 p-4">
          <summary className="cursor-pointer font-medium text-gray-900">Do you run inside our VPC?</summary>
          <p className="mt-2 text-sm text-gray-700">Yes—deployment is in your cloud account so compute and data stay within your perimeter.</p>
        </details>

        <details className="rounded-lg border border-gray-200 bg-white/60 p-4">
          <summary className="cursor-pointer font-medium text-gray-900">What happens after the trial?</summary>
          <p className="mt-2 text-sm text-gray-700">Convert to monthly or annual anytime. If you don’t subscribe, your environment is deactivated without data leaving your account.</p>
        </details>

        <details className="rounded-lg border border-gray-200 bg-white/60 p-4">
          <summary className="cursor-pointer font-medium text-gray-900">Can we buy through cloud marketplaces?</summary>
          <p className="mt-2 text-sm text-gray-700">Yes—Enterprise can transact via AWS/GCP/Azure marketplaces to streamline procurement.</p>
        </details>
      </div>
    </section>
  );
}
