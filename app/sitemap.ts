import { siteConfig } from "@/lib/site";
import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  return routing.locales.map((locale) => ({
    url: `${base}/${locale}`,
    priority: 1,
    changeFrequency: "monthly",
    // Omit lastModified rather than claim a content update on every build.
    alternates: {
      languages: { ar: `${base}/ar`, en: `${base}/en`, "x-default": `${base}/ar` },
    },
  }));
}
