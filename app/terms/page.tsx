export const metadata = { title: 'Terms — TrustPlane' };

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
      <p className="mt-4 text-gray-600">These terms govern your use of TrustPlane.</p>
      <ul className="mt-6 list-disc pl-5 text-sm text-gray-700 space-y-2">
        <li>Use in accordance with applicable laws and your internal policies.</li>
        <li>No transfer of customer data outside your cloud unless explicitly enabled.</li>
        <li>SLA and support terms are defined per plan or enterprise agreement.</li>
      </ul>
    </main>
  );
}
