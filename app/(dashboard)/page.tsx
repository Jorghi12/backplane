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
  BadgeCheck,
  FileText,
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

              <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 heading-tight">
                Approve once. <span className="text-orange-600">Governed canary</span> in ≤ 7 days.
                <br className="hidden sm:block" />
                Certified production in <span className="text-orange-600">≤ 90 days</span>.
              </h1>

              <p className="mt-5 text-lg text-gray-600 max-w-2xl">
                TrustPlane is the <span className="font-semibold">enterprise AI control plane</span> that gets pilots to audited
                production <span className="font-semibold">in your cloud</span>. Approve identity, governance, and data boundaries once—then
                roll out <span className="font-semibold">governed automations</span> with action‑level attestations across Okta/Entra ID/Ping;
                Databricks/Snowflake; AWS/Azure/GCP; ServiceNow/Jira; Splunk/Datadog; Slack/Teams.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/contact">
                    Talk to engineering
                    <ArrowRight className="ml-2 h-5 w-5" aria-hidden />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full">
                  <Link href="/docs/quickstart">Quickstart</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full">
                  <Link href="/security">Security brief</Link>
                </Button>
              </div>

              {/* Sovereignty → writes → audit (enterprise scan order) */}
              <ul className="mt-8 grid grid-cols-2 gap-4 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <Cloud className="h-4 w-4 text-orange-600" aria-hidden /> Runs in your VPC/cloud
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-orange-600" aria-hidden /> Writes require approval
                </li>
                <li className="flex items-center gap-2">
                  <FileCheck2 className="h-4 w-4 text-orange-600" aria-hidden /> Action Certificates (attested writes)
                </li>
                <li className="flex items-center gap-2">
                  <GitBranch className="h-4 w-4 text-orange-600" aria-hidden /> Read‑first by default
                </li>
                <li className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-orange-600" aria-hidden /> No training on your data <span className="italic">(unless you opt in)</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-orange-600" aria-hidden /> Approve‑once platform
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
            Enterprises don’t struggle to start pilots—they struggle to clear security, compliance, and integration gates to
            reach production. TPRM/InfoSec, SSO/SCIM, and app/data write‑paths routinely add months and kill momentum.
          </Card>
          <Card title="Why now">
            <span className="font-medium">CFOs need ROI this fiscal year. CISOs need evidence.</span> TrustPlane ships
            <em> identity, governance, and connectors</em> as a reusable control plane—so pilots reach
            <em> governed canary</em> in days.
          </Card>
        </div>
      </section>

      {/* WHAT */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 heading-tight">TrustPlane: the AI control plane that works with your stack</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl">
            Approve the platform once—identity, audit, and data boundaries—then reuse it for multiple <span className="font-medium">governed automations</span>.
            We integrate with Databricks, Snowflake, AWS, Azure, GCP; <span className="whitespace-nowrap">Okta, Microsoft Entra ID, Ping</span>;
            ServiceNow, Jira; Splunk, Datadog; Slack, <span className="whitespace-nowrap">Microsoft Teams</span>.
          </p>

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Feature
              icon={<ShieldCheck className="h-5 w-5" aria-hidden />}
              title="Approve‑once platform"
              desc="Centralize platform review for security, compliance, and vendor risk—reused across use cases."
            />
            <Feature
              icon={<KeyRound className="h-5 w-5" aria-hidden />}
              title="Identity & provisioning"
              desc="SAML SSO (Okta, Microsoft Entra ID, Ping) and SCIM with least‑privilege defaults."
            />
            <Feature
              icon={<GitBranch className="h-5 w-5" aria-hidden />}
              title="Read‑first connectors"
              desc="Scoped OAuth, dry‑run, and deterministic audit for Databricks, Snowflake, ServiceNow, Slack, Microsoft Teams, Splunk, and Datadog."
            />
            <Feature
              icon={<LineChart className="h-5 w-5" aria-hidden />}
              title="Observability, SIEM & cost"
              desc="OpenTelemetry/Datadog exports, per‑action traces, budget/rate guardrails, and cost/showback for FinOps."
            />
            <Feature
              icon={<Shield className="h-5 w-5" aria-hidden />}
              title="Governance on by default"
              desc="RBAC/ABAC, DLP/PII controls, retention, human‑in‑the‑loop, and eDiscovery hooks."
            />
            <Feature
              icon={<Cloud className="h-5 w-5" aria-hidden />}
              title="Inside your cloud"
              desc="Runs in your account; compute and data stay put. No risk of outgrowing the platform."
            />
          </div>

          {/* Mid-page CTA */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button asChild className="rounded-full">
              <Link href="/contact">Book a readiness consult</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/docs/quickstart#policy">See a sample policy</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ACTION CERTIFICATES */}
      <section className="py-16 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">Action Certificates (attested writes)</h3>
              <p className="mt-3 text-gray-600">
                Every sensitive write is accompanied by a signed, portable artifact—an <em>Action Certificate</em>—containing policy versions,
                evaluation results, approver identities, rollout scope, cost/SLO snapshots, and a COSE signature.
                Platforms can <span className="font-medium">require a valid certificate before any side‑effects</span>.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-orange-600 mt-0.5" aria-hidden /> COSE‑signed record of each approved action
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-orange-600 mt-0.5" aria-hidden /> Portable across ServiceNow, Snowflake, Slack, Databricks, and more
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-orange-600 mt-0.5" aria-hidden /> OTel export to Splunk/Datadog; eDiscovery &amp; retention friendly
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-orange-600 mt-0.5" aria-hidden /> Optional transparency log (append‑only) in your account
                </li>
              </ul>
              <div className="mt-6 flex gap-3">
                <Button asChild className="rounded-full">
                  <Link href="#panel-certificate">View sample certificate</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/docs/action-certificates">How verification works</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-xl border border-dashed border-gray-300 p-5 bg-gray-50">
              <div className="flex items-center gap-2 text-gray-900 font-medium">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-orange-500/10 text-orange-700">
                  <FileText className="h-5 w-5" aria-hidden />
                </span>
                Evidence bundles (EU AI Act / NIST AI RMF)
              </div>
              <p className="mt-2 text-sm text-gray-600">
                TrustPlane maps identity, policy, audit, and certificates into evidence packs you can hand to Security, Legal, and Audit.
                Export controls + artifacts without leaving your VPC.
              </p>
              <ul className="mt-3 text-sm text-gray-700 space-y-1">
                <li>• Control mappings with <span className="font-medium">policy version hashes</span></li>
                <li>• <span className="font-medium">Per‑action lineage</span> + certificate links</li>
                <li>• <span className="font-medium">DPIA/LLM‑risk</span> templates &amp; runbooks</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECURITY & COMPLIANCE STRIP */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SecurityItem icon={<KeyRound className="h-5 w-5" aria-hidden />} title="SSO / SAML / SCIM" desc="Okta, Microsoft Entra ID, Ping." />
            <SecurityItem icon={<Lock className="h-5 w-5" aria-hidden />} title="KMS & Secrets" desc="BYOK, Vault integration, data residency." />
            <SecurityItem icon={<FileCheck2 className="h-5 w-5" aria-hidden />} title="Audit & Compliance" desc="SOC 2 program, audit‑log streaming, DPIA/LLM‑risk docs." />
            <SecurityItem icon={<Shield className="h-5 w-5" aria-hidden />} title="Policy‑as‑code" desc="YAML → OPA/Cedar with unit‑tested gates." />
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-semibold text-gray-900">Enterprise outcomes</h3>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Stat icon={<Activity className="h-5 w-5" aria-hidden />} value="≤ 7 days" label="Time‑to‑evidence (governed canary)" />
            <Stat icon={<Gauge className="h-5 w-5" aria-hidden />} value="≤ 90 days" label="Pilot → certified production" />
            <Stat icon={<Shield className="h-5 w-5" aria-hidden />} value="100%" label="Per‑action audit coverage" />
            <Stat icon={<Server className="h-5 w-5" aria-hidden />} value="&lt; 5 min" label="Rollback MTTR (safe‑mode)" />
          </div>
          <p className="mt-4 text-xs text-gray-500">
            Targets reflect goals vs. your historical baseline and are <span className="font-medium">not guarantees</span>.
          </p>
        </div>
      </section>

      {/* INVESTOR KPIs */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-semibold text-gray-900">KPIs that matter</h3>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Stat icon={<CheckCircle2 className="h-5 w-5" aria-hidden />} value="1,240/day" label="Approved actions" />
            <Stat icon={<Shield className="h-5 w-5" aria-hidden />} value="82%" label="Writes governed" />
            <Stat icon={<DollarSign className="h-5 w-5" aria-hidden />} value="$0.12" label="Cost per approved action" />
            <Stat icon={<Gauge className="h-5 w-5" aria-hidden />} value="99.9%" label="SLO attainment" />
            <Stat icon={<LineChart className="h-5 w-5" aria-hidden />} value="On budget" label="Budget adherence" />
            <Stat icon={<Server className="h-5 w-5" aria-hidden />} value="100%" label="Audit coverage" />
          </div>
        </div>
      </section>

      {/* PILOT KITS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-semibold text-gray-900">Start with a critical workflow</h3>
          <p className="mt-2 text-gray-600 max-w-3xl">
            Opinionated Pilot Kits include pre‑wired connectors, evals, and guardrails—so you can launch <span className="font-medium">governed canaries </span>
            in days and scale wins across LoBs.
          </p>
          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <UseCaseCard icon={<FileCheck2 className="h-5 w-5" aria-hidden />} title="Claims triage & severity" desc="Automate first notice, damage assessment, and routing with auditability, HITL, and certificate‑verified writes." />
            <UseCaseCard icon={<DollarSign className="h-5 w-5" aria-hidden />} title="AP / invoice matching" desc="Match, enrich, and post with deterministic write gates, approvals, and rollback safeguards." />
            <UseCaseCard icon={<LineChart className="h-5 w-5" aria-hidden />} title="Product attribution & tagging" desc="Tag/localize assets across DAM/CMS with per‑action lineage for eDiscovery." />
            <UseCaseCard icon={<Shield className="h-5 w-5" aria-hidden />} title="KYC / AML screening" desc="Assist analysts with policy‑based approvals, retention, and SIEM exports." />
            <UseCaseCard icon={<Activity className="h-5 w-5" aria-hidden />} title="KPI brief from data" desc="Generate monthly executive briefings from Snowflake/Databricks—no data leaves your cloud." />
            <UseCaseCard icon={<Users className="h-5 w-5" aria-hidden />} title="Customer support deflection" desc="RAG + tools with deterministic guardrails; escalate to human queues on policy triggers." />
          </div>

          {/* Mid-page CTA */}
          <div className="mt-8">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/contact">
                Plan a governed canary
                <BadgeCheck className="ml-2 h-5 w-5" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-semibold text-gray-900">Built for enterprise buyers</h3>
          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <RoleCard
              icon={<Building2 className="h-5 w-5" aria-hidden />}
              title="VP Engineering"
              bullets={[
                'Approve once across identity, audit, and data boundaries',
                'One integration to your tools; automations inherit',
                'Forward‑deployed engineers for the last mile',
              ]}
            />
            <RoleCard
              icon={<Users className="h-5 w-5" aria-hidden />}
              title="Head of AI"
              bullets={[
                'Two use cases live quickly; expansion in days',
                'Read‑first connectors with dry‑run',
                'No training on your data (unless you opt in)',
              ]}
            />
            <RoleCard
              icon={<DollarSign className="h-5 w-5" aria-hidden />}
              title="CFO / FinOps"
              bullets={[
                'Bring forward ROI by quarters',
                'Cost‑per‑approved‑action & per‑team showback',
                'Budget guardrails & spend controls',
              ]}
            />
            <RoleCard
              icon={<Shield className="h-5 w-5" aria-hidden />}
              title="CISO / Security"
              bullets={[
                'SSO/SCIM, RBAC/ABAC, least‑privilege scopes',
                'Data residency & BYOK/KMS options',
                'Certificate‑verified writes; deterministic audit & eDiscovery',
              ]}
            />
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-semibold text-gray-900">Control plane capabilities</h3>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <Card title="Identity & Access">
              SAML SSO (Okta, Microsoft Entra ID, Ping) plus SCIM user provisioning; least‑privilege roles and policy packs.
            </Card>
            <Card title="Connectors (read‑first)">
              Databricks, Snowflake, ServiceNow, Slack, Microsoft Teams, Splunk, Datadog—scoped OAuth, dry‑run, and auditable actions.
            </Card>
            <Card title="Governance & Observability">
              Audit‑log streaming, OpenTelemetry and Datadog exports, RBAC/ABAC, retention, and policy‑based approvals.
            </Card>
          </div>
          <p className="mt-10 text-gray-600">
            Roadmap: <span className="font-medium">Evaluation contracts</span> as promotion gates, prompt &amp; pipeline versioning, workload‑aware autoscaling,
            and policy‑driven routing across heterogeneous fleets.
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

      {/* FAQ / OBJECTIONS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-semibold text-gray-900">Answers to your first four objections</h3>
          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card title="Do you train on our data?">
              No—<span className="font-medium">unless you opt in</span>. Private data remains isolated; model providers or open‑weights are selectable by policy.
            </Card>
            <Card title="Where does data live?">
              Inside your cloud/VPC with <span className="font-medium">BYOK/KMS</span> and residency controls. Full audit export to your SIEM.
            </Card>
            <Card title="Are we locked in?">
              Vendor‑neutral routing and standard connectors. Swap models/tools without redoing governance.
            </Card>
            <Card title="Security posture?">
              SOC 2 program, DPIA/LLM‑risk docs, SSO/SCIM, RBAC/ABAC, and deterministic per‑action lineage for eDiscovery.
            </Card>
          </div>
        </div>
      </section>

      {/* GLOSSARY (micro) */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            <Card title="Governed canary">
              Limited rollout with read‑first access, explicit approvals for writes, full audit, and instant rollback.
            </Card>
            <Card title="Governed automation">
              A named workload bound to an approved policy; inherits identity, scopes, budgets, SLOs, and audit.
            </Card>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-2xl font-semibold text-gray-900">Approve once. Go live fast. Scale in days.</h4>
            <p className="mt-2 text-gray-600">Identity, governance, and connectors—built in. Your tools, your cloud, your controls.</p>
            <p className="mt-2 text-xs text-gray-500">Procurement &amp; risk documents available on request (SOC 2, DPIA/LLM‑risk, DPA).</p>
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
   HERO RIGHT PANEL — interactive, timed tour (a11y + reduced motion aware)
====================================================== */
function ControlPlanePanel() {
  const [tab, setTab] = useState<'Summary' | 'Policy' | 'SDK' | 'Certificate'>('Summary');
  const [policyView, setPolicyView] = useState<'YAML' | 'Cedar'>('YAML');
  const [sdkLang, setSdkLang] = useState<'java' | 'python' | 'ts'>('java');

  const [canary, setCanary] = useState(10);
  const [status, setStatus] = useState<'idle' | 'canary' | 'promoted'>('idle');
  const [events, setEvents] = useState<string[]>([]);
  const [paused, setPaused] = useState(false);
  const [certificate, setCertificate] = useState<string>('');
  const [reduced, setReduced] = useState(false);

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

  // honor prefers-reduced-motion
  useEffect(() => {
    const m = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    setReduced(!!m?.matches);
    const onChange = () => setReduced(!!m?.matches);
    m?.addEventListener?.('change', onChange);
    return () => m?.removeEventListener?.('change', onChange);
  }, []);

  // ---- Auto Tour Orchestrator ------------------------------------------------
  const startTour = () => {
    if (paused || reduced) return;
    clearAll();

    // Readable dwell times (ms)
    const D = { summary: 4200, canary: 4200, policy: 5400, promote: 4800, gap: 900 };

    let t = 0;

    schedule(() => setTab('Summary'), (t += 0));
    t += D.summary;

    schedule(() => {
      setTab('SDK');
      simulateCanary();
    }, t);
    t += D.canary;

    schedule(() => setTab('Policy'), t);
    t += D.policy;

    schedule(() => {
      setTab('SDK');
      simulatePromote();
    }, t);
    t += D.promote;

    schedule(() => {
      if (!paused && !reduced) startTour();
    }, t + D.gap);
  };

  // ---- Pause / Resume handling ----------------------------------------------
  const pauseFor = (ms = 15_000) => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    clearAll();
    setPaused(true);

    resumeTimer.current = window.setTimeout(() => {
      setPaused(false);
      setStatus('idle');
      setEvents([]);
      if (barRef.current) barRef.current.style.width = '0%';
      startTour();
    }, ms);
  };

  // Any interaction pauses the tour briefly
  useEffect(() => {
    const onInteract = () => pauseFor(15_000);
    window.addEventListener('pointerdown', onInteract, { passive: true });
    window.addEventListener('keydown', onInteract);
    return () => {
      window.removeEventListener('pointerdown', onInteract);
      window.removeEventListener('keydown', onInteract);
    };
  }, []);

  // Boot the tour on mount
  useEffect(() => {
    startTour();
    return clearAll;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, paused]);

  // ---- Content (Policy, SDK, Certificate) -----------------------------------
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

  const cedar = useMemo(
    () =>
`// compiled sketch (illustrative)
permit(write, subject, resource)
when {
  resource.is("servicenow:ticket")
  && subject in ApproverGroup::"security"
  && subject in ApproverGroup::"finops"
  && context.canary_percent <= ${canary}
  && context.eval.contract == "golden:v1"
  && context.eval.drift_p95 < 0.05
  && context.budget.monthly <= 25000
  && context.slo.latency_p95_ms <= 1200
};`,
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

  const pySdk = useMemo(
    () =>
`from trustplane import TrustPlane

tp = TrustPlane(policy="prod-us-1")

# 1) Governed canary
tp.canary(
  "ap-matching",
  dataset="golden:v1",
  dry_run=True,
  trace=True,
)

# 2) Promote with approvals
tp.promote(
  "ap-matching",
  percent=${canary},
  approvals=["security","finops"]
)
`,
    [canary]
  );

  const tsSdk = useMemo(
    () =>
`import { TrustPlane } from "@trustplane/sdk";

const tp = new TrustPlane({ policy: "prod-us-1" });

// 1) Governed canary
await tp.canary("ap-matching", {
  dataset: "golden:v1",
  dryRun: true,
  trace: true,
});

// 2) Promote with approvals
await tp.promote("ap-matching", {
  percent: ${canary},
  approvals: ["security", "finops"],
});
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
      'Action Certificate minted ✓',
    ]);
    if (barRef.current) barRef.current.style.width = `${Math.min(85, canary + 45)}%`;

    // sample certificate sketch
    const now = new Date().toISOString();
    const cert = {
      type: 'trustplane.action_certificate.v1',
      action_id: 'act_' + Math.random().toString(36).slice(2, 10),
      use_case: 'ap-matching',
      timestamp: now,
      request_hash: 'sha256:2a6e…8d4b',
      response_hash: 'sha256:7f1c…a2b1',
      policy: { id: 'prod-us-1', hash: 'sha256:9c73…f5a0' },
      evaluation: {
        contract: 'golden:v1',
        metrics: { accuracy: 0.98, drift_p95: '3.1%' },
        passed: true,
      },
      approvals: ['security', 'finops'],
      rollout: { percent: canary },
      budget_snapshot: { monthly_budget_usd: 25000, spent_usd: 8300 },
      slo_snapshot: { latency_p95_ms: 910, availability: '99.95%' },
      model: { provider: 'vendor:family', version: '2025-08-15', route: 'us-east' },
      tooling: {
        connectors: ['snowflake:read_first', 'servicenow:write_gated'],
        prompt_hash: 'sha256:f01d…0a2c',
        pipeline_version: 'r2025.09.1',
      },
      signatures: [{ alg: 'Ed25519', key_id: 'k-abc123', sig: 'base64:…', format: 'COSE_Sign1' }],
    };
    setCertificate(JSON.stringify(cert, null, 2));
  }

  // Tab click pauses tour
  const clickTab = (name: typeof tab) => {
    pauseFor();
    setTab(name);
  };

  const tabIds = {
    Summary: { tab: 'tab-summary', panel: 'panel-summary' },
    Policy: { tab: 'tab-policy', panel: 'panel-policy' },
    SDK: { tab: 'tab-sdk', panel: 'panel-sdk' },
    Certificate: { tab: 'tab-cert', panel: 'panel-cert' },
  } as const;

  const sdkByLang: Record<typeof sdkLang, string> = {
    java: javaSdk,
    python: pySdk,
    ts: tsSdk,
  };

  return (
    <div className="relative rounded-[20px] overflow-hidden h-[720px] md:h-[800px] lg:h-[880px] select-none" id="panel-certificate">
      {/* subtle glow & frame */}
      <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-white/20 via-white/5 to-transparent pointer-events-none" />
      <div className="relative h-full rounded-[20px] bg-[#0E1217] text-gray-100 shadow-2xl ring-1 ring-white/10 overflow-hidden">
        {/* header */}
        <div className="sticky top-0 z-10 px-4 py-3 backdrop-blur-[6px] bg-white/6 border-b border-white/10 flex items-center justify-between">
          <div className="flex gap-1" role="tablist" aria-label="Control panel tabs">
            <Tab id={tabIds.Summary.tab} panelId={tabIds.Summary.panel} label="Summary" active={tab === 'Summary'} onClick={() => clickTab('Summary')} />
            <Tab id={tabIds.Policy.tab} panelId={tabIds.Policy.panel} label="Policy" active={tab === 'Policy'} onClick={() => clickTab('Policy')} />
            <Tab id={tabIds.SDK.tab} panelId={tabIds.SDK.panel} label="SDK" active={tab === 'SDK'} onClick={() => clickTab('SDK')} />
            <Tab id={tabIds.Certificate.tab} panelId={tabIds.Certificate.panel} label="Certificate" active={tab === 'Certificate'} onClick={() => clickTab('Certificate')} />
          </div>
          <div className="flex items-center gap-2">
            <span title="Runtime environment" className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/8 text-[11px] border border-white/10">
              <Settings2 className="h-3.5 w-3.5" aria-hidden /> env
            </span>
            <span className="px-2 py-0.5 rounded bg-white/10 text-[11px]">prod‑us‑1</span>
            <span className="text-[10px] text-gray-400">pre‑approved in demo org</span>
          </div>
        </div>

        {/* body */}
        <div className="h-[660px] md:h-[740px] lg:h-[820px] p-4 min-h-0" onPointerDown={() => pauseFor()}>
          {tab === 'Summary' && (
            <div id={tabIds.Summary.panel} role="tabpanel" aria-labelledby={tabIds.Summary.tab} className="h-full grid grid-rows-[1fr_auto] gap-4 min-h-0">
              <div className="grid grid-cols-2 gap-4 text-[12.5px] leading-6 min-h-0">
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
                  <label htmlFor="canary-slider" className="text-[11px] text-gray-300" title="Traffic routed through governed canary">
                    Canary %
                  </label>
                  <input
                    id="canary-slider"
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
                    aria-valuemin={1}
                    aria-valuemax={50}
                    aria-valuenow={canary}
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
                    <Sparkles className="inline h-3.5 w-3.5 mr-1" aria-hidden /> Start canary
                  </button>
                  <button
                    onClick={() => {
                      pauseFor();
                      setTab('SDK');
                      simulatePromote();
                    }}
                    className="px-3 py-1 rounded bg-white/10 text-gray-100 text-[12px] font-semibold hover:bg-white/20"
                  >
                    <Zap className="inline h-3.5 w-3.5 mr-1" aria-hidden /> Promote {canary}%
                  </button>
                </div>
              </div>
            </div>
          )}

          {tab === 'Policy' && (
            <div id={tabIds.Policy.panel} role="tabpanel" aria-labelledby={tabIds.Policy.tab} className="h-full grid grid-rows-[auto_1fr] gap-3 min-h-0">
              <div className="flex items-start justify-between gap-3 min-w-0">
                <p className="text-[11.5px] sm:text-[12px] leading-snug text-gray-300">
                  Policy‑as‑code for GitOps. Compiles to OPA/Cedar; gates promotion and writes.
                </p>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex items-center gap-1 text-[11px]">
                    <Chip active={policyView === 'YAML'} onClick={() => setPolicyView('YAML')}>YAML</Chip>
                    <Chip active={policyView === 'Cedar'} onClick={() => setPolicyView('Cedar')}>Cedar</Chip>
                  </div>
                  <CopyChip text={policyView === 'YAML' ? yaml : cedar} label={`Copy ${policyView}`} />
                </div>
              </div>
              <div className="rounded-xl bg-black/30 ring-1 ring-white/10 h-full min-h-0 overflow-hidden">
                <pre className="px-4 py-4 text-[12.5px] leading-[1.6] font-mono whitespace-pre text-gray-200 h-full overflow-auto">
                  {policyView === 'YAML' ? yaml : cedar}
                </pre>
              </div>
            </div>
          )}

          {tab === 'SDK' && (
            <div id={tabIds.SDK.panel} role="tabpanel" aria-labelledby={tabIds.SDK.tab} className="h-full grid grid-rows-[auto_1fr_auto_auto] gap-3 min-h-0">
              <div className="flex items-start justify-between gap-3 min-w-0">
                <p className="text-[11.5px] sm:text-[12px] leading-snug text-gray-300">
                  Drop‑in calls your teams use to move from canary → promote.
                </p>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex items-center gap-1 text-[11px]">
                    <Chip active={sdkLang === 'java'} onClick={() => setSdkLang('java')}>Java</Chip>
                    <Chip active={sdkLang === 'python'} onClick={() => setSdkLang('python')}>Python</Chip>
                    <Chip active={sdkLang === 'ts'} onClick={() => setSdkLang('ts')}>TypeScript</Chip>
                  </div>
                  <CopyChip text={sdkByLang[sdkLang]} label="Copy SDK" />
                </div>
              </div>

              {/* code surface fills available space */}
              <div className="rounded-xl bg-black/30 p-0 h-full min-h-0 overflow-hidden">
                <pre className="px-4 py-4 text-[12.5px] leading-[1.6] font-mono whitespace-pre text-gray-200 h-full overflow-auto">
                  {sdkByLang[sdkLang]}
                </pre>
              </div>

              {/* Micro-sim */}
              <div className="rounded-lg bg-white/5 p-3">
                <div className="h-2 rounded bg-white/10 overflow-hidden" aria-hidden>
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
                <ul className="text-[12px] leading-6 font-mono text-gray-200 h-full overflow-auto" role="status" aria-live="polite">
                  {events.length ? events.map((e, i) => <li key={`${e}-${i}`}>• {e}</li>) : <li className="text-gray-400">• ready.</li>}
                </ul>
              </div>
            </div>
          )}

          {tab === 'Certificate' && (
            <div id={tabIds.Certificate.panel} role="tabpanel" aria-labelledby={tabIds.Certificate.tab} className="h-full grid grid-rows-[auto_1fr] gap-3 min-h-0">
              <div className="flex items-start justify-between gap-3 min-w-0">
                <p className="text-[11.5px] sm:text-[12px] leading-snug text-gray-300">
                  Signed artifact minted on promotion; verifiable before any write side‑effects.
                </p>
                <div className="shrink-0">
                  <CopyChip text={certificate || '// run promote to mint a certificate'} label="Copy certificate" />
                </div>
              </div>
              <div className="rounded-xl bg-black/30 ring-1 ring-white/10 h-full min-h-0 overflow-hidden">
                <pre className="px-4 py-4 text-[12.5px] leading-[1.6] font-mono whitespace-pre text-gray-200 h-full overflow-auto">
                  {certificate || '// run promote to mint a certificate'}
                </pre>
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
function Tab({
  id,
  panelId,
  label,
  active,
  onClick,
}: {
  id: string;
  panelId: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      id={id}
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 text-[12.5px] rounded-md font-medium relative transition ${
        active ? 'text-white' : 'text-gray-300 hover:text-white'
      }`}
      aria-selected={active}
      aria-controls={panelId}
      role="tab"
      title={label}
    >
      {label}
      <span
        className={`absolute left-1/2 -translate-x-1/2 -bottom-2 h-0.5 w-10 rounded ${active ? 'bg-orange-400' : 'bg-transparent'}`}
        aria-hidden
      />
    </button>
  );
}

function Chip({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-2 py-0.5 rounded ${active ? 'bg-orange-400 text-gray-900' : 'bg-white/10 text-gray-200 hover:bg-white/20'} h-6 leading-5`}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}

function CopyChip({ text, label }: { text: string; label: string }) {
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
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[11px] h-6 leading-5"
      title={label}
      aria-live="polite"
    >
      <Copy className="h-3.5 w-3.5" aria-hidden />
      {copied ? 'Copied' : label}
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

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-xl bg-white border border-gray-200 p-5 hover-raise">
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
    <div className="rounded-xl bg-white border border-gray-200 p-5 hover-raise">
      <h4 className="text-lg font-medium text-gray-900">{title}</h4>
      <p className="mt-2 text-sm text-gray-600">{children}</p>
    </div>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-xl border border-gray-200 p-5 hover-raise">
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

function SecurityItem({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-lg border border-gray-200 p-4 flex items-start gap-3 hover-raise">
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

function RoleCard({ icon, title, bullets }: { icon: React.ReactNode; title: string; bullets: string[] }) {
  return (
    <div className="rounded-xl bg-white border border-gray-200 p-5 hover-raise">
      <div className="flex items-center gap-2 text-gray-900 font-medium">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-orange-500/10 text-orange-700">{icon}</span>
        {title}
      </div>
      <ul className="mt-3 space-y-2 text-sm text-gray-600">
        {bullets.map((b, i) => (
          <li key={`${title}-${i}`} className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-orange-600 mt-0.5" aria-hidden />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StepCard({ step, title, desc }: { step: string; title: string; desc: string }) {
  return (
    <div className="rounded-xl bg-white border border-gray-200 p-5 hover-raise">
      <div className="text-xs font-semibold text-orange-700">{step}</div>
      <div className="mt-1 text-gray-900 font-medium">{title}</div>
      <div className="mt-2 text-sm text-gray-600">{desc}</div>
    </div>
  );
}

function UseCaseCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-xl bg-white border border-gray-200 p-5 hover-raise">
      <div className="flex items-center gap-2 text-gray-900 font-medium">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-orange-500/10 text-orange-700">{icon}</span>
        {title}
      </div>
      <p className="mt-3 text-sm text-gray-600">{desc}</p>
    </div>
  );
}
