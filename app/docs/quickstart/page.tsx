import {
  CheckCircle2,
  BookOpen,
  Shield,
  GitBranch,
  Gauge,
  Cloud,
  KeyRound,
  PlugZap,
  FileCheck2,
  Building2,
  Cable,
} from 'lucide-react';

export default function Quickstart() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <header className="mb-8">
        <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
          Quickstart
        </span>
        <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
          From pilot to <span className="text-orange-600">go‑live</span> in your VPC
        </h1>
        <p className="mt-3 text-gray-600">
          Follow this guided path to stand up TrustPlane as your governed request‑path control plane. The outcome:
          <span className="font-semibold"> a canary live in ≤ 7 days</span>, audit exporting to your SIEM, and policy packs your teams can reuse.
        </p>
      </header>

      {/* Prereqs */}
      <section className="rounded-xl bg-white border border-gray-200 p-6 mb-8">
        <div className="flex items-center gap-2 text-gray-900 font-medium">
          <Building2 className="h-5 w-5 text-orange-600" />
          Prerequisites (choose what matches your stack)
        </div>
        <ul className="mt-3 grid sm:grid-cols-2 gap-3 text-sm text-gray-700">
          <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-orange-600 mt-0.5" /> Cloud: AWS, GCP, or Azure account</li>
          <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-orange-600 mt-0.5" /> SSO: Okta, Microsoft Entra ID, or Ping</li>
          <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-orange-600 mt-0.5" /> Optional: Snowflake / Databricks; ServiceNow / Jira; Slack / Microsoft Teams</li>
          <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-orange-600 mt-0.5" /> SIEM/Observability: Splunk or Datadog (for audit export)</li>
        </ul>
      </section>

      {/* Step 1 → 7 */}
      <ol className="space-y-8">
        {/* 1) Deploy gateway */}
        <li className="rounded-xl bg-white border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-gray-900 font-medium">
            <Cloud className="h-5 w-5 text-orange-600" />
            1) Deploy the gateway in your VPC
          </div>
          <p className="mt-2 text-sm text-gray-600">
            The gateway/sidecar runs in your account. You can start with a single region and expand later.
            Use marketplace images or Terraform modules; no public ingress required for private modes.
          </p>
          <pre className="mt-3 rounded-lg bg-gray-900 text-gray-100 p-4 text-sm overflow-x-auto">
{`# Terraform (example sketch)
module "trustplane" {
  source  = "trustplane-oss/gateway/<provider>"
  version = "~> 1"
  region  = "us-east-1"

  # networking + egress controls
  vpc_id                  = var.vpc_id
  private_subnet_ids      = var.private_subnet_ids
  outbound_egress_allowed = false
}`}
          </pre>
        </li>

        {/* 2) SSO + SCIM */}
        <li className="rounded-xl bg-white border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-gray-900 font-medium">
            <KeyRound className="h-5 w-5 text-orange-600" />
            2) Wire up identity (SSO) & provisioning (SCIM)
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Set SAML SSO with your IdP and enable SCIM for lifecycle. Approvers and operators are least‑privilege roles.
          </p>
          <pre className="mt-3 rounded-lg bg-gray-900 text-gray-100 p-4 text-sm overflow-x-auto">
{`# trustplane-idp.json (IdP app hints)
{
  "saml": { "acsUrl": "https://gw.internal/auth/saml/acs", "entityId": "urn:trustplane" },
  "scim": { "baseUrl": "https://gw.internal/scim", "bearer": "…managed secret…" },
  "roles": ["owner", "approver", "operator"]
}`}
          </pre>
        </li>

        {/* 3) Connectors */}
        <li className="rounded-xl bg-white border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-gray-900 font-medium">
            <PlugZap className="h-5 w-5 text-orange-600" />
            3) Add read‑first connectors (Snowflake, ServiceNow, Slack…)
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Start read‑only with dry‑run. Promotion to writes requires explicit approvals and minting an Action Certificate.
          </p>
          <pre className="mt-3 rounded-lg bg-gray-900 text-gray-100 p-4 text-sm overflow-x-auto">
{`# connectors.yaml
snowflake:
  mode: read_first
  role: ANALYST
servicenow:
  mode: write_gated
slack:
  mode: read_first`}
          </pre>
        </li>

        {/* 4) SLO + policy */}
        <li className="rounded-xl bg-white border border-gray-200 p-6" id="policy">
          <div className="flex items-center gap-2 text-gray-900 font-medium">
            <Shield className="h-5 w-5 text-orange-600" />
            4) Declare SLOs & policy as code
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Define latency, reliability, budget, data boundary, and approval gates. Hashes are embedded in every certificate.
          </p>
          <pre className="mt-3 rounded-lg bg-gray-900 text-gray-100 p-4 text-sm overflow-x-auto">
{`# TrustPlane.slo.yaml
slo: { latency_p95_ms: 1200, availability: "99.9%" }
budget: { monthly_usd: 25000, rps: 5 }
data: { residency: [us, eu], kms: byok, egress: deny_by_default, pii: redact }
policy:
  writes: { approvals: [security, finops] }
  canary: { pct: 10, eval: "golden:v1", rollback_on: { drift_p95: ">5%" } }
connectors: { snowflake: read_first, servicenow: write_gated }`}
          </pre>
        </li>

        {/* 5) First governed call */}
        <li className="rounded-xl bg-white border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-gray-900 font-medium">
            <GitBranch className="h-5 w-5 text-orange-600" />
            5) Initialize the client and make your first governed call
          </div>
          <pre className="mt-3 rounded-lg bg-gray-900 text-gray-100 p-4 text-sm overflow-x-auto">
{`// app/api/example/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@TrustPlane/sdk';

const tp = createClient({ sloManifestPath: 'TrustPlane.slo.yaml' });

export async function POST() {
  const resp = await tp.chat({
    model: 'auto',                       // TrustPlane picks model + region + hardware
    input: 'Summarize Q2 risk reports for the board',
    team: 'risk-ops',
    trace: true
  });
  return NextResponse.json(resp);
}`}
          </pre>
        </li>

        {/* 6) Observe */}
        <li className="rounded-xl bg-white border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-gray-900 font-medium">
            <Gauge className="h-5 w-5 text-orange-600" />
            6) Observe cost, SLOs & policy adherence
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Every request emits latency, availability, and cost per team; guardrails and redactions are auditable and exportable.
          </p>
          <ul className="mt-3 grid sm:grid-cols-2 gap-3 text-sm text-gray-700">
            <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-orange-600 mt-0.5" /> Per‑team cost/showback &amp; budget guardrails</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-orange-600 mt-0.5" /> SLO adherence (p95 latency, availability)</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-orange-600 mt-0.5" /> Policy hits, PII redactions, audit export (OTel → Splunk/Datadog)</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-orange-600 mt-0.5" /> Certificate verification hooks before writes</li>
          </ul>
        </li>

        {/* 7) Promote + certificate */}
        <li className="rounded-xl bg-white border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-gray-900 font-medium">
            <FileCheck2 className="h-5 w-5 text-orange-600" />
            7) Promote with approvals & mint an Action Certificate
          </div>
          <pre className="mt-3 rounded-lg bg-gray-900 text-gray-100 p-4 text-sm overflow-x-auto">
{`// TypeScript
import { TrustPlane } from '@trustplane/sdk';
const tp = new TrustPlane({ policy: 'prod-us-1' });

await tp.promote('ap-matching', {
  percent: 25,
  approvals: ['security', 'finops']
});

// COSE-signed certificate is minted; attach to downstream writes
`}
          </pre>
        </li>
      </ol>

      {/* Bottom nav */}
      <nav className="mt-10 flex items-center justify-between">
        <a href="/docs/quickstart" className="text-sm text-gray-600 hover:text-gray-900">Quickstart</a>
        <a href="/contact?topic=demo" className="text-sm font-medium text-gray-900 hover:underline">Need a hand? Talk to engineering →</a>
      </nav>

      {/* Side note cards */}
      <div className="mt-10 grid md:grid-cols-2 gap-4">
        <Aside
          icon={<Cable className="h-4 w-4" />}
          title="Promotion gates"
          text="Optional evaluation contracts (golden sets, guardrail metrics) act as gates for canary → production."
        />
        <Aside
          icon={<BookOpen className="h-4 w-4" />}
          title="Evidence packs"
          text="Policy hashes, lineage, and per‑action certificates export directly to your auditors (EU AI Act, NIST AI RMF)."
        />
      </div>
    </main>
  );
}

function Aside({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-lg bg-white border border-gray-200 p-4">
      <div className="flex items-center gap-2 text-gray-900 font-medium">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-orange-500/10 text-orange-700">
          {icon}
        </span>
        {title}
      </div>
      <p className="mt-2 text-sm text-gray-600">{text}</p>
    </div>
  );
}
