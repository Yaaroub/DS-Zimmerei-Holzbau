export default function sitemap() {
    const baseUrl = "https://ds-zimmerei-holzbau.de";
  
    return [
      { url: baseUrl, lastModified: new Date() },
      { url: `${baseUrl}/#leistungen`, lastModified: new Date() },
      { url: `${baseUrl}/#ueber`, lastModified: new Date() },
      { url: `${baseUrl}/#warum-wir`, lastModified: new Date() },
      { url: `${baseUrl}/#projekte`, lastModified: new Date() },
      { url: `${baseUrl}/#kontakt`, lastModified: new Date() },
      { url: `${baseUrl}/impressum`, lastModified: new Date() },
      { url: `${baseUrl}/datenschutz`, lastModified: new Date() },
    ];
  }
  