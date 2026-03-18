"use client";

import useFetchData from "@/hooks/useFetchData";
import ProductDetailPage from "@/screens/public/ProductDetailPage";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const page = () => {
  const params = useParams();
  const slug = params?.slug as string;

  const [productDetailsData, setProductDetailsData] = useState<any>(null);
  
  const { data: productDetailsApiData, isPending: productDetailsApiPending } = useFetchData(
    `/products/${slug}/details`
  );

  useEffect(() => {
      setProductDetailsData(productDetailsApiData?.data?.data?.product);
  }, [productDetailsApiData]);

  return (
    <ProductDetailPage 
      product={productDetailsData} 
      isPending={productDetailsApiPending}
    />
  );
};

export default page;
