import type { MetadataRoute } from "next";
import { getSiteOrigin, getApiBase } from "@/lib/site-info";

const staticRoutes: Array<{
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
}> = [
  { path: "", changeFrequency: "daily", priority: 1 },
  { path: "/about-us", changeFrequency: "monthly", priority: 0.8 },
  { path: "/for-barbers", changeFrequency: "weekly", priority: 0.8 },
  { path: "/for-clients", changeFrequency: "weekly", priority: 0.8 },
  { path: "/contact-us", changeFrequency: "monthly", priority: 0.7 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
];

async function getProducts() {
  const apiBase = getApiBase();
  try {
    const response = await fetch(`${apiBase}products?size=100`, {
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 3600 },
    });
    const json = await response.json();
    return json?.data?.data?.data || [];
  } catch (error) {
    console.error("Sitemap product fetch error:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteOrigin = getSiteOrigin();
  const lastModified = new Date();

  // Fetch dynamic products
  const products = await getProducts();
  const productEntries = products.map((product: any) => ({
    url: `${siteOrigin}/products/${product.id}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Build static entries
  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteOrigin}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  return [...staticEntries, ...productEntries];
}
