// Canonical URLs must always point to the public site, including local builds.
const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;
const siteUrl = new URL(configuredUrl || "https://ebdaa-one.vercel.app");
if (!['https:', 'http:'].includes(siteUrl.protocol)) {
  throw new Error("NEXT_PUBLIC_SITE_URL must be an absolute HTTP(S) URL");
}

export const siteConfig = {
  name: "Ebdaa",
  url: siteUrl.origin,
  googleVerification: "PNPw-FFy-OJowtOOJyXNngOL1AWrfvNVEtd_GczupYY",
  googleAnalyticsId: "G-XYQLS2TJ5M",
  email: "info@ebdaa.ps",

  social: {
    facebook: "https://www.facebook.com/ebda4Adv/",
    instagram: "https://www.instagram.com/ebda4adv/",
    whatsapp: "https://wa.me/972593199998",
    telephone: "+972593199998",
  },
};
