import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navbar";
import { PageWrapper } from "@/components/page-wrapper";
import { Providers } from "@/app/providers";

export default function NotFound() {
  return (
    <Providers
      themeProps={{
        attribute: "class",
        defaultTheme: "dark",
        enableSystem: false,
      }}
    >
      <div className="min-h-screen bg-background">
        <Navigation />
        <PageWrapper>
          <div className="px-4 py-24 text-center">
            <h1 className="font-display text-3xl font-semibold">Page not found</h1>
            <p className="mt-3 text-foreground-500">This page could not be found.</p>
          </div>
        </PageWrapper>
        <Footer />
      </div>
    </Providers>
  );
}
