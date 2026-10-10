import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "ar"],

  // Used when no locale matches
  defaultLocale: "ar",
  // Metadata and sitemap provide alternates on the canonical public origin.
  // Avoid a second set derived from localhost or a preview deployment's host.
  alternateLinks: false,
});
