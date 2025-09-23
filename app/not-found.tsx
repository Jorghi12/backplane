import Link from 'next/link';
import { AlertCircle, Home, BookOpen, LifeBuoy } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex items-center justify-center min-h-[100dvh] bg-gradient-to-b from-gray-50 to-white px-4">
      <div className="max-w-lg w-full text-center">
        <div className="flex justify-center">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-600">
            <AlertCircle className="h-7 w-7" aria-hidden />
          </span>
        </div>

        <h1 className="mt-6 text-4xl font-bold text-gray-900 tracking-tight">
          Page not found
        </h1>

        <p className="mt-3 text-base text-gray-600">
          The page you requested doesn’t exist, may have moved, or you might not have access.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            <Home className="mr-2 h-4 w-4" aria-hidden />
            Back to home
          </Link>

          <Link
            href="/docs/quickstart"
            className="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            <BookOpen className="mr-2 h-4 w-4" aria-hidden />
            View docs
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            <LifeBuoy className="mr-2 h-4 w-4" aria-hidden />
            Contact us
          </Link>
        </div>
      </div>
    </main>
  );
}
