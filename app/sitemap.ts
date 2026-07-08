import { siteConfig } from "@/lib/site";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  return [
    {
      url: `${base}/ar`,
      priority: 1,
      changeFrequency: "weekly",
      lastModified: "new Date()",
    },

    {
      url: `${base}/en`,
      priority: 1,
      changeFrequency: "weekly",
      lastModified: "new Date()",
    },
  ];
}
