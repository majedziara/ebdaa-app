import { siteConfig } from "@/lib/site";
import { getMetadata } from "@/lib/metadata";

export default function StructuredData({ locale }: { locale: string }) {
  const metadata = getMetadata(locale);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: "Ebdaa",
        alternateName: "إبداع",
        url: siteConfig.url,
        logo: `${siteConfig.url}/icon-512.png`,
        description: metadata.description,
        foundingDate: "2003",
        email: siteConfig.email,
        telephone: siteConfig.social.telephone,
        address: { "@type": "PostalAddress", addressLocality: "Gaza", addressCountry: "PS" },
        sameAs: [siteConfig.social.instagram, siteConfig.social.facebook],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: "Ebdaa | إبداع",
        url: siteConfig.url,
        inLanguage: ["ar", "en"],
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${siteConfig.url}/${locale}#webpage`,
        url: `${siteConfig.url}/${locale}`,
        name: metadata.title,
        description: metadata.description,
        inLanguage: locale,
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        about: { "@id": `${siteConfig.url}/#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
