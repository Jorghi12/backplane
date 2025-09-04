// app/docs/quickstart/page.tsx
import { CheckCircle2, BookOpen, Shield, GitBranch, Gauge, Cloud } from 'lucide-react';

export default function Quickstart() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8">
        <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
          Quickstart
        </span>
        <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
          Get Backplane running inside your VPC
        </h1>
        <p className="mt-3 text-gray-600">
          30 minutes to a governed, multi‑model request path with SLOs‑as‑code and policy‑driven routing.
        </p>
      </header>

      <ol className="space-y-8">
        <li className="rounded-xl bg-white border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-gray-900 font-medium">
            <BookOpen className="h-5 w-5 text-orange-600" />
            1) Install SDK
          </div>
          <pre className="mt-3 rounded-lg bg-gray-900 text-gray-100 p-4 text-sm overflow-x-auto">
{`# npm
npm i @backplane/sdk
# pnpm
pnpm add @backplane/sdk
# yarn
yarn add @backplane/sdk`}
          </pre>
        </li>

        <li className="rounded-xl bg-white border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-gray-900 font-medium">
            <Shield className="h-5 w-5 text-orange-600" />
            2) Declare an SLO Manifest
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Define latency, reliability, budget, and safety as code. Backplane enforces this at the request path.
          </p>
          <pre className="mt-3 rounded-lg bg-gray-900 text-gray-100 p-4 text-sm overflow-x-auto">
{`# backplane.slo.yaml
slo:
  latency_p50: 300ms
  reliability: "99.9%"
  budget_monthly: "$45k"
  safety: pii_detect+mask
policy:
  allow_models: [gpt-4o, claude-3-5-sonnet, llama-3.1-70b]
  regions: [aws-us-east-1, gcp-us-central1, azure-eastus]
routing:
  objective: cost_aware_latency
  failover: automatic
  canary: true`}
          </pre>
        </li>

        <li className="rounded-xl bg-white border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-gray-900 font-medium">
            <GitBranch className="h-5 w-5 text-orange-600" />
            3) Initialize the client and make your first call
          </div>
          <pre className="mt-3 rounded-lg bg-gray-900 text-gray-100 p-4 text-sm overflow-x-auto">
{`// app/api/example/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@backplane/sdk';

const bp = createClient({
  sloManifestPath: 'backplane.slo.yaml'
});

export async function POST() {
  const resp = await bp.chat({
    model: 'auto',         // Backplane picks model + region + hardware
    input: 'Summarize Q2 risk reports for the board',
    team: 'risk-ops',
    trace: true
  });

  return NextResponse.json(resp);
}`}
          </pre>
        </li>

        <li className="rounded-xl bg-white border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-gray-900 font-medium">
            <Gauge className="h-5 w-5 text-orange-600" />
            4) Observe cost & policy adherence
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Every request emits latency, availability, and cost per team. Policy hits and PII handling are auditable.
          </p>
          <ul className="mt-3 grid sm:grid-cols-2 gap-3 text-sm text-gray-700">
            <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-orange-600 mt-0.5" /> Cost per request & per team</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-orange-600 mt-0.5" /> Policy hits, redactions, and guardrails</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-orange-600 mt-0.5" /> SLO adherence (latency, reliability)</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-orange-600 mt-0.5" /> Exportable audit logs</li>
          </ul>
        </li>

        <li className="rounded-xl bg-white border border-gray-200 p-6">
          <div className="flex items-center gap-2 text-gray-900 font-medium">
            <Cloud className="h-5 w-5 text-orange-600" />
            5) Deploy in your cloud(s)
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Backplane runs in your VPC (AWS/GCP/Azure). Use marketplace or Terraform modules to roll out the gateway/sidecar.
          </p>
        </li>
      </ol>

      <nav className="mt-10 flex items-center justify-between">
        <a href="/docs/quickstart" className="text-sm text-gray-600 hover:text-gray-900">Quickstart</a>
        <a href="/contact" className="text-sm font-medium text-gray-900 hover:underline">Need help? Talk to engineering →</a>
      </nav>
    </main>
  );
}
