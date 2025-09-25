#!/usr/bin/env bash
# macOS-safe patcher for TrustPlane site
set -Eeuo pipefail

echo ""
echo "▶ TrustPlane patches — usage‑metered pricing, Unit Economics page, KPI dashboard"
echo "--------------------------------------------------------------------------"

# --- Preflight ---
if [[ ! -f package.json ]] || [[ ! -d app ]]; then
  echo "Error: run from your project root (must contain package.json and /app)."
  exit 1
fi

if ! command -v node >/dev/null 2>&1; then
  echo "Error: Node.js is required (not found in PATH)."
  exit 1
fi

# --- Helpers ---
write_file() {
  local path="$1"
  mkdir -p "$(dirname "$path")"
  cat > "$path"
}

# --- Node patcher (robust, idempotent) ---
PATCH_JS="$(mktemp -t trustplane_patcher.XXXXXX.js)"
cat > "$PATCH_JS" <<'JS'
/* eslint-disable */
const fs = require('fs');
const path = require('path');

function log(x){ console.log(x); }
function ex(p){ return fs.existsSync(p); }
function r(p){ return fs.readFileSync(p,'utf8'); }
function w(p,s){ fs.writeFileSync(p,s); }

function tryEdit(p, edit, label){
  if(!ex(p)){ log(`- skip (missing): ${p}`); return; }
  const before = r(p);
  const after  = edit(before);
  if(after !== before){ w(p, after); log(`✓ ${label} (${p})`); }
  else { log(`• already OK: ${label} (${p})`); }
}

/* ------------------------------------------------------------------ *
 * 1) PRICING PAGE — make usage the first‑class meter across all tiers
 * ------------------------------------------------------------------ */
const PRICING = 'app/(dashboard)/pricing/page.tsx';

tryEdit(PRICING, (s) => {
  let out = s;

  // A) Kill seat wording in interval labels
  out = out.replace(/intervalLabel="per user \/ month"/g,
                    'intervalLabel="per 10k approved actions (metered)"');

  // B) Adjust the "annual price" helper text to remove "/ user / month"
  out = out.replace(/or \{formatUsd\(yearly \/ 12\)\} \/ user \/ month/g,
                    'or {formatUsd(yearly / 12)} / 10k approved actions');

  // C) Replace plan features: usage metered + unlimited governance users
  // Base
  out = out.replace(
    /name="Base"[\s\S]*?features=\[\s*([\s\S]*?)\]\s*\)/m,
    (m) => m
      .replace(/'Unlimited usage'/g, `'25k included approved actions / mo'`)
      .replace(/'Unlimited workspace members'/g, `'Unlimited governance users'`)
  );

  // Plus — prepend explicit included actions, keep other bullets
  out = out.replace(
    /name="Plus"[\s\S]*?features=\[\s*([\s\S]*?)\]\s*\)/m,
    (m) => m
      .replace(/'Everything in Base',/g, `'Everything in Base',\n            '100k included approved actions / mo',`)
      .replace(/'Unlimited usage'/g, `'Usage metered by approved actions'`)
  );

  // D) Comparison table wording
  out = out.replace(/>Unlimited usage<\/span>/g, '>Usage metered by approved actions</span>');
  out = out.replace(/>Unlimited workspace members<\/span>/g, '>Unlimited governance users</span>');

  // E) FAQ: “How does billing work?” → usage‑first explanation
  out = out.replace(
    /Pricing is per user,[\s\S]*?control plane\./,
    `All plans meter usage by approved actions (i.e., Action Certificates minted). You can purchase prepaid blocks in 10k‑action increments with volume tiers; viewers & approvers are unlimited. Enterprise can alternatively peg usage to a percent of model spend when inference is routed via the control plane.`
  );

  // F) Add an explanatory “Usage metering” section just before FAQ
  if(!out.includes('function UsageMeter(')) {
    out = out.replace(
      /{\s*\/\*\s*FAQ\s*\*\/\s*}\s*<FAQ \/>/,
      `{/* Metering */}\n      <UsageMeter />\n\n      {/* FAQ */}\n      <FAQ />`
    );
    out += `

function UsageMeter() {
  return (
    <section className="mt-16">
      <h3 className="text-lg font-semibold text-gray-900">Usage metering</h3>
      <div className="mt-3 rounded-xl border border-gray-200 bg-white/60 p-6">
        <p className="text-sm text-gray-700">
          Pricing aligns with outcomes. Usage is measured as <span className="font-medium">approved actions</span>—each certificate‑verified write routed via the control plane. Buy prepaid blocks (10k actions) with volume discounts; no per‑seat overages. Viewers & approvers are unlimited.
        </p>
      </div>
    </section>
  );
}
`;
  }

  // G) Enterprise card: call out %‑of‑model‑spend option
  if(!out.includes('% of model spend')) {
    out = out.replace(
      /(\[\s*\n\s*'In‑VPC deployment \(AWS\/GCP\/Azure\)',)/,
      `$1\n          'Optional % of model spend (routed inference)',`
    );
  }

  return out;
}, 'pricing → usage‑metered across tiers');



