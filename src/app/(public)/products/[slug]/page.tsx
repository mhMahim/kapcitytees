import { Metadata, ResolvingMetadata } from "next";
import { getApiBase } from "@/lib/site-info";
import ProductDetailsPageContent from "./ProductDetailsPageContent";
import { Suspense } from "react";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug;
  const apiBase = getApiBase();

  try {
    const response = await fetch(`${apiBase}products/${slug}`, {
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 3600 },
    });
    const json = await response.json();
    const product = json?.data?.data?.product;

    if (!product) return { title: "Product Not Found" };

    const previousImages = (await parent).openGraph?.images || [];

    return {
      title: product.title,
      description: product.sort_description || `Buy ${product.title} at Barber Certified.`,
      openGraph: {
        title: product.title,
        description: product.sort_description,
        url: `https://barbercertified.io/products/${slug}`,
        images: product.thumbnail_url 
          ? [product.thumbnail_url, ...previousImages] 
          : previousImages,
      },
    };
  } catch (error) {
    console.error("Metadata generation error:", error);
    return { title: "Product" };
  }
}

export default async function page({ params, searchParams }: Props) {
  return (
    <Suspense>
      <ProductDetailsPageContent />
    </Suspense>
  );
}
