import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  ShieldCheck,
  Shield,
  Gauge,
  GitBranch,
  LineChart,
  Cloud,
  Lock,
  Activity,
  DollarSign,
  Server,
  CheckCircle2,
  KeyRound,
  FileCheck2,
  Building2,
  Users
} from 'lucide-react';

export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section className="pt-20 pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700 tracking-wide">
                TrustPlane
              </span>
              <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900">
                Approve once. In production in&nbsp;<span className="text-orange-600">90 days</span>.
                <br className="hidden sm:block" />
                New use cases live in <span className="text-orange-600">under a week</span>.
              </h1>
              <p className="mt-5 text-lg text-gray-600 max-w-2xl">
                TrustPlane is the <span className="font-semibold">enterprise AI agent control plane</span> that
                <span className="font-semibold"> works with your stack</span>—Okta/Entra/Ping, Databricks, Snowflake, AWS/Azure/GCP, ServiceNow/Jira, Splunk/Datadog, Slack/Teams.
                Approve the platform once (identity, audit, data boundaries), then ship multiple agents under the same guardrails.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/contact">
                    Talk to engineering
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full">
                  <Link href="/docs/quickstart">Quickstart</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full">
                  <Link href="/security">Security brief</Link>
                </Button>
              </div>

              <ul className="mt-8 grid grid-cols-2 gap-4 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-orange-600" /> Approve‑once platform
                </li>
                <li className="flex items-center gap-2">
                  <KeyRound className="h-4 w-4 text-orange-600" /> SSO (SAML) &amp; SCIM
                </li>
                <li className="flex items-center gap-2">
                  <GitBranch className="h-4 w-4 text-orange-600" /> Read‑first connectors &amp; dry‑run
                </li>
                <li className="flex items-center gap-2">
                  <FileCheck2 className="h-4 w-4 text-orange-600" /> Deterministic audit trails
                </li>
                <li className="flex items-center gap-2">
                  <LineChart className="h-4 w-4 text-orange-600" /> SIEM/observability exports
                </li>
                <li className="flex items-center gap-2">
                  <Cloud className="h-4 w-4 text-orange-600" /> Runs in your VPC / cloud
                </li>
              </ul>
            </div>

            {/* Product snap: Policy Manifest + SDK */}
            <div className="lg:col-span-5">
              <div className="rounded-xl bg-gray-900 text-gray-100 shadow-xl ring-1 ring-black/10 overflow-hidden">
                <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                  <p className="text-xs font-semibold tracking-wider uppercase text-gray-400">
                    Platform Policy (YAML)
                  </p>
                  <span className="text-[10px] text-gray-400">pre‑approved in your org</span>
                </div>
                <pre className="p-5 text-xs leading-relaxed overflow-x-auto">
{`platform:
  identity: saml+sso, scim
  audit:
    stream: datadog
  data:
    residency: us
    kms: byok
connectors:
  - service: snowflake
    mode: read_first
  - service: servicenow
    mode: read_first
guardrails:
  write_requires_approval: true
  pii: redact
targets:
  ttp_days: 90
  mttr_minutes: 5`}
                </pre>
                <div className="px-5 py-4 border-t border-white/10">
                  <p className="text-xs font-semibold tracking-wider uppercase text-gray-400">
                    Drop‑in SDK
                  </p>
                  <pre className="mt-2 text-xs overflow-x-auto">
{`import { createClient } from '@TrustPlane/sdk';
const cp = createClient();

await cp.agent('dataprep').run({
  input: 'Generate monthly KPI brief from Snowflake',
  dryRun: true,             // read‑first by default
  requireApproval: true,    // write actions gated
  trace: true               // full, exportable audit
});`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM + WHY NOW */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8">
          <Card title="The problem">
            Fortune‑500s don’t struggle to start pilots—they struggle to clear security, compliance,
            and integration gates to reach production. Reviews (TPRM/InfoSec), SSO/SCIM, and app/data
            integrations routinely add months.
          </Card>
          <Card title="Why now">
            Exec teams are demanding ROI this fiscal year. TrustPlane collapses the review/integration
            path by shipping <em>identity, governance, and connectors</em> as a reusable control plane
            across the tools you already run.
          </Card>
        </div>
      </section>

      {/* WHAT TrustPlane IS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900">
            TrustPlane: the AI agent control plane that works with your stack
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl">
            Approve the platform once—identity, audit, and data boundaries—then reuse it for
            multiple AI agents. We integrate with Databricks, Snowflake, AWS, Azure, GCP;
            Okta/Entra/Ping; ServiceNow/Jira; Splunk/Datadog; Slack/Teams.
          </p>

          {/* How it works */}
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Feature
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Approve‑once platform"
              desc="Centralize platform‑level review for security, compliance, and vendor risk—reused across use cases."
            />
            <Feature
              icon={<KeyRound className="h-5 w-5" />}
              title="Identity & provisioning"
              desc="SAML SSO (Okta/Entra/Ping) and SCIM with least‑privilege defaults."
            />
            <Feature
              icon={<GitBranch className="h-5 w-5" />}
              title="Read‑first connectors"
              desc="Scoped OAuth, dry‑run, and deterministic audit for Databricks, Snowflake, ServiceNow, Slack/Teams, Splunk/Datadog."
            />
            <Feature
              icon={<LineChart className="h-5 w-5" />}
              title="Observability & SIEM"
              desc="OpenTelemetry/Datadog exports, per‑action traces, and budget/rate guardrails."
            />
            <Feature
              icon={<Shield className="h-5 w-5" />}
              title="Governance on by default"
              desc="RBAC/ABAC, DLP/PII controls, retention, human‑in‑the‑loop, and eDiscovery hooks."
            />
            <Feature
              icon={<Cloud className="h-5 w-5" />}
              title="Inside your cloud"
              desc="Runs in your account; compute and data stay put. No risk of outgrowing the platform."
            />
          </div>
        </div>
      </section>

      {/* SECURITY & COMPLIANCE STRIP */}
      <section className="py-8 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SecurityItem icon={<KeyRound className="h-5 w-5" />} title="SSO / SAML / SCIM" desc="Okta, Entra ID, Ping." />
            <SecurityItem icon={<Lock className="h-5 w-5" />} title="KMS & Secrets" desc="BYOK, Vault integration, data residency." />
            <SecurityItem icon={<FileCheck2 className="h-5 w-5" />} title="Trust & Compliance" desc="SOC 2 program, audit‑log streaming, DPIA/LLM risk docs." />
            <SecurityItem icon={<Shield className="h-5 w-5" />} title="Audit & Retention" desc="Per‑action lineage; SIEM export." />
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-semibold text-gray-900">Enterprise outcomes</h3>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Stat icon={<Activity className="h-5 w-5" />} value="≤ 90 days" label="Pilot → production" />
            <Stat icon={<Gauge className="h-5 w-5" />} value="&lt; 7 days" label="Each new use case" />
            <Stat icon={<Shield className="h-5 w-5" />} value="100%" label="Audit coverage (per action)" />
            <Stat icon={<Server className="h-5 w-5" />} value="&lt; 5 min" label="Rollback MTTR (safe‑mode)" />
          </div>
          <p className="mt-4 text-xs text-gray-500">
            Targets are goals measured against each customer’s historical baselines; not guarantees.
          </p>
        </div>
      </section>

      {/* ROLE-BASED VALUE */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-semibold text-gray-900">Built for enterprise buyers</h3>
          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <RoleCard
              icon={<Building2 className="h-5 w-5" />}
              title="VP Engineering"
              bullets={[
                'Approve once across identity, audit, and data boundaries',
                'One integration to your tools; agents inherit',
                'Forward‑deployed engineers for the last mile'
              ]}
            />
            <RoleCard
              icon={<Users className="h-5 w-5" />}
              title="Head of AI"
              bullets={[
                'Two use cases live quickly; expansion in days',
                'Read‑first connectors with dry‑run',
                'No training on your data by default'
              ]}
            />
            <RoleCard
              icon={<DollarSign className="h-5 w-5" />}
              title="CFO / FinOps"
              bullets={[
                'Bring forward ROI by quarters',
                'True cost per request & team',
                'Budget guardrails and spend controls'
              ]}
            />
            <RoleCard
              icon={<Shield className="h-5 w-5" />}
              title="CISO / Security"
              bullets={[
                'SSO/SCIM, RBAC/ABAC, least‑privilege scopes',
                'Data residency & BYOK/KMS options',
                'Deterministic audit & eDiscovery hooks'
              ]}
            />
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-semibold text-gray-900">Control plane capabilities (MVP)</h3>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <Card title="Identity & Access">
              SAML SSO (Okta/Entra/Ping) plus SCIM user provisioning; least‑privilege roles and policy packs.
            </Card>
            <Card title="Connectors (read‑first)">
              Databricks/Snowflake, ServiceNow, Slack/Teams, Splunk/Datadog—scoped OAuth, dry‑run, and auditable actions.
            </Card>
            <Card title="Governance & Observability">
              Audit‑log streaming, OpenTelemetry/Datadog exports, RBAC/ABAC, retention, and policy‑based approvals.
            </Card>
          </div>

          <p className="mt-10 text-gray-600">
            Roadmap: evaluators, prompt & pipeline versioning, workload‑aware autoscaling, and policy‑driven routing across heterogeneous fleets.
          </p>
        </div>
      </section>

      {/* 90-DAY PLAN */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-semibold text-gray-900">90‑day plan to production</h3>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <StepCard step="Weeks 0–2" title="Trust & identity" desc="Stand up trust portal; SAML SSO + SCIM configured; baseline audit export." />
            <StepCard step="Weeks 2–6" title="Connectors & governance" desc="Read‑first connectors live; RBAC/ABAC and policy packs enabled; SIEM streaming." />
            <StepCard step="Weeks 6–12" title="Cutover & certify" desc="Approval workflows for writes; rollback/safe‑mode; production certification & runbooks." />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-2xl font-semibold text-gray-900">
              Approve once. Go live in 90 days. Scale in days.
            </h4>
            <p className="mt-2 text-gray-600">
              Identity, governance, and connectors—built in. Your tools, your cloud, your controls.
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/contact">Talk to engineering</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link href="/pricing">Request pricing</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------- Small presentational components ---------- */

function Feature({
  icon,
  title,
  desc
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-xl bg-white border border-gray-200 p-5">
      <div className="flex items-center gap-2 text-gray-900 font-medium">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-orange-500/10 text-orange-700">
          {icon}
        </span>
        {title}
      </div>
      <p className="mt-3 text-sm text-gray-600">{desc}</p>
    </div>
  );
}

function Card({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-white border border-gray-200 p-5">
      <h4 className="text-lg font-medium text-gray-900">{title}</h4>
      <p className="mt-2 text-sm text-gray-600">{children}</p>
    </div>
  );
}

function Stat({
  icon,
  value,
  label
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 p-5">
      <div className="flex items-center gap-2 text-gray-900">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-orange-500/10 text-orange-700">
          {icon}
        </span>
        <span className="text-2xl font-semibold">{value}</span>
      </div>
      <p className="mt-2 text-sm text-gray-600">{label}</p>
    </div>
  );
}

function SecurityItem({
  icon,
  title,
  desc
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-lg border border-gray-200 p-4 flex items-start gap-3">
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

function RoleCard({
  icon,
  title,
  bullets
}: {
  icon: React.ReactNode;
  title: string;
  bullets: string[];
}) {
  return (
    <div className="rounded-xl bg-white border border-gray-200 p-5">
      <div className="flex items-center gap-2 text-gray-900 font-medium">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-orange-500/10 text-orange-700">
          {icon}
        </span>
        {title}
      </div>
      <ul className="mt-3 space-y-2 text-sm text-gray-600">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-orange-600 mt-0.5" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StepCard({
  step,
  title,
  desc
}: {
  step: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-xl bg-white border border-gray-200 p-5">
      <div className="text-xs font-semibold text-orange-700">{step}</div>
      <div className="mt-1 text-gray-900 font-medium">{title}</div>
      <div className="mt-2 text-sm text-gray-600">{desc}</div>
    </div>
  );
}
