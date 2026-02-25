import { cn } from "@/lib/utils";

type OrderStatus = "Delivered" | "Processing";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  const isDelivered = status === "Delivered";

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md px-3 py-1 text-xs font-normal leading-4.5 border",
        isDelivered
          ? "bg-[#E6FDF2] border-[#A5E6C6] text-[#0CAF60]"
          : "bg-[#FEF3C7] border-[#F59E0B] text-[#F59E0B]",
      )}
    >
      {status}
    </span>
  );
};

export default OrderStatusBadge;
