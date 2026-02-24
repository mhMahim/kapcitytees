"use client";

import { useState } from "react";
import Container from "@/components/shared/Container";
import CartItem, { CartItemData } from "@/components/cart/CartItem";
import BillingFormCard from "@/components/cart/BillingFormCard";

// Placeholder product image
const PRODUCT_IMG = "https://i.ibb.co.com/27rvh0W6/Rectangle-55.png";

const INITIAL_ITEMS: CartItemData[] = [
  { id: 1, name: "Beard Oil", category: "Beard", price: 49.99, quantity: 1, image: PRODUCT_IMG },
  { id: 2, name: "Beard Oil", category: "Beard", price: 49.99, quantity: 1, image: PRODUCT_IMG },
  { id: 3, name: "Beard Oil", category: "Beard", price: 49.99, quantity: 1, image: PRODUCT_IMG },
];

const TAX = 12;
const SHIPPING = 20;

const CartPage = () => {
  const [items, setItems] = useState<CartItemData[]>(INITIAL_ITEMS);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleIncrement = (id: string | number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id: string | number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (id: string | number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = (values: unknown) => {
    console.log("Checkout:", values);
    // TODO: integrate with payment / order API
  };

  return (
    <main className="min-h-screen bg-[#F9FAFB]">
      <Container className="py-14 flex flex-col gap-6">
        {/* Page heading */}
        <div className="flex flex-col gap-1">
          <h1 className="text-[32px] font-semibold leading-12 text-[#0F2A3C]">
            Your Cart
          </h1>
          <p className="text-base font-normal leading-6 text-[#5E707C]">
            Review the products in your cart before proceeding to checkout.
          </p>
        </div>

        {/* Two-column layout: cart items left, billing right */}
        <div className="flex flex-col lg:flex-row gap-5 items-start">
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
            tax={TAX}
            shipping={SHIPPING}
            onSubmit={handleCheckout}
          />
        </div>
      </Container>
    </main>
  );
};

export default CartPage;
