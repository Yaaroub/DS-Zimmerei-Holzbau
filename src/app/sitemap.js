export default function sitemap() {
    const baseUrl = "https://ds-zimmerei-holzbau.de";
    const now = new Date();
  
    return [
      { url: baseUrl, lastModified: now },
      { url: `${baseUrl}/impressum`, lastModified: now },
      { url: `${baseUrl}/datenschutz`, lastModified: now },
    ];
  }
  