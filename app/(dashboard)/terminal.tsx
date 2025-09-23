'use client';

import { useEffect, useMemo, useState } from 'react';
import { Copy, Check, RotateCcw } from 'lucide-react';

type Step = { text: string; comment?: string };

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(m.matches);
    const onChange = () => setReduced(m.matches);
    m.addEventListener?.('change', onChange);
    return () => m.removeEventListener?.('change', onChange);
  }, []);
  return reduced;
}

export function Terminal() {
  const reduced = usePrefersReducedMotion();
  const [idx, setIdx] = useState(0);
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Keep the steps product‑aligned but illustrative
  const steps: Step[] = useMemo(
    () => [
      { text: 'pnpm add @trustplane/sdk' },
      { text: 'npx trustplane init --policy prod-us-1', comment: '# create policy scaffold' },
      { text: 'npx trustplane canary ap-matching --dataset golden:v1 --dry-run', comment: '# read-first' },
      { text: 'npx trustplane promote ap-matching --percent 10 --approvals security,finops' },
      { text: 'npx trustplane cert ap-matching --show', comment: '# Action Certificate' },
      { text: 'pnpm dev', comment: '🎉' },
    ],
    []
  );

  // Progressive reveal; stop when finished, respect reduced motion
  useEffect(() => {
    if (reduced) {
      setIdx(steps.length - 1);
      return;
    }
    if (idx >= steps.length - 1) return;
    const t = setTimeout(() => setIdx((n) => Math.min(n + 1, steps.length - 1)), 700);
    return () => clearTimeout(t);
  }, [idx, steps.length, reduced]);

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(steps.map(s => s.text).join('\n'));
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 1500);
    } catch {
      /* noop */
    }
  };

  const copyOne = async (i: number) => {
    try {
      await navigator.clipboard.writeText(steps[i].text);
      setCopiedIndex(i);
      setTimeout(() => setCopiedIndex(null), 1200);
    } catch {
      /* noop */
    }
  };

  const replay = () => {
    setIdx(0);
    setCopiedAll(false);
    setCopiedIndex(null);
  };

  return (
    <div className="w-full rounded-lg shadow-lg overflow-hidden bg-gray-900 text-white font-mono text-sm relative">
      {/* Title bar */}
      <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full bg-red-500" />
          <span className="inline-block w-3 h-3 rounded-full bg-yellow-500" />
          <span className="inline-block w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={replay}
            className="inline-flex items-center gap-1 text-gray-300 hover:text-white"
            aria-label="Replay commands"
            title="Replay"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={copyAll}
            className="inline-flex items-center gap-1 text-gray-300 hover:text-white"
            aria-label="Copy all commands"
            title="Copy all"
          >
            {copiedAll ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="space-y-2" role="status" aria-live="polite">
          {steps.map((step, i) => {
            const visible = i <= idx;
            return (
              <div
                key={`${i}-${step.text}`}
                className={`group transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
              >
                <div className="flex items-start gap-2">
                  <span className="text-emerald-400 select-none">$</span>
                  <pre className="whitespace-pre-wrap text-white/95">
                    {step.text}{step.comment ? `  ${step.comment}` : ''}
                  </pre>
                  <button
                    onClick={() => copyOne(i)}
                    className="ml-auto opacity-0 group-hover:opacity-100 transition text-gray-400 hover:text-white"
                    aria-label={`Copy command ${i + 1}`}
                    title="Copy"
                  >
                    {copiedIndex === i ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