/* ------------------------------------------------------------- *
 * 2) HOMEPAGE — dashboard the investor KPIs (top‑line metrics)
 * ------------------------------------------------------------- */
const HOME = 'app/(dashboard)/page.tsx';

tryEdit(HOME, (s) => {
  // Insert KPI section once, before OUTCOMES
  if (s.includes('/* INVESTOR KPIs */')) return s;

  const kpiSection = `
      {/* INVESTOR KPIs */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-semibold text-gray-900">KPIs that matter</h3>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Stat icon={<CheckCircle2 className="h-5 w-5" aria-hidden />} value="1,240/day" label="Approved actions" />
            <Stat icon={<Shield className="h-5 w-5" aria-hidden />} value="82%" label="% of writes governed" />
            <Stat icon={<DollarSign className="h-5 w-5" aria-hidden />} value="$0.12" label="$ per approved action" />
            <Stat icon={<Gauge className="h-5 w-5" aria-hidden />} value="99.9%" label="SLO attainment" />
            <Stat icon={<LineChart className="h-5 w-5" aria-hidden />} value="On budget" label="Budget adherence" />
            <Stat icon={<Server className="h-5 w-5" aria-hidden />} value="100%" label="Audit coverage" />
          </div>
        </div>
      </section>
`;

  // Anchor: just before the OUTCOMES block
  return s.replace(/\{\s*\/\*\s*OUTCOMES\s*\*\/\s*\}/, `{/* INVESTOR KPIs */}`)
          .replace(/(\{\/\* INVESTOR KPIs \*\/\})/, `$1\n${kpiSection}`);
}, 'home → add KPI dashboard section');



/* ------------------------------------------------------- *
 * 3) NAV — link to the Unit Economics explainer
 * ------------------------------------------------------- */
const LAYOUT = 'app/(dashboard)/layout.tsx';

tryEdit(LAYOUT, (s) => {
  if (s.includes(`{ href: '/pricing/unit-economics', label: 'Unit economics' }`)) {
    return s;
  }
  return s.replace(
    /\[\s*\{\s*href:\s*'\/docs\/quickstart'[\s\S]*?\}\s*\];/,
    (m) => m.replace(
      /\{\s*href:\s*'\/pricing',\s*label:\s*'Pricing'\s*\},?/,
      `{ href: '/pricing', label: 'Pricing' },
    { href: '/pricing/unit-economics', label: 'Unit economics' },`
    )
  );
}, 'nav → add /pricing/unit-economics');



/* ------------------------------------------------------- *
 * 4) Create Unit Economics one‑pager
 * ------------------------------------------------------- */
const UNIT = 'app/(dashboard)/pricing/unit-economics/page.tsx';
if (!ex(UNIT)) {
  const unit = `export const metadata = { title: 'Unit economics — TrustPlane' };

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
          <pre className="mt-2 bg-gray-50 rounded p-4 overflow-x-auto">{\`Example team
- Approved actions / mo: 1,000,000
- Price: $0.12 per action  (sold as 10k blocks)
- Revenue: $120,000 / mo
- Variable costs: $18,000 / mo (support, infra mgmt, on-call)
- Gross margin: ~85% (software model; no compute resale)\`}</pre>
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
`;
  fs.mkdirSync(path.dirname(UNIT), { recursive: true });
  fs.writeFileSync(UNIT, unit);
  log(`✓ created Unit Economics page (${UNIT})`);
} else {
  log('• Unit Economics page already exists');
}

/* ------------------------------------------------------- */
JS

echo "• Applying code edits…"
node "$PATCH_JS"
rm -f "$PATCH_JS"

echo ""
echo "✅ Done."
echo "   - Pricing now usage‑metered (per 10k approved actions), includes blocks in Base/Plus"
echo "   - Enterprise card mentions optional %‑of‑model‑spend"
echo "   - Added Usage Meter explainer + updated FAQ & comparison"
echo "   - New /pricing/unit-economics one‑pager and nav link"
echo "   - Homepage shows investor KPI dashboard"
echo ""
echo "Next steps:"
echo "  • (Optional) point Stripe products to usage SKUs or keep as marketing copy until billing is ready."
echo "  • Review copy and included action block sizes (25k/100k are illustrative)."
