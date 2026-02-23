import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

type AffiliateStatus = "processing" | "delivered" | "cancelled";

interface Affiliate {
  id: number;
  name: string;
  avatar: string;
  date: string;
  product: string;
  quantity: number;
  click: number;
  revenue: string;
  status: AffiliateStatus;
  productLink: string;
}

const affiliatesData: Affiliate[] = [
  {
    id: 1,
    name: "Alexa Johnson",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "10 / 1 / 2026",
    product: "Beard Oil",
    quantity: 2,
    click: 20,
    revenue: "60$",
    status: "delivered",
    productLink: "barbercertified.com/ref/marcus10",
  },
  {
    id: 2,
    name: "Alexa Johnson",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "10 / 1 / 2026",
    product: "Beard Oil",
    quantity: 2,
    click: 20,
    revenue: "60$",
    status: "processing",
    productLink: "barbercertified.com/ref/marcus10",
  },
  {
    id: 3,
    name: "Alexa Johnson",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "10 / 1 / 2026",
    product: "Beard Oil",
    quantity: 2,
    click: 20,
    revenue: "60$",
    status: "cancelled",
    productLink: "barbercertified.com/ref/marcus10",
  },
  {
    id: 4,
    name: "Alexa Johnson",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "10 / 1 / 2026",
    product: "Beard Oil",
    quantity: 2,
    click: 20,
    revenue: "60$",
    status: "processing",
    productLink: "barbercertified.com/ref/marcus10",
  },
  {
    id: 5,
    name: "Alexa Johnson",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "10 / 1 / 2026",
    product: "Beard Oil",
    quantity: 2,
    click: 20,
    revenue: "60$",
    status: "delivered",
    productLink: "barbercertified.com/ref/marcus10",
  },
];

const statusStyles: Record<AffiliateStatus, string> = {
  processing: "bg-[#FEF3C7] border-[#F59E0B] text-[#F59E0B]",
  delivered: "bg-[#D1FAE5] border-[#10B981] text-[#10B981]",
  cancelled: "bg-[#FEE2E2] border-[#EF4444] text-[#EF4444]",
};

const CopyIcon = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    className={cn("size-5", className)}
  >
    <rect
      x="7"
      y="7"
      width="10"
      height="10"
      rx="2"
      stroke="#637381"
      strokeWidth="1.5"
    />
    <path
      d="M13 7V5C13 3.89543 12.1046 3 11 3H5C3.89543 3 3 3.89543 3 5V11C3 12.1046 3.89543 13 5 13H7"
      stroke="#637381"
      strokeWidth="1.5"
    />
  </svg>
);

const QRIcon = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    className={cn("size-5.5", className)}
  >
    <rect
      x="2"
      y="2"
      width="7"
      height="7"
      rx="1"
      stroke="#637381"
      strokeWidth="1.5"
    />
    <rect
      x="13"
      y="2"
      width="7"
      height="7"
      rx="1"
      stroke="#637381"
      strokeWidth="1.5"
    />
    <rect
      x="2"
      y="13"
      width="7"
      height="7"
      rx="1"
      stroke="#637381"
      strokeWidth="1.5"
    />
    <rect x="4.5" y="4.5" width="2" height="2" rx="0.5" fill="#637381" />
    <rect x="15.5" y="4.5" width="2" height="2" rx="0.5" fill="#637381" />
    <rect x="4.5" y="15.5" width="2" height="2" rx="0.5" fill="#637381" />
    <path
      d="M13 13H16"
      stroke="#637381"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M13 16.5H16"
      stroke="#637381"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M18.5 13V16.5"
      stroke="#637381"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M13 20H20"
      stroke="#637381"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const columns = [
  { label: "Client", width: "w-65" },
  { label: "Date", width: "w-[14vw] lg:w-[12vw]" },
  { label: "Product", width: "w-[14vw] lg:w-[12vw]" },
  { label: "Quantity", width: "w-[10vw] lg:w-[8vw]" },
  { label: "Click", width: "w-[10vw] lg:w-[8vw]" },
  { label: "Revenue", width: "w-[10vw] lg:w-[8vw]" },
  { label: "Status", width: "w-[12vw] lg:w-[9vw]" },
  { label: "Product Link", width: "w-79" },
];

