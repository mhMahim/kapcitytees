"use client";

import { useMemo, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import Container from "@/components/shared/Container";
import CartItem, { CartItemData } from "@/components/cart/CartItem";
import BillingFormCard from "@/components/cart/BillingFormCard";
import { Skeleton } from "@/components/ui/skeleton";
import useFetchData from "@/hooks/useFetchData";

// Placeholder product image
const PRODUCT_IMG = "https://i.ibb.co.com/27rvh0W6/Rectangle-55.png";

interface ApiCartItem {
  id: number;
  product: {
    product_id: number;
    title: string;
    thumbnail?: string;
  };
  quantity: number;
  item_total: number;
}

interface ApiCartData {
  items: ApiCartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

interface ApiCartResponse {
  status: boolean;
  data?: {
    data?: ApiCartData;
  };
}

const CartPage = () => {
  const [isUpdatingItem, setIsUpdatingItem] = useState<Record<string, boolean>>(
    {},
  );
  const { data, isPending, isError, error, refetch } = useFetchData("/cart", true);

  const cartData = useMemo(
    () => (data as ApiCartResponse | undefined)?.data?.data,
    [data],
  );

  const apiItems = useMemo<CartItemData[]>(() => {
    if (!cartData?.items) {
      return [];
    }

    return cartData.items.map((item) => {
      const unitPrice = item.quantity > 0 ? item.item_total / item.quantity : 0;

      return {
        id: item.id,
        name: item.product.title,
        category: "Product",
        price: unitPrice,
        quantity: item.quantity,
        image: item.product.thumbnail || PRODUCT_IMG,
      };
    });
  }, [cartData]);

  const items = useMemo(() => apiItems, [apiItems]);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const tax = cartData?.tax ?? 0;
  const shipping = cartData?.shipping ?? 0;

  const updateCartQuantity = async (
    id: string | number,
    action: "increment" | "decrement",
  ) => {
    const current = items.find((item) => item.id === id);

    if (!current) {
      return;
    }

    if (action === "decrement" && current.quantity <= 1) {
      return;
    }

    const itemKey = String(id);
    if (isUpdatingItem[itemKey]) {
      return;
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const token = localStorage.getItem("token");

    if (!baseUrl || !token) {
      toast.error("Unable to update cart right now. Please login again.");
      return;
    }

    setIsUpdatingItem((prev) => ({ ...prev, [itemKey]: true }));

    try {
      await axios.post(
        `${baseUrl}/cart/${id}`,
        { action },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await refetch();
    } catch (requestError) {
      const fallbackError = "Failed to update cart item. Please try again.";
      const message =
        axios.isAxiosError(requestError) &&
        typeof requestError.response?.data?.message === "string"
          ? requestError.response.data.message
          : fallbackError;

      toast.error(message);
    } finally {
      setIsUpdatingItem((prev) => ({ ...prev, [itemKey]: false }));
    }
  };

  const handleIncrement = async (id: string | number) => {
    await updateCartQuantity(id, "increment");
  };

  const handleDecrement = async (id: string | number) => {
    await updateCartQuantity(id, "decrement");
  };

  const handleRemove = async (id: string | number) => {
    const itemKey = String(id);
    if (isUpdatingItem[itemKey]) {
      return;
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const token = localStorage.getItem("token");

    if (!baseUrl || !token) {
      toast.error("Unable to update cart right now. Please login again.");
      return;
    }

    setIsUpdatingItem((prev) => ({ ...prev, [itemKey]: true }));

    try {
      await axios.delete(`${baseUrl}/cart/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      await refetch();
    } catch (requestError) {
      const fallbackError = "Failed to remove cart item. Please try again.";
      const message =
        axios.isAxiosError(requestError) &&
        typeof requestError.response?.data?.message === "string"
          ? requestError.response.data.message
          : fallbackError;

      toast.error(message);
    } finally {
      setIsUpdatingItem((prev) => ({ ...prev, [itemKey]: false }));
    }
  };

  const handleCheckout = (values: unknown) => {
    console.log("Checkout:", values);
    // TODO: integrate with payment / order API
  };

  const errorMessage =
    error instanceof Error
      ? error.message
      : "We could not load your cart. Please try again.";

  return (
    <main className="min-h-screen bg-[#F9FAFB]">
      <Container className="py-8 sm:py-10 lg:py-14 flex flex-col gap-5 sm:gap-6">
        {/* Page heading */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl sm:text-[28px] lg:text-[32px] font-semibold leading-9 sm:leading-10 lg:leading-12 text-[#0F2A3C]">
            Your Cart
          </h1>
          <p className="text-sm sm:text-base font-normal leading-5 sm:leading-6 text-[#5E707C]">
            Review the products in your cart before proceeding to checkout.
          </p>
        </div>

        {/* Two-column layout: cart items left, billing right */}
        <div className="flex flex-col lg:flex-row gap-5">
          {isPending ? (
            <>
              <div className="flex flex-col gap-5 flex-1 min-w-0 w-full">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-[20px] p-5 sm:p-6 shadow-[0px_4px_20px_0px_rgba(145,158,171,0.08)]"
                  >
                    <div className="flex items-center gap-4">
                      <Skeleton className="size-16 sm:size-20 rounded-xl" />
                      <div className="flex flex-col gap-2 flex-1">
                        <Skeleton className="h-6 w-2/5" />
                        <Skeleton className="h-4 w-1/4" />
                      </div>
                    </div>
                    <div className="mt-5 flex items-center justify-between">
                      <Skeleton className="h-10 w-30 rounded-full" />
                      <Skeleton className="h-7 w-20" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white flex flex-col gap-4 p-4 sm:p-6 lg:p-8 rounded-[20px] shadow-[0px_4px_20px_0px_rgba(145,158,171,0.08)] flex-1 min-w-0">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-36 w-full" />
                <Skeleton className="h-13 w-full rounded-xl" />
              </div>
            </>
          ) : isError ? (
            <div className="bg-white rounded-[20px] p-10 text-center shadow-[0px_4px_20px_0px_rgba(145,158,171,0.08)] w-full">
              <p className="text-base sm:text-lg font-semibold text-[#DE5D56]">
                Something went wrong while loading your cart.
              </p>
              <p className="mt-2 text-sm sm:text-base text-[#5E707C]">{errorMessage}</p>
              <button
                onClick={() => refetch()}
                className="mt-6 h-11 px-6 rounded-xl bg-[#1E6FA8] text-white text-sm sm:text-base font-semibold hover:bg-[#1A5F92] transition-colors cursor-pointer"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              {/* Cart items */}
              <div className="flex flex-col gap-5 flex-1 min-w-0 w-full">
                {items.length === 0 ? (
                  <div className="bg-white rounded-[20px] p-10 text-center shadow-[0px_4px_20px_0px_rgba(145,158,171,0.08)]">
                    <p className="text-base font-normal text-[#919EAB]">
                      Your cart is empty.{" "}
                      <a href="/shop" className="text-[#1E6FA8] underline">
                        Continue shopping
                      </a>
                    </p>
                  </div>
                ) : (
                  items.map((item) => (
                    <CartItem
                      key={item.id}
                      {...item}
                      onIncrement={handleIncrement}
                      onDecrement={handleDecrement}
                      onRemove={handleRemove}
                    />
                  ))
                )}
              </div>

              {/* Billing form + order summary */}
              <BillingFormCard
                subtotal={Math.round(subtotal)}
                tax={tax}
                shipping={shipping}
                onSubmit={handleCheckout}
              />
            </>
          )}
        </div>
      </Container>
    </main>
  );
};

export default CartPage;
