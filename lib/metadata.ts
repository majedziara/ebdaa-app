import { Metadata } from "next";
import { siteConfig } from "./site";

const SITE_URL = siteConfig.url;

export function getMetadata(locale: string): Metadata {
  const isArabic = locale === "ar";

  const title = isArabic
    ? "إبداع | الدعاية والإعلان والتسويق الرقمي في غزة"
    : "Ebdaa | Advertising & Digital Marketing in Gaza";

  const description = isArabic
    ? "إبداع في غزة، فلسطين: خبرة منذ 2003 في الدعاية والإعلان، تصميم الهوية البصرية، التسويق الرقمي، إدارة المحتوى وتطوير المواقع. تواصل معنا لبناء حضور علامتك."
    : "Ebdaa in Gaza, Palestine: advertising, branding, digital marketing, content creation and web development since 2003. Build your brand with our creative team.";

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
          "إدارة مواقع التواصل الاجتماعي",
          "شركة دعاية وإعلان غزة",
          "فلسطين",
        ]
      : [
          "Ebdaa",
          "Advertising",
          "Branding",
          "Billboards",
          "Graphic Design",
          "Web Development",
          "Digital Marketing",
          "Social Media Management",
          "Advertising Agency Gaza",
          "Palestine",
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
    manifest: "/manifest.webmanifest",
    verification: { google: siteConfig.googleVerification },

    alternates: {
      canonical: locale === "ar" ? "/ar" : "/en",

      languages: {
        ar: `${SITE_URL}/ar`,
        en: `${SITE_URL}/en`,
        "x-default": `${SITE_URL}/ar`,
      },
    },

    openGraph: {
      title,
      description,
      siteName: "Ebdaa",

      url: `${SITE_URL}/${locale}`,

      locale: isArabic ? "ar_PS" : "en_US",
      alternateLocale: isArabic ? ["en_US"] : ["ar_PS"],

      type: "website",

      images: [
        {
          url: `/og-image-${locale}.png`,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/png",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title,

      description,

      images: [{ url: `/og-image-${locale}.png`, alt: title }],
    },

    icons: {
      icon: "/favicon.ico",

      shortcut: "/favicon.ico",

      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
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
