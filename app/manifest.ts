import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ebdaa",

    short_name: "Ebdaa",

    description:
      "Advertising, Branding, Digital Marketing and Web Development.",

    start_url: "/",

    display: "standalone",

    background_color: "#F8F5EF",

    theme_color: "#BE3A3F",

    lang: "en",

    icons: [
      {
        src: "/logo.svg",

        sizes: "192x192",

        type: "image/svg+xml",
      },

      {
        src: "/logo.svg",

        sizes: "512x512",

        type: "image/svg+xml",
      },
    ],
  };
}
