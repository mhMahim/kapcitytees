import type { MetadataRoute } from "next";
import { getSiteOrigin } from "@/lib/site-info";

const staticRoutes: Array<{
  path: string;
  changeFrequency: "daily" | "weekly";
  priority: number;
}> = [
  { path: "", changeFrequency: "daily", priority: 1 },
  { path: "/about-us", changeFrequency: "weekly", priority: 0.8 },
  { path: "/for-barbers", changeFrequency: "weekly", priority: 0.8 },
  { path: "/for-clients", changeFrequency: "weekly", priority: 0.8 },
  { path: "/products", changeFrequency: "weekly", priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/contact-us", changeFrequency: "weekly", priority: 0.7 },
  { path: "/faq", changeFrequency: "weekly", priority: 0.7 },
  { path: "/cart", changeFrequency: "daily", priority: 0.6 },
];

const sitemap = (): MetadataRoute.Sitemap => {
  const siteOrigin = getSiteOrigin();
  const lastModified = new Date();

  return staticRoutes.map((route) => ({
    url: `${siteOrigin}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
};

export default sitemap;