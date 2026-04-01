"use client";

import Image from "next/image";
import OrderStatusBadge from "./OrderStatusBadge";
import useFetchData from "@/hooks/useFetchData";
import { Skeleton } from "@/components/ui/skeleton";

type OrderStatus = "Delivered" | "Processing" | "Pending";

interface OrderItem {
  orderId: string;
  itemName: string;
  itemImage: string;
  quantity: number;
  deliveryDate: string;
  status: OrderStatus;
  price: string;
}

interface OrderGroup {
  items: OrderItem[];
}

interface OrdersSectionProps {
  orderGroups?: OrderGroup[];
}

const PRODUCT_IMG = "https://i.ibb.co.com/27rvh0W6/Rectangle-55.png";

interface ApiOrderItem {
  product_id: number;
  product_name: string | null;
  product_image: string | null;
  quantity: number;
  price: string;
}

interface ApiOrderHistoryEntry {
  order_id: string;
  status: string;
  total_price: string;
  items: ApiOrderItem[];
}

interface ApiOrderHistoryResponse {
  success?: boolean;
  data?: {
    data?: ApiOrderHistoryEntry[];
  };
}

const resolveImageUrl = (imagePath?: string | null) => {
  if (!imagePath) {
    return PRODUCT_IMG;
  }

  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  const normalizedPath = imagePath.startsWith("/")
    ? imagePath.slice(1)
    : imagePath;

  return `https://kapcitytees.thewarriors.team/${normalizedPath}`;
};

const formatPrice = (value: string | number | undefined) => {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return "$ 0.00";
  }

  return `$ ${numericValue.toFixed(2)}`;
};

const normalizeOrderStatus = (status: string | undefined): OrderStatus => {
  const normalizedStatus = status?.toLowerCase();

  if (["delivered", "completed", "complete"].includes(normalizedStatus || "")) {
    return "Delivered";
  }

  if (["processing", "in_progress", "in progress"].includes(normalizedStatus || "")) {
    return "Processing";
  }

  return "Pending";
};

const OrderRow = ({ item }: { item: OrderItem }) => (
  <>
    {/* Mobile card layout */}
    <div className="flex flex-col gap-2.5 sm:hidden">
      <div className="flex items-center gap-3">
        <div className="size-13.5 rounded overflow-hidden shrink-0">
          <Image
            src={item.itemImage}
            alt={item.itemName}
            width={54}
            height={54}
            className="size-full object-cover"
          />
        </div>
        <p className="flex-1 text-base font-semibold text-[#0F2A3C] leading-6">
          {item.itemName}
        </p>
        <p className="text-base font-semibold text-[#0F2A3C] leading-6 shrink-0">
          {item.price}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <p className="text-sm text-[#5E707C]">
          Order:{" "}
          <span className="text-[#0F2A3C] font-medium">{item.orderId}</span>
        </p>
        <span className="text-[#DFE3E8]">·</span>
        <p className="text-sm text-[#5E707C]">
          Qty:{" "}
          <span className="text-[#0F2A3C] font-medium">{item.quantity}</span>
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#0F2A3C] leading-5">
            {item.deliveryDate}
          </p>
          <p className="text-xs text-[#5E707C] leading-4.5">expected</p>
        </div>
        <OrderStatusBadge status={item.status} />
      </div>
    </div>

    {/* Desktop table row */}
    <div className="hidden sm:flex items-center w-full">
      {/* Order ID */}
      <p className="w-35 text-base font-normal text-[#0F2A3C] leading-6">
        {item.orderId}
      </p>

      {/* Item */}
      <div className="flex-1 flex items-center gap-4">
        <div className="size-13.5 rounded overflow-hidden shrink-0">
          <Image
            src={item.itemImage}
            alt={item.itemName}
            width={54}
            height={54}
            className="size-full object-cover"
          />
        </div>
        <p className="text-base font-semibold text-[#0F2A3C] leading-6">
          {item.itemName}
        </p>
      </div>

      {/* Quantity */}
      <p className="w-30 text-base font-normal text-[#0F2A3C] leading-6">
        {item.quantity}
      </p>

      {/* Delivery Date */}
      <div className="w-50 flex flex-col">
        <p className="text-base font-normal text-[#0F2A3C] leading-6">
          {item.deliveryDate}
        </p>
        <p className="text-sm font-normal text-[#0F2A3C] leading-5.5">
          expected
        </p>
      </div>

      {/* Status */}
      <div className="w-45">
        <OrderStatusBadge status={item.status} />
      </div>

      {/* Price */}
      <p className="w-35 text-base font-semibold text-[#0F2A3C] leading-6">
        {item.price}
      </p>
    </div>
  </>
);

