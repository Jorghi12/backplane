// app/(dashboard)/pricing/page.tsx
//
// Pricing aligned to *time‑to‑live* for outcomes,
// not vanity seats. This page implements a value‑aligned pricing
// model while remaining Stripe‑compatible with your existing
// "Base" and "Plus" products (seeded in the repo).
//
// Design notes (patterns proven by durable enterprise winners):
// - Value‑metered core (Twilio‑style calls, Snowflake‑style credits,
//   Datadog ingestion, CrowdStrike endpoints) → here as "Verified Actions".
// - Low friction platform access with unlimited approvers/viewers,
//   paid *operators/builders* (Figma/Atlassian‑style).
// - Clear path to Enterprise: in‑VPC, SSO/SAML/SCIM, SLAs,
//   marketplaces, procurement artifacts (Salesforce/ServiceNow/Okta/Cloudflare patterns).
//
// Implementation notes:
// - We still fetch Stripe prices for "Base" and "Plus" so checkout keeps working.
// - The *UI* presents outcome‑aligned value (action credits, governed automations),
//   while the actual self‑serve checkout continues to charge per operator seat.
// - Enterprise is sales‑assisted; contact flow unchanged.

import { checkoutAction } from '@/lib/payments/actions';
import { getStripePrices, getStripeProducts } from '@/lib/payments/stripe';
import { SubmitButton } from './submit-button';
import {
  Check,
  Clock,
  Shield,
  Gauge,
  FileCheck2,
  KeyRound,
  LineChart,
  Building2,
  Plug,
  Lock,
  Cloud,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
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

  // Stripe products (keep names for compatibility)
  const baseMonthly = findPrice('Base', 'month');
  const baseYearly  = findPrice('Base', 'year');
  const plusMonthly = findPrice('Plus', 'month');
  const plusYearly  = findPrice('Plus', 'year');

  const baseTrial = baseMonthly?.trialPeriodDays ?? baseYearly?.trialPeriodDays ?? 7;
  const plusTrial = plusMonthly?.trialPeriodDays ?? plusYearly?.trialPeriodDays ?? 7;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* ------------------------------ HERO ------------------------------ */}
      <section className="text-center mb-12">
        <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700">
          In‑VPC request‑path control plane
        </span>
        <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
          Pricing aligned to <span className="text-orange-600">time‑to‑live</span>
        </h1>
        <p className="mt-3 text-gray-600 max-w-3xl mx-auto">
          Start with a {Math.max(baseTrial, plusTrial)}‑day free trial. Approvers &amp; viewers are free—only{' '}
          <span className="font-medium">builders/operators</span> need paid seats. Value is measured in{' '}
          <span className="font-medium">Verified Actions</span> (attested writes) and <span className="font-medium">Governed Automations</span>.
        </p>

        <div className="mt-6 inline-flex items-center justify-center gap-2 text-xs text-gray-500">
          <InfoPill icon={<Clock className="h-3.5 w-3.5" />} text="TTE ≤ 7 days (time‑to‑evidence)" />
          <InfoPill icon={<Gauge className="h-3.5 w-3.5" />} text="Pilot → certified prod ≤ 90 days" />
          <InfoPill icon={<Shield className="h-3.5 w-3.5" />} text="Deterministic audit on by default" />
        </div>
      </section>

      {/* --------------------------- PLAN CARDS --------------------------- */}
      <section aria-label="Plans" className="grid gap-6 md:grid-cols-3">
        {/* Build (maps to Stripe Base) */}
        <PlanCard
          label="Build"
          stripeName="Base"
          badge="Pilot & canary"
          monthly={baseMonthly?.unitAmount ?? 800}
          yearly={baseYearly?.unitAmount}
          monthlyPriceId={baseMonthly?.id}
          yearlyPriceId={baseYearly?.id}
          trialDays={baseTrial}
          intervalLabel="per builder / month"
          highlight={false}
          outcome={{
            automations: '1 governed automation',
            actions: 'Includes 25k Verified Actions / mo',
            overage: 'Overage available on Enterprise contracts',
          }}
          features={[
            'Unlimited viewers & approvers',
            'Read‑first connectors (Snowflake, Databricks, ServiceNow, Slack/Teams) *',
            'Policy‑as‑code gates; dry‑run + rollback',
            'Email support',
          ]}
          finePrint="* Connector availability may vary by region. See docs for current list."
        />

        {/* Operate (maps to Stripe Plus) */}
        <PlanCard
          label="Operate"
          stripeName="Plus"
          badge="Most popular"
          monthly={plusMonthly?.unitAmount ?? 1200}
          yearly={plusYearly?.unitAmount}
          monthlyPriceId={plusMonthly?.id}
          yearlyPriceId={plusYearly?.id}
          trialDays={plusTrial}
          intervalLabel="per builder / month"
          highlight
          outcome={{
            automations: 'Up to 5 governed automations',
            actions: 'Includes 100k Verified Actions / mo',
            overage: 'Volume tiers via contract',
          }}
          features={[
            'Everything in Build',
            'Action Certificates (attested writes)',
            'SSO/SAML & SCIM (Okta, Entra ID, Ping)',
            'SIEM/OTel export (Datadog/Splunk)',
            'Priority Slack + 24×7 on‑call',
          ]}
        />

        {/* Enterprise */}
        <EnterpriseCard />
      </section>

      {/* -------------------- WHAT’S INCLUDED STRIP --------------------- */}
      <section className="mt-16 rounded-xl border border-gray-200 bg-white/60 p-6">
        <h3 className="text-lg font-semibold text-gray-900">What you unlock when traffic flows through TrustPlane</h3>
        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-700">
          <Value icon={<Clock className="h-5 w-5" />} title="≤ 7 days TTE" desc="Time‑to‑evidence for governed canary." />
          <Value icon={<FileCheck2 className="h-5 w-5" />} title="Action Certificates" desc="COSE‑signed attestations for writes." />
          <Value icon={<KeyRound className="h-5 w-5" />} title="SSO / SCIM" desc="Okta, Entra ID, Ping; least‑privilege roles." />
          <Value icon={<LineChart className="h-5 w-5" />} title="SIEM & OTel" desc="Per‑action lineage to Datadog/Splunk." />
        </div>
      </section>

      {/* ----------------------- COMPARISON TABLE ----------------------- */}
      <Comparison />

      {/* ----------------------- OUTCOME EXAMPLES ----------------------- */}
      <section className="mt-16">
        <h3 className="text-lg font-semibold text-gray-900">Enterprise outcomes (why F500 buy)</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <OutcomeTile
            title="AP matching canary → 12 weeks faster"
            bullets={[
              'Policy‑gated writes; rollback in &lt; 5 min',
              'Cost/showback per team',
              'Auditable approvals (security & finops)',
            ]}
          />
          <OutcomeTile
            title="Claims triage: ≤ 7 days to evidence"
            bullets={[
              'Read‑first to production data',
              'Action Certificates on updates',
              'SIEM export for audit/IR',
            ]}
          />
          <OutcomeTile
            title="KPI brief: no data leaves your VPC"
            bullets={[
              'Snowflake/Databricks read‑first connectors',
              'DLP/PII controls by policy',
              'SLOs & budgets as code',
            ]}
          />
        </div>
        <p className="mt-3 text-xs text-gray-500">
          Examples are illustrative; impact varies by baseline and scope.
        </p>
      </section>

      {/* ------------------------------ FAQ ------------------------------ */}
      <FAQ />
    </main>
  );
}