const TopAffiliatesSection = () => {
  return (
    <div className="bg-white flex flex-col overflow-clip p-8 rounded-2xl shadow-[0px_4px_21px_0px_rgba(98,101,120,0.04)] w-full">
      <div className="flex items-center justify-between pb-3 h-14">
        <h3 className="text-lg font-semibold leading-6 text-textPrimary">
          Top Affiliates
        </h3>
        <Link
          href="#"
          className="text-sm font-normal leading-normal text-[#637381] underline"
        >
          View all
        </Link>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-225 lg:min-w-0 w-full">
          {/* Table Header */}
          <div className="flex items-start px-1">
            {columns.map((col, i) => (
              <div
                key={col.label}
                className={cn(
                  "bg-[#F9FAFB] px-3 py-2 overflow-hidden",
                  col.width,
                  i === 0 && "rounded-l-lg",
                  i === columns.length - 1 && "rounded-r-lg",
                )}
              >
                <p className="text-sm font-semibold leading-normal text-[#637381] truncate">
                  {col.label}
                </p>
              </div>
            ))}
          </div>

          {affiliatesData.map((affiliate) => (
            <div
              key={affiliate.id}
              className="flex items-center py-1 border-b border-[#F9FAFB]"
            >
              {/* Client */}
              <div
                className={cn(
                  "flex items-center gap-3 h-16 px-4 py-3 overflow-hidden",
                  columns[0].width,
                )}
              >
                <div className="relative shrink-0 size-12 rounded-full overflow-hidden">
                  <Image
                    src={affiliate.avatar}
                    alt={affiliate.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-base font-semibold leading-6 text-textPrimary">
                  {affiliate.name}
                </p>
              </div>

              {/* Date */}
              <div
                className={cn(
                  "h-16 flex items-center px-4 py-3 overflow-hidden",
                  columns[1].width,
                )}
              >
                <p className="text-base font-normal leading-6 text-textPrimary">
                  {affiliate.date}
                </p>
              </div>

              {/* Product */}
              <div
                className={cn(
                  "h-16 flex items-center px-4 py-3 overflow-hidden",
                  columns[2].width,
                )}
              >
                <p className="text-base font-semibold leading-6 text-textPrimary">
                  {affiliate.product}
                </p>
              </div>

              {/* Quantity */}
              <div
                className={cn(
                  "h-16 flex items-center px-4 py-3 overflow-hidden",
                  columns[3].width,
                )}
              >
                <p className="text-base font-normal leading-6 text-textPrimary truncate w-full">
                  {affiliate.quantity}
                </p>
              </div>

              {/* Click */}
              <div
                className={cn(
                  "h-16 flex items-center px-4 py-3 overflow-hidden",
                  columns[4].width,
                )}
              >
                <p className="text-base font-normal leading-6 text-textPrimary">
                  {affiliate.click}
                </p>
              </div>

              {/* Revenue */}
              <div
                className={cn(
                  "h-16 flex items-center px-4 py-3 overflow-hidden",
                  columns[5].width,
                )}
              >
                <p className="text-base font-normal leading-6 text-textPrimary">
                  {affiliate.revenue}
                </p>
              </div>

              {/* Status */}
              <div
                className={cn(
                  "h-16 flex items-center px-4 py-3 overflow-hidden",
                  columns[6].width,
                )}
              >
                <span
                  className={cn(
                    "inline-flex items-center justify-center px-3 py-1 rounded-md border text-xs leading-4.5 font-normal capitalize",
                    statusStyles[affiliate.status],
                  )}
                >
                  {affiliate.status}
                </span>
              </div>

              {/* Product Link */}
              <div
                className={cn(
                  "h-16 flex items-center gap-2.5 px-4 py-3 overflow-hidden",
                  columns[7].width,
                )}
              >
                <p className="flex-1 min-w-0 text-base font-normal leading-6 text-textPrimary truncate">
                  {affiliate.productLink}
                </p>
                <button
                  className="shrink-0 size-10 flex items-center justify-center border border-[#F4F6F8] rounded-md bg-white cursor-pointer hover:bg-[#F9FAFB] transition-colors"
                  title="Copy link"
                >
                  <CopyIcon />
                </button>
                <button
                  className="shrink-0 size-10 flex items-center justify-center border border-[#F4F6F8] rounded-md bg-white cursor-pointer hover:bg-[#F9FAFB] transition-colors"
                  title="QR Code"
                >
                  <QRIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopAffiliatesSection;
