// app/team/page.tsx
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Briefcase, Users } from 'lucide-react';

export const metadata = { title: 'Team — TrustPlane' };

type Section = { title: string; items: string[] };

const sections: Section[] = [
  {
    title: 'AI research & product',
    items: [
      'Google Brain',
      'Facebook AI Research (FAIR)',
      'RunPod'
    ],
  },
  {
    title: 'Cloud, platforms & marketplace',
    items: ['Uber'],
  },
  {
    title: 'Startups & advisory',
    items: [
      '20+ venture‑backed AI/ML startups (pre‑seed → Series A)',
      'Portfolio investors across a16z, Paradigm, Tribe Capital, Floodgate'
    ],
  },
  {
    title: 'Universities & fellowships',
    items: [
      'Cornell University (Data Science; Creative Machines Lab)',
      'On Deck (Runway Fellow)'
    ],
  },
  {
    title: 'Entrepreneurship',
    items: ['Doku Consulting', 'Doku Market', 'Intunity'],
  },
];

export default function TeamPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <header className="mb-8">
        <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
          Team
        </span>
        <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
          Companies across our team’s background
        </h1>
        <p className="mt-3 text-gray-600 max-w-2xl">
          We’re keeping it simple: no bios, no photos. Just the places our team has built, shipped, and advised—
          so you can gauge the experience behind TrustPlane.
        </p>
      </header>

      {/* Summary strip */}
      <section className="rounded-xl bg-white border border-gray-200 p-5 mb-6">
        <div className="flex items-center gap-2 text-gray-900 font-medium">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-orange-500/10 text-orange-700">
            <Users className="h-5 w-5" aria-hidden />
          </span>
          Small team, compound background
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Collective experience spans big‑tech research, cloud/infra, entrepreneurship, and venture‑backed startups.
        </p>
      </section>

      {/* Sections */}
      <div className="grid md:grid-cols-2 gap-6">
        {sections.map((s) => (
          <Card key={s.title} className="bg-white border border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-orange-500/10 text-orange-700">
                  <Building2 className="h-5 w-5" aria-hidden />
                </span>
                {s.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="mt-1 flex flex-wrap gap-2">
                {s.items.map((label) => (
                  <li key={`${s.title}-${label}`}>
                    <span className="inline-flex items-center rounded-full border border-gray-200 bg-white/60 px-3 py-1 text-xs text-gray-800">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA + disclaimer */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link
          href="/contact?topic=partnership"
          className="inline-flex items-center rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Work with our team
          <Briefcase className="ml-2 h-4 w-4" aria-hidden />
        </Link>
        <p className="text-xs text-gray-500">
          Company names are shown to reflect background only and do not imply endorsement or partnership.
        </p>
      </div>
    </main>
  );
}
