import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Shield,
  Gauge,
  GitBranch,
  LineChart,
  Cloud,
  Lock,
  Activity,
  DollarSign,
  Server
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
                BACKPLANE
              </span>
              <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900">
                AI that doesn’t stop at pilots.&nbsp;
                <span className="text-orange-600">Ships. Scales. Stays.</span>
              </h1>
              <p className="mt-5 text-lg text-gray-600 max-w-2xl">
                Backplane is an <span className="font-semibold">agentic control plane</span> that
                owns the <span className="font-semibold">request path</span> for enterprise GenAI.
                Run it inside your VPC to unify orchestration, SLOs‑as‑code, cost, and governance—
                so pilots hit production in weeks, not quarters.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/contact">
                    Book a demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full">
                  <Link href="/docs">See the SDK</Link>
                </Button>
              </div>

              <ul className="mt-8 grid grid-cols-2 gap-4 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <Server className="h-4 w-4 text-orange-600" /> In‑VPC deployment
                </li>
                <li className="flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-orange-600" /> SLOs as code
                </li>
                <li className="flex items-center gap-2">
                  <GitBranch className="h-4 w-4 text-orange-600" /> Policy‑driven routing
                </li>
                <li className="flex items-center gap-2">
                  <LineChart className="h-4 w-4 text-orange-600" /> FinOps & observability
                </li>
                <li className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-orange-600" /> RBAC, PII, audit
                </li>
                <li className="flex items-center gap-2">
                  <Cloud className="h-4 w-4 text-orange-600" /> AWS · GCP · Azure · OSS
                </li>
              </ul>
            </div>

            {/* Product snap: SLO Manifest + SDK */}
            <div className="lg:col-span-5">
              <div className="rounded-xl bg-gray-900 text-gray-100 shadow-xl ring-1 ring-black/10 overflow-hidden">
                <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                  <p className="text-xs font-semibold tracking-wider uppercase text-gray-400">
                    SLO Manifest (YAML)
                  </p>
                </div>
                <pre className="p-5 text-xs leading-relaxed overflow-x-auto">
{`slo:
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
                <div className="px-5 py-4 border-t border-white/10">
                  <p className="text-xs font-semibold tracking-wider uppercase text-gray-400">
                    Drop‑in SDK
                  </p>
                  <pre className="mt-2 text-xs overflow-x-auto">
{`import { createClient } from '@backplane/sdk';
const bp = createClient();

const resp = await bp.chat({
  model: 'auto', // Backplane picks model + region + hardware
  input: 'Summarize Q2 risk reports for the board',
  team: 'risk-ops',
  trace: true
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
          <div className="rounded-xl border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900">The problem</h2>
            <p className="mt-3 text-gray-600">
              In the Fortune 500, generative AI gets stuck in <em>pilot purgatory</em>. Moving
              to a governed, predictable production system often takes 6–12 months—many never
              make it. The causes: fragmented infra, siloed teams, missing SLOs, and governance
              added after incidents.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900">Why now</h2>
            <p className="mt-3 text-gray-600">
              Inference is becoming the dominant AI spend, while GPU supply and model choices
              are fragmented across clouds and runtimes. The winners will control the request
              path where performance, cost, and governance intersect.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT BACKPLANE IS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Backplane: the request‑path control plane inside your VPC
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl">
            An agentic control plane that unifies orchestration, observability, and governance
            across AWS, GCP, Azure, Snowflake, Databricks, ServiceNow, Okta, Splunk, Vault, and
            Kubernetes.
          </p>

          {/* How it works */}
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Feature
              icon={<Cloud className="h-5 w-5" />}
              title="Gateway SDK / Sidecar"
              desc="Intercepts LLM & embedding calls from OpenAI, Anthropic, Google, Azure, and open‑source runtimes."
            />
            <Feature
              icon={<Gauge className="h-5 w-5" />}
              title="SLO Manifests"
              desc="Latency targets, quality checks, safety policies, and budgets declared as code."
            />
            <Feature
              icon={<GitBranch className="h-5 w-5" />}
              title="Policy & Routing Engine"
              desc="Chooses model, hardware, and region to meet SLOs and cost goals, with failover and canarying."
            />
            <Feature
              icon={<LineChart className="h-5 w-5" />}
              title="Observability & FinOps"
              desc="True cost per request and per team, real‑time dashboards finance and security can trust."
            />
            <Feature
              icon={<Lock className="h-5 w-5" />}
              title="Governance"
              desc="Lineage, PII handling, RBAC, encryption, retention, and full audit coverage."
            />
            <Feature
              icon={<Shield className="h-5 w-5" />}
              title="Inside your cloud"
              desc="Runs in your account—compute & data never leave. No risk of outgrowing the platform."
            />
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-semibold text-gray-900">Enterprise outcomes</h3>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Stat
              icon={<Activity className="h-5 w-5" />}
              value="&lt; 6 weeks"
              label="Time to production"
            />
            <Stat
              icon={<DollarSign className="h-5 w-5" />}
              value="30–60% ↓"
              label="Cost per request"
            />
            <Stat
              icon={<Shield className="h-5 w-5" />}
              value="99.9%"
              label="Reliability (auto‑failover)"
            />
            <Stat
              icon={<Lock className="h-5 w-5" />}
              value="Complete"
              label="Compliance & audit trail"
            />
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-semibold text-gray-900">Initial products</h3>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <Card
              title="SLO Gateway for LLMs"
              desc="Drop‑in SDK that makes every call reliable, multi‑model, and fail‑safe."
            />
            <Card
              title="LLM FinOps"
              desc="True cost per request and per team; budgets with soft & hard guardrails."
            />
            <Card
              title="Governance Pack"
              desc="PII detection, model safety filters, retention, and full audit logs."
            />
          </div>

          <p className="mt-10 text-gray-600">
            Expansion: evaluators, prompt & pipeline versioning, human‑in‑the‑loop, RAG connectors,
            workload‑aware autoscaling, and policy‑driven routing across heterogeneous fleets.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-2xl font-semibold text-gray-900">
              The last mile to production—and the first mile to scale.
            </h4>
            <p className="mt-2 text-gray-600">
              Put your AI traffic under SLOs and policy. Own performance, cost, and governance.
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/contact">Talk to engineering</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link href="/docs/quickstart">Quickstart</Link>
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

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl bg-white border border-gray-200 p-5">
      <h4 className="text-lg font-medium text-gray-900">{title}</h4>
      <p className="mt-2 text-sm text-gray-600">{desc}</p>
    </div>
  );
}
