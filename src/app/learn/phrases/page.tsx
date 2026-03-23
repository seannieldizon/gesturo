import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PhrasesPage() {
  return (
    <div className="mx-auto w-full max-w-content px-4 py-12 sm:px-6">
      <Link
        href="/learn"
        className="mb-6 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Learn
      </Link>
      <h1 className="mb-4 text-3xl font-bold text-slate-800">Common Signs & Phrases</h1>
      <p className="text-slate-600">
        100+ common FSL signs and phrases will be available here with visual demonstrations and text descriptions. Content coming soon.
      </p>
    </div>
  );
}
