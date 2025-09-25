export const metadata = { title: 'Unit economics — TrustPlane' };

export default function UnitEconomicsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Unit economics</h1>
      <p className="mt-4 text-gray-600">
        Compute stays in your VPC; TrustPlane does not resell inference. Revenue scales with outcomes via a meter of
        <span className="font-semibold"> approved actions</span> (certificate‑verified writes) and optional % of model spend for routed inference.
      </p>

      <div className="mt-6 grid gap-4">
        <section className="rounded-xl bg-white border border-gray-200 p-6 text-sm text-gray-700">
          <h2 className="text-base font-semibold text-gray-900">Definitions</h2>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li><span className="font-medium">Approved action</span>: a write that minted an Action Certificate and passed policy gates.</li>
            <li><span className="font-medium">$ / approved action</span>: customer price for each certified write (sold in 10k blocks).</li>
            <li><span className="font-medium">COGS</span>: software + support; no model compute resale.</li>
          </ul>
        </section>

        <section className="rounded-xl bg-white border border-gray-200 p-6 text-sm text-gray-700">
          <h2 className="text-base font-semibold text-gray-900">Illustrative math</h2>
          <pre className="mt-2 bg-gray-50 rounded p-4 overflow-x-auto">{`Example team
- Approved actions / mo: 1,000,000
- Price: $0.12 per action  (sold as 10k blocks)
- Revenue: $120,000 / mo
- Variable costs: $18,000 / mo (support, infra mgmt, on-call)
- Gross margin: ~85% (software model; no compute resale)`}</pre>
          <p className="mt-3 text-xs text-gray-500">Numbers are illustrative; actual pricing and margins vary by scale & contract.</p>
        </section>

        <section className="rounded-xl bg-white border border-gray-200 p-6 text-sm text-gray-700">
          <h2 className="text-base font-semibold text-gray-900">KPIs to monitor</h2>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>Approved actions / day</li>
            <li>% of total writes governed</li>
            <li>$ per approved action (by team & workflow)</li>
            <li>Budget adherence (month‑to‑date)</li>
            <li>SLO attainment (p95 latency, availability)</li>
            <li>Audit coverage (per‑action lineage exported)</li>
          </ul>
        </section>
      </div>

      <nav className="mt-8 flex items-center gap-4">
        <a className="text-sm text-gray-700 hover:underline" href="/pricing">Back to pricing</a>
      </nav>
    </main>
  );
}
