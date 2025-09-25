import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function ErrorPage() {
  return (
    <main className="flex items-center justify-center min-h-[100dvh] bg-gradient-to-b from-gray-50 to-white px-4">
      <div className="max-w-lg w-full text-center">
        <div className="flex justify-center">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
            <AlertCircle className="h-7 w-7" aria-hidden />
          </span>
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Something went wrong</h1>
        <p className="mt-3 text-gray-600">We couldn’t complete your request. Please try again or contact us.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/pricing" className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Back to pricing</Link>
          <Link href="/contact" className="rounded-full bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-500">Contact support</Link>
        </div>
      </div>
    </main>
  );
}
