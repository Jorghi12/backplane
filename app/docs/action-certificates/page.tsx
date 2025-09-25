// app/docs/action-certificates/page.tsx
import { ShieldCheck, FileCheck2, BadgeCheck, Lock } from 'lucide-react';

export const metadata = { title: 'Action Certificates — TrustPlane' };

export default function ActionCertificatesDoc() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8">
        <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
          Action Certificates
        </span>
        <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
          How verification works
        </h1>
        <p className="mt-3 text-gray-600">
          TrustPlane mints a signed, portable COSE artifact on promotion. Downstream systems can require a valid certificate before any write.
        </p>
      </header>

      <section className="rounded-xl bg-white border border-gray-200 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-orange-600" /> What’s inside
        </h2>
        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
          <li>Policy/version hashes and evaluation results</li>
          <li>Approver identities and rollout scope</li>
          <li>Budget/SLO snapshots and model/tooling metadata</li>
          <li>COSE_Sign1 signature (Ed25519)</li>
        </ul>
      </section>

      <section className="mt-6 rounded-xl bg-white border border-gray-200 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <FileCheck2 className="h-5 w-5 text-orange-600" /> Verifying a certificate (TypeScript)
        </h2>
        <pre className="mt-2 rounded-lg bg-gray-900 text-gray-100 p-4 text-sm overflow-x-auto">{`import { verify } from "@trustplane/sdk/cert";
import type { ActionCertificate } from "@trustplane/sdk/types";

const ok = await verify(certBytes, {
  requiredApprovals: ["security","finops"],
  maxCanaryPercent: 50,
});
if (!ok) throw new Error("Invalid certificate");`}</pre>
        <p className="text-sm text-gray-600">
          You can also export events via OpenTelemetry and verify hashes in your SIEM or transparency log.
        </p>
      </section>

      <section className="mt-6 rounded-xl bg-white border border-gray-200 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Lock className="h-5 w-5 text-orange-600" /> Supply‑chain options
        </h2>
        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
          <li>Optional transparency log in your account</li>
          <li>Image signing/attestation for gateways</li>
          <li>COSE + JSON schema validation</li>
        </ul>
      </section>

      <nav className="mt-8 flex items-center justify-between">
        <a href="/docs/quickstart" className="text-sm text-gray-600 hover:text-gray-900">Quickstart</a>
        <a href="/contact" className="text-sm font-medium text-gray-900 hover:underline">Talk to engineering →</a>
      </nav>
    </main>
  );
}
