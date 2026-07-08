import { siteConfig } from "@/lib/site";

export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",

    "@type": "Organization",

    name: "Ebdaa",

    url: siteConfig.url,

    logo: siteConfig.url + "/logo.svg",

    description:
      "Advertising, Branding, Digital Marketing and Web Development.",

    email: siteConfig.email,

    telephone: siteConfig.social.telephone,

    sameAs: [
      siteConfig.social.whatsapp,
      siteConfig.social.instagram,
      siteConfig.social.facebook,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}
