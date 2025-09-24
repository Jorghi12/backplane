'use client';

import Link from 'next/link';
import { useEffect, useId, useState, Suspense } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import useSWR, { mutate } from 'swr';

import { Button } from '@/components/ui/button';
import {
  CircleIcon,
  Home,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut } from '@/app/(login)/actions';
import { User } from '@/lib/db/schema';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

/* ----------------------- User menu (auth-aware) ----------------------- */

function UserMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: user } = useSWR<User>('/api/user', fetcher);
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    mutate('/api/user');
    router.push('/');
  }

  // Signed-out state
  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/sign-in"
          className="text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          Sign in
        </Link>
        <Button asChild className="rounded-full">
          <Link href="/sign-up">Sign up</Link>
        </Button>
      </div>
    );
  }

  // Compute safe initials
  const initials =
    (user.name &&
      user.name
        .trim()
        .split(/\s+/)
        .map((n) => n[0]?.toUpperCase())
        .slice(0, 2)
        .join('')) ||
    (user.email ? user.email.slice(0, 2).toUpperCase() : 'U');

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Open user menu"
          className="rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
        >
          <Avatar className="size-9">
            <AvatarImage alt={user.name || user.email || 'User'} />
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col gap-1">
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/dashboard" className="flex w-full items-center">
            <Home className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <form action={handleSignOut} className="w-full">
          <button type="submit" className="flex w-full">
            <DropdownMenuItem className="w-full flex-1 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ---------------------------- Header/Nav ----------------------------- */

function NavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const active =
    pathname === href ||
    (href !== '/' && pathname.startsWith(href + '/'));

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={[
        'text-sm font-medium transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500',
        active
          ? 'text-gray-900'
          : 'text-gray-700 hover:text-gray-900',
      ].join(' ')}
    >
      {children}
    </Link>
  );
}

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navId = useId();

  // Close mobile sheet on route change for safety
  const pathname = usePathname();
  useEffect(() => setMobileOpen(false), [pathname]);

  const primaryLinks = [
    { href: '/docs/quickstart', label: 'Docs' },
    { href: '/security', label: 'Security' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:inset-x-0 focus:top-0 focus:z-50 focus:m-2 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:shadow"
      >
        Skip to content
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center">
          <CircleIcon aria-hidden className="h-6 w-6 text-orange-500" />
          <span className="ml-2 text-xl font-semibold text-gray-900">
            TrustPlane
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main">
          {primaryLinks.map((l) => (
            <NavLink key={l.href} href={l.href}>
              {l.label}
            </NavLink>
          ))}
          <span className="h-6 w-px bg-gray-200" />
          <Suspense fallback={<div className="h-9 w-24" />}>
            <UserMenu />
          </Suspense>
        </nav>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-3">
          <Suspense fallback={<div className="h-9 w-24" />}>
            <UserMenu />
          </Suspense>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls={navId}
            onClick={() => setMobileOpen((o) => !o)}
            className="inline-flex items-center justify-center rounded-md border border-gray-200 p-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        id={navId}
        className={[
          'md:hidden border-t border-gray-200 bg-white transition-[max-height] overflow-hidden',
          mobileOpen ? 'max-h-96' : 'max-h-0',
        ].join(' ')}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 grid gap-3" aria-label="Mobile">
          {primaryLinks.map((l) => (
            <NavLink
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

/* ----------------------------- Footer ------------------------------ */

function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-gray-600">
          © {new Date().getFullYear()} TrustPlane, Inc. All rights reserved.
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/security" className="text-gray-700 hover:text-gray-900">
            Security
          </Link>
          <Link href="/privacy" className="text-gray-700 hover:text-gray-900">
            Privacy
          </Link>
          <Link href="/terms" className="text-gray-700 hover:text-gray-900">
            Terms
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-gray-900">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}

/* ----------------------------- Layout ------------------------------ */

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex min-h-screen flex-col">
      <main id="main">{children}</main>
    </section>
  );
}
