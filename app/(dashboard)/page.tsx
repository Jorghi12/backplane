'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
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
  Users,
  Copy,
  Sparkles,
  Zap,
  Settings2,
} from 'lucide-react';

/* ======================================================
   PAGE
====================================================== */
export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section className="pt-20 pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* LEFT */}
            <div className="lg:col-span-6">
              <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700 tracking-wide">
                TrustPlane
              </span>

              <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900">
                Approve once. <span className="text-orange-600">Governed canary</span> in under a week.
                <br className="hidden sm:block" />
                Certified production in <span className="text-orange-600">≤ 90 days</span>.
              </h1>

              <p className="mt-5 text-lg text-gray-600 max-w-2xl">
                TrustPlane is the <span className="font-semibold">enterprise AI control plane</span> that
                turns pilots into audited production <span className="font-semibold">in your cloud</span>.
                Approve identity, governance, and data boundaries once—then ship many agents under the
                same guardrails. Works with Okta/Entra/Ping, Databricks, Snowflake, AWS/Azure/GCP,
                ServiceNow/Jira, Splunk/Datadog, and Slack/Teams.
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
                  <GitBranch className="h-4 w-4 text-orange-600" /> Read‑first by default
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-orange-600" /> Writes require approval
                </li>
                <li className="flex items-center gap-2">
                  <FileCheck2 className="h-4 w-4 text-orange-600" /> Per‑action audit export
                </li>
                <li className="flex items-center gap-2">
                  <Cloud className="h-4 w-4 text-orange-600" /> Runs in your VPC / cloud
                </li>
                <li className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-orange-600" /> No training on your data by default
                </li>
              </ul>
            </div>

            {/* RIGHT: interactive panel */}
            <div className="lg:col-span-6">
              <ControlPlanePanel />
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM / WHY NOW */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8">
          <Card title="The problem">
            Fortune‑500s don’t struggle to start pilots—they struggle to clear security, compliance, and
            integration gates to reach production. TPRM/InfoSec reviews, SSO/SCIM, and app/data integrations
            routinely add months and kill momentum.
          </Card>
          <Card title="Why now">
            Exec teams need ROI this fiscal year. TrustPlane collapses the review/integration path by shipping
            <em> identity, governance, and connectors</em> as a reusable control plane—so pilots reach
            <em> governed canary</em> in days.
          </Card>
        </div>
      </section>

      {/* WHAT */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900">
            TrustPlane: the AI control plane that works with your stack
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl">
            Approve the platform once—identity, audit, and data boundaries—then reuse it for multiple AI
            agents. We integrate with Databricks, Snowflake, AWS, Azure, GCP; Okta/Entra/Ping; ServiceNow/Jira;
            Splunk/Datadog; Slack/Teams.
          </p>

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Feature
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Approve‑once platform"
              desc="Centralize platform review for security, compliance, and vendor risk—reused across use cases."
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
              desc="OpenTelemetry/Datadog exports, per‑action traces, budget/rate guardrails, and cost/showback."
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

      {/* OUTCOMES */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-semibold text-gray-900">Enterprise outcomes</h3>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Stat icon={<Activity className="h-5 w-5" />} value="≤ 7 days" label="Time‑to‑evidence (governed canary)" />
            <Stat icon={<Gauge className="h-5 w-5" />} value="≤ 90 days" label="Pilot → certified production" />
            <Stat icon={<Shield className="h-5 w-5" />} value="100%" label="Per‑action audit coverage" />
            <Stat icon={<Server className="h-5 w-5" />} value="&lt; 5 min" label="Rollback MTTR (safe‑mode)" />
          </div>
          <p className="mt-4 text-xs text-gray-500">
            Targets are goals measured against each customer’s historical baselines; not guarantees.
          </p>
        </div>
      </section>

      {/* PILOT KITS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-semibold text-gray-900">Start with a hair‑on‑fire workflow</h3>
          <p className="mt-2 text-gray-600 max-w-3xl">
            Opinionated “Pilot Kits” include pre‑wired connectors, evals, and guardrails—so you can launch canaries
            in days and scale wins across LoBs.
          </p>
          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <UseCaseCard icon={<FileCheck2 className="h-5 w-5" />} title="Claims triage & severity" desc="Automate first notice, damage assessment, and routing with auditability and human‑in‑the‑loop." />
            <UseCaseCard icon={<DollarSign className="h-5 w-5" />} title="AP / invoice matching" desc="Match, enrich, and post with deterministic write gates and rollback safeguards." />
            <UseCaseCard icon={<LineChart className="h-5 w-5" />} title="Product attribution & tagging" desc="Tag and localize assets across DAM/CMS with per‑action lineage for eDiscovery." />
            <UseCaseCard icon={<Shield className="h-5 w-5" />} title="KYC / AML screening" desc="Assist analysts with policy‑based approvals, retention, and audit exports to SIEM." />
            <UseCaseCard icon={<Activity className="h-5 w-5" />} title="KPI brief from data" desc="Automate monthly executive readouts from Snowflake/Databricks—no data leaves your cloud." />
            <UseCaseCard icon={<Users className="h-5 w-5" />} title="Customer support deflection" desc="RAG + tools with deterministic guardrails; escalate to human queues on policy triggers." />
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-semibold text-gray-900">Built for enterprise buyers</h3>
          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <RoleCard icon={<Building2 className="h-5 w-5" />} title="VP Engineering" bullets={['Approve once across identity, audit, and data boundaries','One integration to your tools; agents inherit','Forward‑deployed engineers for the last mile']} />
            <RoleCard icon={<Users className="h-5 w-5" />} title="Head of AI" bullets={['Two use cases live quickly; expansion in days','Read‑first connectors with dry‑run','No training on your data by default']} />
            <RoleCard icon={<DollarSign className="h-5 w-5" />} title="CFO / FinOps" bullets={['Bring forward ROI by quarters','True cost per request & team','Budget guardrails and spend controls']} />
            <RoleCard icon={<Shield className="h-5 w-5" />} title="CISO / Security" bullets={['SSO/SCIM, RBAC/ABAC, least‑privilege scopes','Data residency & BYOK/KMS options','Deterministic audit & eDiscovery hooks']} />
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-semibold text-gray-900">Control plane capabilities (MVP)</h3>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <Card title="Identity & Access">SAML SSO (Okta/Entra/Ping) plus SCIM user provisioning; least‑privilege roles and policy packs.</Card>
            <Card title="Connectors (read‑first)">Databricks/Snowflake, ServiceNow, Slack/Teams, Splunk/Datadog—scoped OAuth, dry‑run, and auditable actions.</Card>
            <Card title="Governance & Observability">Audit‑log streaming, OpenTelemetry/Datadog exports, RBAC/ABAC, retention, and policy‑based approvals.</Card>
          </div>
          <p className="mt-10 text-gray-600">
            Roadmap: evaluators, prompt & pipeline versioning, workload‑aware autoscaling, and policy‑driven routing
            across heterogeneous fleets.
          </p>
        </div>
      </section>

      {/* 90-DAY PLAN */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-semibold text-gray-900">90‑day plan to production</h3>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <StepCard step="Weeks 0–2" title="Trust & identity" desc="Stand up trust portal; SAML SSO + SCIM configured; baseline audit export." />
            <StepCard step="Weeks 2–6" title="Connectors & governance" desc="Read‑first connectors live; RBAC/ABAC and policy packs enabled; SIEM streaming & golden sets." />
            <StepCard step="Weeks 6–12" title="Canary → certify" desc="Approval workflows for writes; rollback/safe‑mode; production certification & runbooks." />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-2xl font-semibold text-gray-900">Approve once. Go live fast. Scale in days.</h4>
            <p className="mt-2 text-gray-600">Identity, governance, and connectors—built in. Your tools, your cloud, your controls.</p>
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

/* ======================================================
   HERO RIGHT PANEL — interactive, timed tour + pause/resume
====================================================== */
function ControlPlanePanel() {
  const [tab, setTab] = useState<'Summary' | 'Policy' | 'SDK'>('Summary');
  const [canary, setCanary] = useState(10);
  const [status, setStatus] = useState<'idle' | 'canary' | 'promoted'>('idle');
  const [events, setEvents] = useState<string[]>([]);
  const [paused, setPaused] = useState(false);

  const barRef = useRef<HTMLDivElement>(null);

  // timers for the tour + a single optional resume timer
  const timeouts = useRef<number[]>([]);
  const resumeTimer = useRef<number | null>(null);

  const schedule = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timeouts.current.push(id);
    return id;
  };
  const clearAll = () => {
    timeouts.current.forEach((t) => clearTimeout(t));
    timeouts.current = [];
  };

  // ---- Auto Tour Orchestrator ------------------------------------------------
  const startTour = () => {
    if (paused) return; // safety
    clearAll();

    // Readable dwell times (ms)
    const D = {
      summary: 4200,
      canary: 4200,
      policy: 5200,
      promote: 4500,
      gap: 800,
    };

    let t = 0;

    // 1) Summary
    schedule(() => setTab('Summary'), (t += 0));
    t += D.summary;

    // 2) SDK (canary)
    schedule(() => {
      setTab('SDK');
      simulateCanary();
    }, t);
    t += D.canary;

    // 3) Policy YAML
    schedule(() => {
      setTab('Policy');
    }, t);
    t += D.policy;

    // 4) SDK (promote)
    schedule(() => {
      setTab('SDK');
      simulatePromote();
    }, t);
    t += D.promote;

    // loop again
    schedule(() => {
      if (!paused) startTour();
    }, t + D.gap);
  };

  // ---- Pause / Resume handling ----------------------------------------------
  const pauseFor = (ms = 60_000) => {
    // reset any existing resume timer
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    clearAll();
    setPaused(true);

    resumeTimer.current = window.setTimeout(() => {
      setPaused(false);
      // reset state to a pleasant starting point
      setStatus('idle');
      setEvents([]);
      if (barRef.current) barRef.current.style.width = '0%';
      startTour();
    }, ms);
  };

  // Any user interaction pauses the tour; after 60s it resumes.
  useEffect(() => {
    const onInteract = () => pauseFor(60_000);
    window.addEventListener('pointerdown', onInteract, { passive: true });
    window.addEventListener('keydown', onInteract);
    return () => {
      window.removeEventListener('pointerdown', onInteract);
      window.removeEventListener('keydown', onInteract);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Boot the tour on mount
  useEffect(() => {
    startTour();
    return clearAll;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Content (YAML + SDK) --------------------------------------------------
  const yaml = useMemo(
    () =>
`version: 1
policy: prod-us-1
identity:
  saml: true
  scim: true
audit:
  sink: datadog
  otel: true
  retention_days: 365
data:
  residency: [us, eu]
  kms: byok
  egress: deny_by_default
  pii: redact
connectors:
  snowflake:  { mode: read_first,  role: ANALYST }
  servicenow: { mode: write_gated }
guardrails:
  writes: { approvals: [security, finops] }
  canary: { pct: ${String(canary).padStart(2, ' ')}, eval: golden:v1, rollback_on: { drift_p95: '>5%' } }
slo:      { latency_p95_ms: 1200, availability: '99.9%' }
limits:   { rps: 5, monthly_budget_usd: 25000 }
targets:  { tte_days: 7, ttc_days: 7, ttp_days: 90, mttr_min: 5 }

`,
    [canary]
  );

  const javaSdk = useMemo(
    () =>
`import com.trustplane.sdk.*;
import java.util.Arrays;

public class Example {
  public static void main(String[] args) {
    TrustPlane tp = TrustPlane.newClient()
        .policy("prod-us-1")
        .build();

    // 1) Start governed canary (read-first, audited)
    tp.canary("ap-matching",
        CanaryOptions.builder()
            .dataset("golden:v1")
            .dryRun(true)
            .trace(true)
            .build()
    );

    // 2) Request promotion with approvals
    tp.promote("ap-matching",
        PromoteOptions.builder()
            .percent(${canary})
            .approvals(Arrays.asList("security", "finops"))
            .build()
    );
  }
}
`,
    [canary]
  );

  // ---- Micro-sim helpers -----------------------------------------------------
  function simulateCanary() {
    setStatus('canary');
    setEvents(['starting governed canary…']);
    if (barRef.current) barRef.current.style.width = '0%';

    const steps = [canary, canary * 2, Math.round(canary * 3), 36, 50];
    steps.forEach((pct, i) =>
      schedule(() => {
        const v = Math.min(pct, 50);
        if (barRef.current) barRef.current.style.width = `${v}%`;
        setEvents((e) => [...e, `traffic routed: ${v}%`]);
        if (i === steps.length - 1) {
          setEvents((e) => [...e, 'OpenTelemetry export → Datadog', 'budget & SLO checks ✓']);
        }
      }, 320 * (i + 1))
    );
  }

  function simulatePromote() {
    setStatus('promoted');
    setEvents((e) => [
      ...e,
      'promotion requested…',
      'security approval ✓',
      'finops approval ✓',
      `rollout gate opened to ${canary}%`,
    ]);
    if (barRef.current) barRef.current.style.width = `${Math.min(85, canary + 45)}%`;
  }

  // Tab click should also pause the tour
  const clickTab = (name: 'Summary' | 'Policy' | 'SDK') => {
    pauseFor();
    setTab(name);
  };

  return (
    <div className="relative rounded-[20px] overflow-hidden h-[820px] select-none">
      {/* subtle glow & frame */}
      <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-white/20 via-white/5 to-transparent pointer-events-none" />
      <div className="relative h-full rounded-[20px] bg-[#0E1217] text-gray-100 shadow-2xl ring-1 ring-white/10 overflow-hidden">
        {/* header */}
        <div className="sticky top-0 z-10 px-4 py-3 backdrop-blur-[6px] bg-white/6 border-b border-white/10 flex items-center justify-between">
          <div className="flex gap-1">
            <Tab label="Summary" active={tab === 'Summary'} onClick={() => clickTab('Summary')} />
            <Tab label="Policy YAML" active={tab === 'Policy'} onClick={() => clickTab('Policy')} />
            <Tab label="SDK" active={tab === 'SDK'} onClick={() => clickTab('SDK')} />
          </div>
          <div className="flex items-center gap-2">
            {paused && (
              <span className="px-2 py-0.5 rounded bg-white/10 text-[11px] text-orange-200 border border-white/10">
                Auto‑demo paused — resumes shortly
              </span>
            )}
            <span title="Runtime environment" className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/8 text-[11px] border border-white/10">
              <Settings2 className="h-3.5 w-3.5" /> env
            </span>
            <span className="px-2 py-0.5 rounded bg-white/10 text-[11px]">prod‑us‑1</span>
            <span className="text-[10px] text-gray-400">pre‑approved in your org</span>
          </div>
        </div>

        {/* body */}
        <div className="h-[768px] p-4" onPointerDown={() => pauseFor()}>
          {tab === 'Summary' && (
            <div className="h-full grid grid-rows-[1fr_auto] gap-4">
              <div className="grid grid-cols-2 gap-4 text-[12.5px] leading-6">
                <SummaryTile title="Identity & Access" items={['SSO (SAML) ✓', 'SCIM ✓', 'Roles: Operator, Approver']} />
                <SummaryTile title="Audit" items={['OpenTelemetry: on', 'Sink: Datadog', 'Retention: 365 days']} />
                <SummaryTile title="Data boundaries" items={['Residency: US/EU', 'BYOK / KMS: on', 'Egress: deny', 'PII: redact']} />
                <SummaryTile title="Connectors" items={['Snowflake (read‑first)', 'ServiceNow (write‑gated)', 'Slack, Datadog (read‑first)']} />
                <SummaryTile title="Guardrails" items={['Writes require approval', 'Approvers: Security, FinOps', `Canary: ${canary}% + auto‑rollback`]} />
                <SummaryTile title="Budgets & SLOs" items={['Budget: $25k/mo', 'RPS limit: 5', 'SLO: 99.9% • p95 1200ms']} />
              </div>

              <div className="rounded-xl bg-white/5 p-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  <Pill> TTE ≤ 7d </Pill>
                  <Pill> TTC ≤ 7d </Pill>
                  <Pill> TTP ≤ 90d </Pill>
                  <Pill> MTTR &lt; 5m </Pill>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-gray-300" title="Traffic routed through governed canary">
                    Canary %
                  </span>
                  <input
                    type="range"
                    min={1}
                    max={50}
                    step={1}
                    value={canary}
                    onChange={(e) => {
                      pauseFor();
                      setCanary(Number(e.target.value));
                    }}
                    className="accent-orange-500 h-1.5 w-28"
                    aria-label="Canary percentage"
                  />
                  <span className="w-8 text-center text-sm">{canary}</span>
                  <button
                    onClick={() => {
                      pauseFor();
                      setTab('SDK');
                      simulateCanary();
                    }}
                    className="px-3 py-1 rounded bg-orange-400 text-gray-900 text-[12px] font-semibold hover:bg-orange-300"
                  >
                    <Sparkles className="inline h-3.5 w-3.5 mr-1" /> Start canary
                  </button>
                  <button
                    onClick={() => {
                      pauseFor();
                      setTab('SDK');
                      simulatePromote();
                    }}
                    className="px-3 py-1 rounded bg-white/10 text-gray-100 text-[12px] font-semibold hover:bg-white/20"
                  >
                    <Zap className="inline h-3.5 w-3.5 mr-1" /> Promote {canary}%
                  </button>
                </div>
              </div>
            </div>
          )}

          {tab === 'Policy' && (
            <div className="h-full grid grid-rows-[auto_1fr] gap-3">
              <div className="flex items-center justify-between gap-3 min-w-0">
                <div className="text-[12px] text-gray-300 truncate">
                  Policy as code for GitOps. Updated as you adjust controls.
                </div>
                <div className="shrink-0">
                  <CopyButton text={yaml} label="Copy YAML" />
                </div>
              </div>
              <div className="rounded-xl bg-black/30 ring-1 ring-white/10 h-full overflow-hidden">
                <pre className="px-4 py-4 text-[12.5px] leading-[1.6] font-mono whitespace-pre text-gray-200 h-full">
                  {yaml}
                </pre>
              </div>
            </div>
          )}

          {tab === 'SDK' && (
            <div className="h-full grid grid-rows-[auto_1fr_auto_auto] gap-3">
              <div className="flex items-center justify-between gap-3 min-w-0">
                <div className="text-[12px] text-gray-300 truncate">
                  Drop‑in calls your teams use to move from canary → promote.
                </div>
                <div className="shrink-0">
                  <CopyButton text={javaSdk} label="Copy SDK" />
                </div>
              </div>

              {/* code surface without scrollbars */}
              <div className="rounded-xl bg-black/30 h-[400px] p-4 overflow-hidden">
                <pre className="text-[12.5px] leading-[1.6] font-mono whitespace-pre text-gray-200">
                  {javaSdk}
                </pre>
              </div>

              {/* Micro-sim */}
              <div className="rounded-lg bg-white/5 p-3">
                <div className="h-2 rounded bg-white/10 overflow-hidden">
                  <div ref={barRef} className="h-full w-0 bg-orange-400 transition-all duration-300" />
                </div>
                <div className="mt-2 flex gap-2 flex-wrap text-[11px]">
                  <span className={`px-2 py-0.5 rounded ${status === 'canary' ? 'bg-emerald-300 text-gray-900' : 'bg-white/10 text-gray-200'}`}>canary</span>
                  <span className={`px-2 py-0.5 rounded ${status === 'promoted' ? 'bg-orange-300 text-gray-900' : 'bg-white/10 text-gray-200'}`}>promote</span>
                  <span className="px-2 py-0.5 rounded bg-white/10 text-gray-200">audit: on</span>
                  <span className="px-2 py-0.5 rounded bg-white/10 text-gray-200">trace: on</span>
                </div>
              </div>

              {/* events */}
              <div className="rounded-lg bg-black/25 ring-1 ring-white/10 p-3 h-[140px] overflow-hidden">
                <div className="text-[11px] text-gray-300 mb-1">events</div>
                <ul className="text-[12px] leading-6 font-mono text-gray-200">
                  {events.length ? events.map((e, i) => <li key={`${e}-${i}`}>• {e}</li>) : <li className="text-gray-400">• ready.</li>}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ======================================================
   PRESENTATIONAL
====================================================== */
function Tab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 text-[12.5px] rounded-md font-medium relative transition ${
        active ? 'text-white' : 'text-gray-300 hover:text-white'
      }`}
      aria-selected={active}
      role="tab"
      title={label}
    >
      {label}
      <span
        className={`absolute left-1/2 -translate-x-1/2 -bottom-2 h-0.5 w-10 rounded ${
          active ? 'bg-orange-400' : 'bg-transparent'
        }`}
        aria-hidden
      />
    </button>
  );
}

function SummaryTile({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[14px] bg-white/5 p-4 min-h-[124px] ring-1 ring-white/8 shadow-sm">
      <div className="text-gray-300">{title}</div>
      <ul className="mt-1.5 space-y-1 text-gray-200">
        {items.map((t, i) => (
          <li key={`${title}-${i}`}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="px-2 py-1 rounded bg-orange-200/90 text-gray-900 text-[11px] font-semibold shadow-sm">{children}</span>;
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1200);
        } catch {
          /* noop */
        }
      }}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-[11px] font-medium"
      title={label}
    >
      <Copy className="h-3.5 w-3.5" />
      {copied ? 'Copied' : label}
    </button>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
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

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-white border border-gray-200 p-5">
      <h4 className="text-lg font-medium text-gray-900">{title}</h4>
      <p className="mt-2 text-sm text-gray-600">{children}</p>
    </div>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
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

function RoleCard({ icon, title, bullets }: { icon: React.ReactNode; title: string; bullets: string[] }) {
  return (
    <div className="rounded-xl bg-white border border-gray-200 p-5">
      <div className="flex items-center gap-2 text-gray-900 font-medium">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-orange-500/10 text-orange-700">{icon}</span>
        {title}
      </div>
      <ul className="mt-3 space-y-2 text-sm text-gray-600">
        {bullets.map((b, i) => (
          <li key={`${title}-${i}`} className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-orange-600 mt-0.5" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StepCard({ step, title, desc }: { step: string; title: string; desc: string }) {
  return (
    <div className="rounded-xl bg-white border border-gray-200 p-5">
      <div className="text-xs font-semibold text-orange-700">{step}</div>
      <div className="mt-1 text-gray-900 font-medium">{title}</div>
      <div className="mt-2 text-sm text-gray-600">{desc}</div>
    </div>
  );
}

function UseCaseCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-xl bg-white border border-gray-200 p-5">
      <div className="flex items-center gap-2 text-gray-900 font-medium">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-orange-500/10 text-orange-700">{icon}</span>
        {title}
      </div>
      <p className="mt-3 text-sm text-gray-600">{desc}</p>
    </div>
  );
}
