export const metadata = { title: 'Case study — AP / invoice posting' };

export default function CaseStudyAP() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8">
        <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
          Lighthouse workflow
        </span>
        <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">
          AP / invoice matching & posting with certificate‑verified writes
        </h1>
        <p className="mt-3 text-gray-600">
          Governed canary in days; certificate‑verified posting with approvals and <span className="font-medium">rollback MTTR &lt; 5 minutes</span>.
        </p>
      </header>

      <ol className="space-y-6 text-sm text-gray-700">
        <li><strong>Read‑first:</strong> dry‑run against your ERP and data warehouse with deterministic audit.</li>
        <li><strong>Promotion gates:</strong> evaluation contracts (golden set), budget &amp; SLO guards.</li>
        <li><strong>Writes with proof:</strong> Action Certificate minted; downstream requires valid cert before side‑effects.</li>
      </ol>

      <nav className="mt-10">
        <a className="text-sm text-gray-700 hover:underline" href="/contact?topic=demo&usecase=ap-invoice">Request a demo →</a>
      </nav>
    </main>
  );
}
