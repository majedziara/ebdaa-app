import { Metadata } from "next";
import { siteConfig } from "./site";

const SITE_URL = siteConfig.url;

export function getMetadata(locale: string): Metadata {
  const isArabic = locale === "ar";

  const title = isArabic
    ? "إبداع | الدعاية والإعلان والحلول الرقمية"
    : "Ebdaa | Advertising, Branding & Digital Solutions";

  const description = isArabic
    ? "إبداع شركة متخصصة في الدعاية والإعلان والهوية البصرية وإدارة المحتوى والتسويق الرقمي وتطوير المواقع الإلكترونية."
    : "Ebdaa is a creative agency specializing in advertising, branding, digital marketing, content creation, and web development since 2003.";

  return {
    metadataBase: new URL(SITE_URL),

    title,

    description,

    keywords: isArabic
      ? [
          "إبداع",
          "الدعاية والإعلان",
          "الهوية البصرية",
          "البيلبورد",
          "تصميم",
          "تطوير مواقع",
          "التسويق الرقمي",
        ]
      : [
          "Ebdaa",
          "Advertising",
          "Branding",
          "Billboards",
          "Graphic Design",
          "Web Development",
          "Digital Marketing",
        ],

    authors: [
      {
        name: "Ebdaa",
      },
    ],

    creator: "Ebdaa",

    publisher: "Ebdaa",

    applicationName: "Ebdaa",

    category: "Business",

    alternates: {
      canonical: locale === "ar" ? "/ar" : "/en",

      languages: {
        ar: `${SITE_URL}/ar`,
        en: `${SITE_URL}/en`,
      },
    },

    openGraph: {
      title,
      description,
      siteName: "Ebdaa",

      url: `${SITE_URL}/${locale}`,

      locale: isArabic ? "ar_PS" : "en_US",

      type: "website",

      images: [
        {
          url: "/logo.svg",
          width: 1200,
          height: 630,
          alt: "Ebdaa",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title,

      description,

      images: ["/logo.svg"],
    },

    icons: {
      icon: "/favicon.ico",

      shortcut: "/favicon.ico",

      apple: "/logo.svg",
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
