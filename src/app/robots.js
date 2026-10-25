
const siteUrl = "https://ds-zimmerei-holzbau.de";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },

    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
