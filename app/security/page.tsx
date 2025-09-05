// app/security/page.tsx
import { Shield, Lock, FileCheck2, KeyRound, Network, Server, AlarmClockCheck, CheckCircle2 } from 'lucide-react';

export default function Security() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8">
        <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
          Security brief
        </span>
        <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
          Built for regulated enterprises
        </h1>
        <p className="mt-3 text-gray-600">
          TrustPlane is an in‑VPC request‑path control plane. Compute and data stay in your cloud account;
          we standardize policy, routing, and audit across providers.
        </p>
      </header>

      <div className="space-y-8">
        <Section
          icon={<Server className="h-5 w-5 text-orange-600" />}
          title="Architecture & data flow"
        >
          Deployed inside your AWS/GCP/Azure account. The gateway/sidecar enforces SLOs and policy on the request path.
          Sensitive inputs/outputs never traverse a vendor‑hosted proxy.
        </Section>

        <Section
          icon={<Lock className="h-5 w-5 text-orange-600" />}
          title="Data protection"
        >
          At‑rest encryption via your KMS (BYOK supported). In‑transit via TLS 1.2+. Optional PII detection + masking.
          Configurable retention and redaction for prompts, completions, and traces.
        </Section>

        <Section
          icon={<KeyRound className="h-5 w-5 text-orange-600" />}
          title="Identity & access"
        >
          SSO/SAML/SCIM (Okta, Azure AD, Google). Role‑based and attribute‑based access controls for teams and workloads.
          Just‑in‑time access with immutable audit logs.
        </Section>

        <Section
          icon={<Network className="h-5 w-5 text-orange-600" />}
          title="Network security"
        >
          Private networking (VPC/VNet peering) with security groups and egress controls. No public ingress required for
          internal deployment modes.
        </Section>

        <Section
          icon={<Shield className="h-5 w-5 text-orange-600" />}
          title="Vulnerability management"
        >
          Weekly dependency scanning, container image signing, and runtime baseline alerts.
          Customer images are scanned and attested prior to deploy.
        </Section>

        <Section
          icon={<AlarmClockCheck className="h-5 w-5 text-orange-600" />}
          title="Incident response"
        >
          24×7 on‑call. Time‑bound triage SLAs and customer communications. Post‑incident reviews and corrective action tracking.
        </Section>

        <Section
          icon={<FileCheck2 className="h-5 w-5 text-orange-600" />}
          title="Compliance"
        >
          SOC 2 program underway (Type II roadmap). GDPR alignment (DPAs, EU SCCs where applicable).
          Audit exports (per‑request lineage, policy hits, evaluator decisions).
        </Section>

        <Section
          icon={<CheckCircle2 className="h-5 w-5 text-orange-600" />}
          title="Customer responsibilities"
        >
          Manage IAM/KMS policies, network boundaries, and model vendor DPAs.
          We provide reference Terraform and hardening guides; you govern data residency and keys.
        </Section>
      </div>

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
