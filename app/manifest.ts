import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ebdaa",

    short_name: "Ebdaa",

    description:
      "Advertising, Branding, Digital Marketing and Web Development.",

    start_url: "/ar",

    display: "standalone",

    background_color: "#F8F5EF",

    theme_color: "#BE3A3F",

    lang: "ar",
    dir: "rtl",

    icons: [
      {
        src: "/icon-192.png",

        sizes: "192x192",

        type: "image/png",
      },

      {
        src: "/icon-512.png",

        sizes: "512x512",

        type: "image/png",
      },
    ],
  };
}
