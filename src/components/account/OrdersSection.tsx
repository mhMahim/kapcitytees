import Image from "next/image";
import OrderStatusBadge from "./OrderStatusBadge";

type OrderStatus = "Delivered" | "Processing";

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
  orderGroups: OrderGroup[];
}

const PRODUCT_IMG = "https://i.ibb.co.com/27rvh0W6/Rectangle-55.png";

// Sample data
const sampleOrderGroups: OrderGroup[] = [
  {
    items: [
      {
        orderId: "#10234",
        itemName: "Beard Oil",
        itemImage: PRODUCT_IMG,
        quantity: 1,
        deliveryDate: "04-05-2025",
        status: "Delivered",
        price: "$ 49.99",
      },
      {
        orderId: "#10234",
        itemName: "Beard Oil",
        itemImage: PRODUCT_IMG,
        quantity: 1,
        deliveryDate: "04-05-2025",
        status: "Delivered",
        price: "$ 49.99",
      },
      {
        orderId: "#10234",
        itemName: "Beard Oil",
        itemImage: PRODUCT_IMG,
        quantity: 1,
        deliveryDate: "04-05-2025",
        status: "Delivered",
        price: "$ 49.99",
      },
    ],
  },
  {
    items: [
      {
        orderId: "#10234",
        itemName: "Beard Oil",
        itemImage: PRODUCT_IMG,
        quantity: 1,
        deliveryDate: "04-05-2025",
        status: "Processing",
        price: "$ 49.99",
      },
    ],
  },
];

const OrderRow = ({ item }: { item: OrderItem }) => (
  <div className="flex items-center w-full">
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
);

const OrdersSection = ({
  orderGroups = sampleOrderGroups,
}: Partial<OrdersSectionProps>) => {
  return (
    <div className="bg-white rounded-2xl shadow-[0px_4px_20px_0px_rgba(145,158,171,0.08)] p-8 flex flex-col flex-1">
      {/* Table Header */}
      <div className="flex items-center px-4.5 py-2 text-base font-semibold text-[#5E707C] leading-6">
        <p className="w-36.5">Order ID</p>
        <p className="w-80.75">Items</p>
        <p className="w-30">Quantity</p>
        <p className="w-50">Delivery date</p>
        <p className="w-49">Status</p>
        <p className="flex-1">Price</p>
      </div>

      {/* Order Groups */}
      <div className="flex flex-col gap-4 mt-2">
        {orderGroups.map((group, groupIndex) => (
          <div
            key={groupIndex}
            className="border border-[#DFE3E8] rounded-xl px-6 py-4 flex flex-col gap-4.5"
          >
            {group.items.map((item, itemIndex) => (
              <OrderRow key={itemIndex} item={item} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersSection;
