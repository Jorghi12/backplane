// app/pricing/submit-button.tsx
'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

type Variant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link';

export function SubmitButton({
  label = 'Get Started',
  pendingLabel = 'Loading…',
  variant = 'outline',
  className = 'w-full rounded-full'
}: {
  label?: string;
  pendingLabel?: string;
  variant?: Variant;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      variant={variant}
      className={className}
      aria-busy={pending}
      aria-live="polite"
    >
      {pending ? (
        <>
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
          {pendingLabel}
        </>
      ) : (
        <>
          {label}
          <ArrowRight className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  );
}
