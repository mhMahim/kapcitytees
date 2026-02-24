interface OrderSummaryProps {
  subtotal: number;
  tax: number;
  shipping: number;
}

const OrderSummary = ({ subtotal, tax, shipping }: OrderSummaryProps) => {
  const total = subtotal + tax + shipping;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl font-medium leading-7.5 text-[#0F2A3C]">
        Order Summary
      </p>
      <div className="flex flex-col gap-3 pl-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-base font-normal leading-6 text-[#3F5563]">
              Subtotal
            </span>
            <span className="text-lg font-semibold leading-7 text-[#0F2A3C]">
              ${subtotal}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-base font-normal leading-6 text-[#3F5563]">
              Estimated Tax
            </span>
            <span className="text-lg font-semibold leading-7 text-[#0F2A3C]">
              ${tax}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-base font-normal leading-6 text-[#3F5563]">
              Estimated shipping &amp; Handling
            </span>
            <span className="text-lg font-semibold leading-7 text-[#0F2A3C]">
              ${shipping}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#DFE3E8] w-full" />

        <div className="flex items-center justify-between">
          <span className="text-base font-semibold leading-6 text-[#3F5563]">
            Total
          </span>
          <span className="text-lg font-semibold leading-7 text-[#0F2A3C]">
            ${total}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