/* =======================================================================
   Components
======================================================================= */

function InfoPill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2.5 py-1">
      <span className="text-gray-700">{icon}</span>
      <span className="text-gray-700">{text}</span>
    </span>
  );
}

function Value({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-lg border border-gray-200 p-4 flex items-start gap-3 bg-white/60">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-orange-500/10 text-orange-700">
        {icon}
      </span>
      <div>
        <div className="text-sm font-medium text-gray-900">{title}</div>
        <div className="text-sm text-gray-600">{desc}</div>
      </div>
    </div>
  );
}

function OutcomeTile({ title, bullets }: { title: string; bullets: string[] }) {
  return (
    <div className="rounded-xl bg-white border border-gray-200 p-5 hover-raise">
      <div className="text-gray-900 font-medium">{title}</div>
      <ul className="mt-3 space-y-2 text-sm text-gray-600">
        {bullets.map((b, i) => (
          <li key={`${title}-${i}`} className="flex items-start gap-2">
            <Check className="h-4 w-4 text-orange-600 mt-0.5" />
            <span dangerouslySetInnerHTML={{ __html: b }} />
          </li>
        ))}
      </ul>
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

type Outcome = {
  automations: string;
  actions: string;
  overage: string;
};

function PlanCard({
  label,
  stripeName,
  badge,
  highlight = false,
  monthly,
  yearly,
  monthlyPriceId,
  yearlyPriceId,
  intervalLabel,
  trialDays,
  outcome,
  features,
  finePrint,
}: {
  label: string;                 // User‑facing plan name (Build / Operate)
  stripeName: 'Base' | 'Plus';   // Underlying Stripe product (compat)
  badge?: string | null;
  highlight?: boolean;
  monthly?: number;
  yearly?: number;
  monthlyPriceId?: string;
  yearlyPriceId?: string;
  intervalLabel: string;
  trialDays: number;
  outcome: Outcome;
  features: string[];
  finePrint?: string;
}) {
  const savings = savePercent(monthly, yearly);

  return (
    <div className={['relative rounded-2xl border p-6 shadow-sm', highlight ? 'border-orange-300 ring-1 ring-orange-200' : 'border-gray-200', 'bg-white/60'].join(' ')}>
      {badge ? <div className="absolute -top-3 left-6 inline-flex items-center rounded-full bg-orange-600 px-3 py-1 text-xs font-semibold text-white shadow">{badge}</div> : null}

      <h2 className="text-2xl font-semibold text-gray-900">{label}</h2>
      <p className="mt-1 text-sm text-gray-600">Includes {trialDays}-day free trial • <em className="not-italic text-gray-700">Stripe: {stripeName}</em></p>

      {/* Price presentation: keep seats for checkout, frame as builder seats */}
      <div className="mt-4">
        <div className="text-4xl font-semibold text-gray-900">
          {formatUsd(monthly)} <span className="text-base font-normal text-gray-600">{intervalLabel}</span>
        </div>
        {yearly ? (
          <p className="mt-1 text-sm text-gray-600">
            or {formatUsd(yearly / 12)} / builder / month{' '}
            <span className="text-gray-500">(billed annually{typeof savings === 'number' ? ` — save ${savings}%` : ''})</span>
          </p>
        ) : null}
      </div>

      {/* Outcomes & meters */}
      <div className="mt-5 rounded-lg border border-gray-200 bg-white p-4">
        <div className="text-xs font-medium text-gray-500">Meters &amp; inclusions</div>
        <ul className="mt-2 space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <Plug className="h-4 w-4 text-orange-600 mt-0.5" />
            <span>{outcome.automations}</span>
          </li>
          <li className="flex items-start gap-2">
            <FileCheck2 className="h-4 w-4 text-orange-600 mt-0.5" />
            <span>{outcome.actions}</span>
          </li>
          <li className="flex items-start gap-2">
            <HelpCircle className="h-4 w-4 text-orange-600 mt-0.5" />
            <span>{outcome.overage}</span>
          </li>
        </ul>
      </div>

      {/* Feature bullets */}
      <ul className="mt-5 space-y-3">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start">
            <Check className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      {finePrint ? <p className="mt-3 text-xs text-gray-500">{finePrint}</p> : null}

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
      <p className="mt-1 text-sm text-gray-600">In‑VPC deployment, SSO/SAML/SCIM, dedicated SLA</p>

      <ul className="mt-6 space-y-3">
        {[
          'In‑VPC deployment (AWS/GCP/Azure) & private networking',
          'Advanced governance & deterministic audit',
          'Priority on‑call • dedicated Slack',
          'Security review • procurement & marketplace',
          'MSA, DPA, data‑residency & BYOK/KMS options',
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
          <ArrowRight className="ml-2 h-4 w-4" />
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
        {/* Build */}
        <div>
          <h4 className="font-medium text-gray-900">Build</h4>
          <p className="text-xs text-gray-500">Stripe: Base</p>
          <ul className="mt-3 space-y-2 text-sm text-gray-700">
            {[
              '1 governed automation',
              'Includes 25k Verified Actions / mo',
              'Read‑first connectors',
              'Policy‑as‑code gates; dry‑run + rollback',
            ].map((t) => (
              <li key={t} className="flex">
                <Check className="mr-2 h-5 w-5 text-orange-500" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Operate */}
        <div>
          <h4 className="font-medium text-gray-900">Operate</h4>
          <p className="text-xs text-gray-500">Stripe: Plus</p>
          <ul className="mt-3 space-y-2 text-sm text-gray-700">
            {[
              'Up to 5 governed automations',
              'Includes 100k Verified Actions / mo',
              'Action Certificates',
              'SSO/SAML & SCIM',
              'SIEM/OTel export',
              'Priority Slack + 24×7 on‑call',
            ].map((t) => (
              <li key={t} className="flex">
                <Check className="mr-2 h-5 w-5 text-orange-500" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Enterprise */}
        <div>
          <h4 className="font-medium text-gray-900">Enterprise</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-700">
            {[
              'In‑VPC deployment & multi‑region',
              'Marketplace procurement',
              'Dedicated SLA & support',
              'Security review & evidence packs',
            ].map((t) => (
              <li key={t} className="flex">
                <Check className="mr-2 h-5 w-5 text-orange-500" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Trust & procurement strip */}
      <div className="mt-4 grid sm:grid-cols-2 gap-4">
        <TrustTile icon={<Cloud className="h-5 w-5" />} title="Runs in your cloud" desc="Data & compute stay in‑VPC. Residency & BYOK/KMS supported." />
        <TrustTile icon={<Lock className="h-5 w-5" />} title="No training on your data" desc="Unless you opt in. Approvers & policies control writes." />
      </div>
    </section>
  );
}

function TrustTile({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
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

function FAQ() {
  return (
    <section className="mt-16">
      <h3 className="text-lg font-semibold text-gray-900">FAQ</h3>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <details className="rounded-lg border border-gray-200 bg-white/60 p-4">
          <summary className="cursor-pointer font-medium text-gray-900">What is a “Verified Action”?</summary>
          <p className="mt-2 text-sm text-gray-700">
            A verified (attested) write accompanied by a signed <em>Action Certificate</em>. Platforms can require a valid certificate
            before side‑effects (e.g., posting to ServiceNow, updating Snowflake). Reads are free; writes are governed.
          </p>
        </details>

        <details className="rounded-lg border border-gray-200 bg-white/60 p-4">
          <summary className="cursor-pointer font-medium text-gray-900">Who pays for access?</summary>
          <p className="mt-2 text-sm text-gray-700">
            Approvers &amp; viewers are free. Only <span className="font-medium">builders/operators</span> require paid seats
            (the people wiring connectors, policies, and promotions). This keeps adoption friction low while aligning value.
          </p>
        </details>

        <details className="rounded-lg border border-gray-200 bg-white/60 p-4">
          <summary className="cursor-pointer font-medium text-gray-900">How does usage factor in?</summary>
          <p className="mt-2 text-sm text-gray-700">
            Each plan includes a monthly pool of <span className="font-medium">Verified Actions</span>. Enterprise contracts add volume tiers
            or credit packs. Reads, traces, and dry‑runs are not metered.
          </p>
        </details>

        <details className="rounded-lg border border-gray-200 bg-white/60 p-4">
          <summary className="cursor-pointer font-medium text-gray-900">Do you run inside our VPC?</summary>
          <p className="mt-2 text-sm text-gray-700">
            Yes—deployment is in your cloud account so data &amp; compute stay within your perimeter.
          </p>
        </details>

        <details className="rounded-lg border border-gray-200 bg-white/60 p-4">
          <summary className="cursor-pointer font-medium text-gray-900">Can we buy through cloud marketplaces?</summary>
          <p className="mt-2 text-sm text-gray-700">Yes—Enterprise can transact via AWS/GCP/Azure marketplaces for streamlined procurement.</p>
        </details>

        <details className="rounded-lg border border-gray-200 bg-white/60 p-4">
          <summary className="cursor-pointer font-medium text-gray-900">What happens after the trial?</summary>
          <p className="mt-2 text-sm text-gray-700">
            Convert to monthly or annual anytime. If you don’t subscribe, your environment is deactivated without data leaving your account.
          </p>
        </details>
      </div>
    </section>
  );
}


function UsageMeter() {
  return (
    <section className="mt-16">
      <h3 className="text-lg font-semibold text-gray-900">Usage metering</h3>
      <div className="mt-3 rounded-xl border border-gray-200 bg-white/60 p-6">
        <p className="text-sm text-gray-700">
          All plans meter usage by <span className="font-medium">approved actions</span> (i.e., Action Certificates minted on promotion/writes).
          Seats are for governance users; viewers can be unlimited. Contact sales for current rates or percent‑of‑spend options.
        </p>
      </div>
    </section>
  );
}
