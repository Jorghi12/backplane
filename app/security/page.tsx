// app/security/page.tsx
import Link from 'next/link';
import {
  Shield,
  Lock,
  FileCheck2,
  KeyRound,
  Network,
  Server,
  AlarmClockCheck,
  CheckCircle2,
  Database,
  FolderSymlink,
  Cable,
  FileText,
  Globe,
  Eye,
  ShieldCheck,
} from 'lucide-react';

/**
 * Security brief — Enterprise-grade by design
 *
 * Copy focuses on “approve once, reuse everywhere,” time‑to‑evidence,
 * and verifiable writes (Action Certificates). Every section is scannable,
 * linkable, and aligned to buyer objections from Security, Compliance, and IT.
 */
export default function Security() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <header className="mb-10">
        <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
          Security brief
        </span>
        <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
          Enterprise‑grade by design
        </h1>
        <p className="mt-3 text-gray-600 max-w-3xl">
          TrustPlane runs <span className="font-medium">inside your VPC/VNet</span>. Sensitive inputs/outputs never traverse a
          vendor proxy. We standardize identity, policy, routing, and audit across providers—so you can{' '}
          <span className="font-medium">approve once</span> and reuse across use cases. Target outcomes: <span className="font-medium">≤ 7 days time‑to‑evidence</span> and{' '}
          <span className="font-medium">≤ 90 days</span> pilot → certified production.
        </p>
      </header>

      {/* At-a-glance controls */}
      <section aria-labelledby="controls" className="mb-10">
        <h2 id="controls" className="text-lg font-semibold text-gray-900">Controls at a glance</h2>
        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Glance icon={<Server className="h-5 w-5" />} title="In‑VPC / customer‑owned">
            Deploys to your AWS/GCP/Azure. No public ingress for private modes.
          </Glance>
          <Glance icon={<KeyRound className="h-5 w-5" />} title="SSO + SCIM">
            Okta, Microsoft Entra ID, Ping. Least‑privilege roles & ABAC/RBAC.
          </Glance>
          <Glance icon={<Lock className="h-5 w-5" />} title="BYOK/KMS + residency">
            Customer‑managed keys; data residency options (US/EU).
          </Glance>
          <Glance icon={<Network className="h-5 w-5" />} title="Private networking">
            VPC/VNet peering; egress controls; no data path to vendor compute.
          </Glance>
          <Glance icon={<Eye className="h-5 w-5" />} title="Deterministic audit">
            Per‑action lineage, evaluator decisions, policy version hashes.
          </Glance>
          <Glance icon={<FileText className="h-5 w-5" />} title="Evidence packs">
            Export bundles for EU AI Act / NIST AI RMF / internal audits.
          </Glance>
        </div>
      </section>

      {/* Sections */}
      <div className="space-y-8">
        <Section id="architecture" icon={<Server className="h-5 w-5 text-orange-600" />} title="Architecture & data flow">
          Deployed to your AWS/GCP/Azure account; no public ingress required for private modes.
          The gateway/sidecar evaluates policy and SLOs on the request path and emits OpenTelemetry for full lineage.
          Model/tool routing is vendor‑neutral and policy‑driven, with rollback safe‑modes.
        </Section>

        <Section id="data-protection" icon={<Lock className="h-5 w-5 text-orange-600" />} title="Data protection">
          At rest via customer‑managed keys (<span className="font-medium">BYOK/KMS</span>); in transit via TLS 1.2+.
          Optional PII detection and masking. Configurable retention/redaction for prompts, completions, and traces;
          export to SIEM and eDiscovery vaults.
        </Section>

        <Section id="identity-access" icon={<KeyRound className="h-5 w-5 text-orange-600" />} title="Identity & access">
          SAML SSO (Okta, Microsoft Entra ID, Ping) and SCIM provisioning. Role‑based and attribute‑based controls,
          least‑privilege defaults, just‑in‑time access, and immutable audit of approvals and changes.
        </Section>

        <Section id="network" icon={<Network className="h-5 w-5 text-orange-600" />} title="Network security">
          Private networking (VPC/VNet peering) with security groups and egress controls. For private deployment modes
          there is no data path to TrustPlane‑hosted compute.
        </Section>

        <Section id="observability" icon={<Database className="h-5 w-5 text-orange-600" />} title="Observability & audit">
          OpenTelemetry and Datadog/Splunk exports; per‑action lineage with policy version hashes and evaluator decisions.
          Artifact signing uses COSE; optional transparency log in your account.
        </Section>

        <Section id="vuln-mgmt" icon={<Shield className="h-5 w-5 text-orange-600" />} title="Vulnerability management">
          Weekly dependency scanning, SBOMs and image signing. Runtime baseline alerts; customer images attested prior to deploy.
        </Section>

        <Section id="ir" icon={<AlarmClockCheck className="h-5 w-5 text-orange-600" />} title="Incident response">
          24×7 on‑call, time‑bound triage SLAs, customer communications, post‑incident reviews, and corrective actions.
        </Section>

        <Section id="compliance" icon={<FileCheck2 className="h-5 w-5 text-orange-600" />} title="Compliance & privacy">
          SOC 2 program underway (Type II roadmap). GDPR alignment (DPA, EU SCCs where applicable).
          Evidence packs include per‑action lineage and certificate references to accelerate audits (EU AI Act / NIST AI RMF).
        </Section>

        {/* Shared responsibility */}
        <div id="shared-responsibility" className="rounded-xl bg-white border border-gray-200 p-5">
          <div className="flex items-center gap-2 text-gray-900 font-medium">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-orange-500/10">
              <FolderSymlink className="h-5 w-5 text-orange-600" />
            </span>
            Shared responsibility model
          </div>
          <p className="mt-2 text-sm text-gray-600">
            TrustPlane provides the <em>control plane</em> (identity, policy, connectors, audit).
            You govern <em>data</em>, network boundaries, IAM/KMS, and vendor DPAs. We ship reference
            Terraform and hardening guides; you keep keys and residency controls.
          </p>
          <ul className="mt-3 grid sm:grid-cols-2 gap-2 text-sm text-gray-700">
            {[
              'Customer‑managed keys (BYOK), residency, and retention',
              'IAM roles and least‑privilege scopes',
              'Network peering and egress policy',
              'Model vendor DPAs and allowlists',
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-orange-600 mt-0.5" /> {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Action Certificates */}
        <Section id="action-certificates" icon={<Cable className="h-5 w-5 text-orange-600" />} title="Action Certificates (attested writes)">
          Every sensitive write mints a signed, portable certificate including policy hashes, evaluation results, approver identities,
          rollout scope, and SLO/cost snapshots. Downstream systems may <span className="font-medium">require a valid certificate before any side‑effects</span>.
          <ul className="mt-3 grid sm:grid-cols-2 gap-2 text-sm text-gray-700">
            <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-orange-600 mt-0.5" /> COSE‑signed, verifiable artifact per action</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-orange-600 mt-0.5" /> Portable across ServiceNow, Snowflake, Slack, Databricks</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-orange-600 mt-0.5" /> OTel → Splunk/Datadog; retention &amp; eDiscovery friendly</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-orange-600 mt-0.5" /> Optional transparency log (append‑only) in your account</li>
          </ul>
          <div className="mt-4 rounded-lg border border-dashed border-gray-300 p-4 bg-gray-50">
            <div className="flex items-center gap-2 text-gray-900 font-medium">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-orange-500/10 text-orange-700">
                <FileText className="h-5 w-5" />
              </span>
              Evidence bundles (EU AI Act / NIST AI RMF)
            </div>
            <p className="mt-2 text-sm text-gray-600">We map identity, policy, audit, and certificates into exportable evidence packs for Security, Legal, and Audit.</p>
            <ul className="mt-2 text-sm text-gray-700 space-y-1">
              <li>• Control mappings with <span className="font-medium">policy version hashes</span></li>
              <li>• <span className="font-medium">Per‑action lineage</span> + certificate links</li>
              <li>• DPIA/LLM‑risk templates &amp; runbooks</li>
            </ul>
          </div>
        </Section>
      </div>

      {/* FAQ */}
      <section aria-labelledby="faq" className="mt-12">
        <h3 id="faq" className="text-lg font-semibold text-gray-900">FAQ</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <QA q="Do you run inside our VPC/VNet?">
            Yes—deployment is in your cloud account so compute and data remain within your perimeter. Private modes require no public ingress.
          </QA>
          <QA q="Do you train on our data?">
            No—<span className="font-medium">unless you opt in</span>. Model providers and open‑weights are selectable by policy. Routing is vendor‑neutral.
          </QA>
          <QA q="How do you handle secrets and keys?">
            BYOK/KMS with customer‑managed keys. Reference Terraform &amp; hardening guides help you enforce residency, egress, and IAM scopes.
          </QA>
          <QA q="What artifacts are available for procurement?">
            SOC 2 program materials, DPIA/LLM‑risk docs, DPA/SCC templates, and Action Certificate samples. Request the full pack below.
          </QA>
        </div>
      </section>

      {/* CTAs */}
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/contact?topic=security"
          className="inline-flex items-center rounded-full bg-gray-900 px-5 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Request the full security pack
        </Link>
        <Link
          href="/docs/quickstart"
          className="inline-flex items-center rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
        >
          View deployment quickstart
        </Link>
      </div>

      {/* Procurement strip */}
      <section className="mt-12 rounded-xl border border-gray-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-gray-900">Procurement &amp; risk shortcuts</h3>
        <ul className="mt-3 grid sm:grid-cols-2 gap-2 text-sm text-gray-700">
          <li className="flex items-start gap-2"><ShieldCheck className="h-4 w-4 text-orange-600 mt-0.5" /> Security review support (questionnaires, diagrams)</li>
          <li className="flex items-start gap-2"><FileCheck2 className="h-4 w-4 text-orange-600 mt-0.5" /> SOC 2 program / Type II roadmap</li>
          <li className="flex items-start gap-2"><Globe className="h-4 w-4 text-orange-600 mt-0.5" /> Data residency controls (US/EU), BYOK/KMS</li>
          <li className="flex items-start gap-2"><Database className="h-4 w-4 text-orange-600 mt-0.5" /> SIEM streaming (OTel → Datadog/Splunk)</li>
        </ul>
      </section>
    </main>
  );
}

/* ----------------------------- Components ----------------------------- */

function Glance({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-gray-200 p-4 flex items-start gap-3 bg-white">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-orange-500/10 text-orange-700">
        {icon}
      </span>
      <div>
        <div className="text-sm font-medium text-gray-900">{title}</div>
        <div className="text-sm text-gray-600">{children}</div>
      </div>
    </div>
  );
}

function Section({
  id,
  icon,
  title,
  children,
}: {
  id?: string;
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="rounded-xl bg-white border border-gray-200 p-5">
      <div className="flex items-center gap-2 text-gray-900 font-medium">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-orange-500/10">
          {icon}
        </span>
        {title}
      </div>
      <div className="mt-2 text-sm text-gray-600">{children}</div>
    </section>
  );
}

function QA({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details className="rounded-lg border border-gray-200 bg-white p-4">
      <summary className="cursor-pointer font-medium text-gray-900">{q}</summary>
      <p className="mt-2 text-sm text-gray-700">{children}</p>
    </details>
  );
}
