"use client";

import { useMemo, useSyncExternalStore } from "react";
import { toast } from "sonner";
import Container from "@/components/shared/Container";
import CartItem, { CartItemData } from "@/components/cart/CartItem";
import BillingFormCard from "@/components/cart/BillingFormCard";
import Link from "next/link";
import {
  getLocalCartSnapshot,
  removeLocalCartItem,
  subscribeToLocalCart,
  updateLocalCartQuantity,
} from "@/lib/cart";

const CartPage = () => {
  const localCartSnapshot = useSyncExternalStore(
    subscribeToLocalCart,
    getLocalCartSnapshot,
    () => "[]",
  );

  const localCartItems = useMemo(() => {
    try {
      const parsed = JSON.parse(localCartSnapshot);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, [localCartSnapshot]);

  const items = useMemo<CartItemData[]>(
    () =>
      localCartItems.map((item) => ({
        id: item.id,
        name: item.name,
        category: item.category,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
    [localCartItems],
  );

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const tax = 0;
  const shipping = 0;

  const handleIncrement = (id: string | number) => {
    updateLocalCartQuantity(id, "increment");
  };

  const handleDecrement = (id: string | number) => {
    updateLocalCartQuantity(id, "decrement");
  };

  const handleRemove = (id: string | number) => {
    removeLocalCartItem(id);
    toast.success("Item removed from cart.");
  };

  const handleCheckout = (values: unknown) => {
    console.log("Checkout:", values);
    // TODO: integrate with payment / order API
  };

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
          {/* Cart items */}
          <div className="flex flex-col gap-5 flex-1 min-w-0 w-full">
            {items.length === 0 ? (
              <div className="bg-white rounded-[20px] p-10 text-center shadow-[0px_4px_20px_0px_rgba(145,158,171,0.08)]">
                <p className="text-base font-normal text-[#919EAB]">
                  Your cart is empty.{" "}
                  <Link href="/for-clients" className="text-[#1E6FA8] underline">
                    Continue shopping
                  </Link>
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
            subtotal={Number(subtotal.toFixed(2))}
            tax={tax}
            shipping={shipping}
            onSubmit={handleCheckout}
          />
        </div>
      </Container>
    </main>
  );
};

export default CartPage;
