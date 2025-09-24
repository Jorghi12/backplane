'use client';

import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-gray-600">
          © {new Date().getFullYear()} TrustPlane, Inc. All rights reserved.
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/security" className="text-gray-700 hover:text-gray-900">Security</Link>
          <Link href="/privacy"  className="text-gray-700 hover:text-gray-900">Privacy</Link>
          <Link href="/terms"    className="text-gray-700 hover:text-gray-900">Terms</Link>
          <Link href="/contact"  className="text-gray-700 hover:text-gray-900">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
