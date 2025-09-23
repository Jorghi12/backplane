// app/security/page.tsx
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
} from 'lucide-react';

export default function Security() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <header className="mb-8">
        <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
          Security brief
        </span>
        <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
          Enterprise‑grade by design
        </h1>
        <p className="mt-3 text-gray-600">
          TrustPlane is deployed inside your VPC/VNet. Sensitive inputs/outputs never traverse a vendor‑hosted proxy.
          We standardize identity, policy, routing, and audit across providers—so you can approve once and reuse across use cases.
        </p>
      </header>

      {/* Sections */}
      <div className="space-y-8">
        <Section icon={<Server className="h-5 w-5 text-orange-600" />} title="Architecture & data flow">
          Deployed to your AWS/GCP/Azure account; no public ingress needed for private modes. The gateway/sidecar
          evaluates policy and SLOs on the request path and emits OpenTelemetry for full lineage.
        </Section>

        <Section icon={<Lock className="h-5 w-5 text-orange-600" />} title="Data protection">
          At rest via customer‑managed keys (<span className="font-medium">BYOK/KMS</span>); in transit via TLS 1.2+. Optional PII detection and masking. Configurable retention and redaction
          for prompts, completions, and traces with export to SIEM and eDiscovery vaults.
        </Section>

        <Section icon={<KeyRound className="h-5 w-5 text-orange-600" />} title="Identity & access">
          SAML SSO (Okta, Microsoft Entra ID, Ping) and SCIM provisioning. Role‑based and attribute‑based controls,
          least‑privilege defaults, and immutable audit of approvals and changes.
        </Section>

        <Section icon={<Network className="h-5 w-5 text-orange-600" />} title="Network security">
          Private networking (VPC/VNet peering) with security groups and egress controls. No data path to TrustPlane‑hosted compute in private deployments.
        </Section>

        <Section icon={<Database className="h-5 w-5 text-orange-600" />} title="Observability & audit">
          OpenTelemetry and Datadog/Splunk exports; per‑action lineage with policy version hashes and evaluator decisions.
          Artifact signing uses COSE; optional transparency log in your account.
        </Section>

        <Section icon={<Shield className="h-5 w-5 text-orange-600" />} title="Vulnerability management">
          Weekly dependency scanning, SBOMs and image signing. Runtime baseline alerts; customer images attested prior to deploy.
        </Section>

        <Section icon={<AlarmClockCheck className="h-5 w-5 text-orange-600" />} title="Incident response">
          24×7 on‑call, time‑bound triage SLAs, customer communications, post‑incident reviews, and corrective actions.
        </Section>

        <Section icon={<FileCheck2 className="h-5 w-5 text-orange-600" />} title="Compliance & privacy">
          SOC 2 program underway (Type II roadmap). GDPR alignment (DPA, EU SCCs where applicable). Evidence packs include per‑action lineage and certificate references
          to accelerate audits (EU AI Act / NIST AI RMF).
        </Section>

        {/* Shared responsibility */}
        <div className="rounded-xl bg-white border border-gray-200 p-5">
          <div className="flex items-center gap-2 text-gray-900 font-medium">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-orange-500/10">
              <FolderSymlink className="h-5 w-5 text-orange-600" />
            </span>
            Shared responsibility model
          </div>
          <div className="mt-2 text-sm text-gray-600">
            TrustPlane provides the control plane (identity, policy, connectors, audit). You govern <em>data</em>, network boundaries, IAM/KMS, and vendor DPAs.
            We ship reference Terraform and hardening guides; you keep keys and residency controls.
          </div>
          <ul className="mt-3 grid sm:grid-cols-2 gap-2 text-sm text-gray-700">
            {[
              'Customer-managed keys (BYOK), residency, and retention',
              'IAM roles and least-privilege scopes',
              'Network peering and egress policy',
              'Model vendor DPAs and allowlists',
            ].map((t) => (
              <li key={t} className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-orange-600 mt-0.5" /> {t}</li>
            ))}
          </ul>
        </div>

        {/* Action Certificates */}
        <Section icon={<Cable className="h-5 w-5 text-orange-600" />} title="Action Certificates (attested writes)">
          Every sensitive write mints a signed, portable certificate including policy hashes, evaluation results, approver identities, rollout scope, and SLO/cost snapshots.
          Downstream systems may <span className="font-medium">require a valid certificate before any side‑effects</span>.
        </Section>
      </div>

      {/* CTAs */}
      <div className="mt-10 flex flex-wrap gap-3">
        <a
          href="/contact?topic=security"
          className="inline-flex items-center rounded-full bg-gray-900 px-5 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Request the full security pack
        </a>
        <a
          href="/docs/quickstart"
          className="inline-flex items-center rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
        >
          View deployment quickstart
        </a>
      </div>
    </main>
  );
}

function Section({
  icon,
  title,
  children
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl bg-white border border-gray-200 p-5">
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
