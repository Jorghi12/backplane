export const metadata = { title: 'Privacy — TrustPlane' };

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
      <p className="mt-4 text-gray-600">
        We’re committed to protecting your data. TrustPlane runs in your cloud; we don’t train on your data unless you opt in.
      </p>
      <div className="mt-6 space-y-3 text-sm text-gray-700">
        <p><strong>Data residency.</strong> You control region and retention.</p>
        <p><strong>Access.</strong> SSO/SAML/SCIM; least‑privileged scopes.</p>
        <p><strong>Telemetry.</strong> Opt‑in; OTel/SIEM exports supported.</p>
        <p className="text-xs text-gray-500">Contact <a className="underline" href="/contact">support</a> for DPAs and SCCs.</p>
      </div>
    </main>
  );
}
