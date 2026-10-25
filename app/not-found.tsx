import { BrandFrame } from "@/components/ai-automation/shell";

export default function NotFound() {
  return (
    <BrandFrame>
      <div className="px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-semibold">Page not found</h1>
        <p className="mt-3 text-foreground-500">This page could not be found.</p>
      </div>
    </BrandFrame>
  );
}
