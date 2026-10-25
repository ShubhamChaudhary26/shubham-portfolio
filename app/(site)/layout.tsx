import { Providers } from "@/app/providers";
import { BrandFrame } from "@/components/ai-automation/shell";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers
      themeProps={{
        attribute: "class",
        defaultTheme: "dark",
        enableSystem: false,
      }}
    >
      <BrandFrame>{children}</BrandFrame>
    </Providers>
  );
}
