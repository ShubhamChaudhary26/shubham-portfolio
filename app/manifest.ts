import type { MetadataRoute } from "next";

import { AUTOMATION_BRAND, BRAND_DESCRIPTION, BRAND_LOGO_PATH } from "@/lib/automation-brand";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: AUTOMATION_BRAND.name,
    short_name: AUTOMATION_BRAND.name,
    description: BRAND_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#07080c",
    theme_color: "#07080c",
    icons: [
      {
        src: BRAND_LOGO_PATH,
        sizes: "512x512",
        type: "image/webp",
      },
    ],
  };
}
