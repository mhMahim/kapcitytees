import { cn } from "@/lib/utils";

type OrderStatus = "Delivered" | "Processing" | "Pending";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  const statusStyles: Record<OrderStatus, string> = {
    Delivered: "bg-[#E6FDF2] border-[#A5E6C6] text-[#0CAF60]",
    Processing: "bg-[#E6F3FF] border-[#B8D8F2] text-[#1E6FA8]",
    Pending: "bg-[#FEF3C7] border-[#F59E0B] text-[#F59E0B]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md px-3 py-1 text-xs font-normal leading-4.5 border",
        statusStyles[status],
      )}
    >
      {status}
    </span>
  );
};

export default OrderStatusBadge;
