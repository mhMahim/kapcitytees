"use client";

import useFetchData from "@/hooks/useFetchData";
import ProductDetailPage from "@/screens/public/ProductDetailPage";
import axios from "axios";
import { useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";

const REFERRAL_SESSION_KEY = "referral-click-cache";

const Page = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params?.slug as string;
  const refCode = searchParams.get("ref");

  const { data: productDetailsApiData, isPending: productDetailsApiPending } =
    useFetchData(`/products/${slug}`);

  const productDetailsData = productDetailsApiData?.data?.data?.product ?? null;

  useEffect(() => {
    if (!slug || !refCode) return;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) return;

    const cachedReferral = sessionStorage.getItem(REFERRAL_SESSION_KEY);

    if (cachedReferral) {
      try {
        const parsedReferral = JSON.parse(cachedReferral) as {
          productId?: string;
          ref?: string;
        };

        if (
          parsedReferral.productId === slug &&
          parsedReferral.ref === refCode
        ) {
          return;
        }
      } catch {
        sessionStorage.removeItem(REFERRAL_SESSION_KEY);
      }
    }

    sessionStorage.setItem(
      REFERRAL_SESSION_KEY,
      JSON.stringify({ productId: slug, ref: refCode }),
    );

    void axios.post(`${baseUrl}/referral-click`, {
      product_id: slug,
      ref: refCode,
    });
  }, [slug, refCode]);

  return (
    <ProductDetailPage
      product={productDetailsData}
      isPending={productDetailsApiPending}
    />
  );
};

export default Page;