const OrdersSection = ({ orderGroups }: OrdersSectionProps) => {
  const hasCustomOrderGroups = Array.isArray(orderGroups);

  const {
    data: orderHistoryResponse,
    isPending,
    isError,
  } = useFetchData("/profile/order-history", true, {
    enabled: !hasCustomOrderGroups,
  });

  const apiOrderHistory =
    ((orderHistoryResponse as ApiOrderHistoryResponse | undefined)?.data
      ?.data as ApiOrderHistoryEntry[] | undefined) ?? [];

  const fetchedOrderGroups: OrderGroup[] = apiOrderHistory.map((order) => {
    const mappedItems = (order.items ?? []).map((item) => ({
      orderId: order.order_id,
      itemName: item.product_name?.trim() || "Product",
      itemImage: resolveImageUrl(item.product_image),
      quantity: item.quantity ?? 0,
      deliveryDate: "-",
      status: normalizeOrderStatus(order.status),
      price: formatPrice(item.price ?? order.total_price),
    }));

    if (mappedItems.length > 0) {
      return { items: mappedItems };
    }

    return {
      items: [
        {
          orderId: order.order_id,
          itemName: "Order",
          itemImage: PRODUCT_IMG,
          quantity: 0,
          deliveryDate: "-",
          status: normalizeOrderStatus(order.status),
          price: formatPrice(order.total_price),
        },
      ],
    };
  });

  const resolvedOrderGroups = hasCustomOrderGroups
    ? (orderGroups ?? [])
    : fetchedOrderGroups;

  const isOrdersPending = !hasCustomOrderGroups && isPending;
  const isOrdersError = !hasCustomOrderGroups && isError;

  return (
    <div className="bg-white rounded-2xl shadow-[0px_4px_20px_0px_rgba(145,158,171,0.08)] p-4 sm:p-8 flex flex-col flex-1">
      {/* Table Header */}
      <div className="hidden sm:flex items-center px-4.5 py-2 text-base font-semibold text-[#5E707C] leading-6">
        <p className="w-36.5">Order ID</p>
        <p className="w-80.75">Items</p>
        <p className="w-30">Quantity</p>
        <p className="w-50">Delivery date</p>
        <p className="w-49">Status</p>
        <p className="flex-1">Price</p>
      </div>

      {/* Order Groups */}
      {isOrdersPending ? (
        <div className="flex flex-col gap-4 mt-2">
          {Array.from({ length: 2 }).map((_, groupIndex) => (
            <div
              key={`order-group-skeleton-${groupIndex}`}
              className="border border-[#DFE3E8] rounded-xl px-3 py-3 sm:px-6 sm:py-4 flex flex-col gap-4 sm:gap-4.5"
            >
              {Array.from({ length: groupIndex === 0 ? 2 : 1 }).map((__, rowIndex) => (
                <div key={`order-row-skeleton-${groupIndex}-${rowIndex}`}>
                  <div className="sm:hidden flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <Skeleton className="size-13.5 rounded" />
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-5 w-16 ml-auto" />
                    </div>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-10" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-6 w-20 rounded-md" />
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center w-full">
                    <Skeleton className="h-5 w-26" />
                    <div className="flex-1 flex items-center gap-4 ml-10">
                      <Skeleton className="size-13.5 rounded" />
                      <Skeleton className="h-5 w-36" />
                    </div>
                    <Skeleton className="h-5 w-12" />
                    <Skeleton className="h-5 w-20 ml-16" />
                    <Skeleton className="h-6 w-20 rounded-md ml-14" />
                    <Skeleton className="h-5 w-16 ml-auto" />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : isOrdersError ? (
        <div className="mt-2 rounded-xl bg-[#FFF2F2] px-4 py-3">
          <p className="text-sm leading-5 text-[#B42318]">
            Failed to load order history. Please try again later.
          </p>
        </div>
      ) : resolvedOrderGroups.length === 0 ? (
        <div className="mt-2 rounded-xl bg-[#F9FAFB] px-4 py-8 text-center">
          <p className="text-sm sm:text-base leading-6 text-[#637381]">
            No order history found yet.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 mt-2">
          {resolvedOrderGroups.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="border border-[#DFE3E8] rounded-xl px-3 py-3 sm:px-6 sm:py-4 flex flex-col gap-4 sm:gap-4.5"
            >
              {group.items.map((item, itemIndex) => (
                <OrderRow key={itemIndex} item={item} />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersSection;
