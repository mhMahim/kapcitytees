import type { MetadataRoute } from "next";
import { getSiteOrigin } from "@/lib/site-info";

const robots = (): MetadataRoute.Robots => {
  const siteOrigin = getSiteOrigin();

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${siteOrigin}/sitemap.xml`,
    host: siteOrigin,
  };
};

export default robots;
