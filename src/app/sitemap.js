
import { projects, services, siteUrl } from "@/lib/siteContent";
import { guides } from "@/lib/guides";

const staticRoutes = [
  "/",
  "/leistungen",
  "/projekte",
  "/ueber-uns",
  "/region",
  "/ratgeber",
  "/kontakt",
  "/impressum",
  "/datenschutz",
];

export default function sitemap() {
  const routes = [...staticRoutes, ...services.map(({ slug }) => `/leistungen/${slug}`), ...projects.map(({ slug }) => `/projekte/${slug}`), ...guides.map(({ slug }) => `/ratgeber/${slug}`)];
  return routes.map((path) => ({
    url: new URL(path, siteUrl).toString(),
    changeFrequency: path === "/" ? "monthly" : "yearly",
    priority: path === "/" ? 1 : path.startsWith("/projekte/") || path.startsWith("/leistungen/") ? 0.7 : 0.8,
  }));
}
