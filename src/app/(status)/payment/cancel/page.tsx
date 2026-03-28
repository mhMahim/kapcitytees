import Link from "next/link";
import { XCircle } from "lucide-react";
import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div className="bg-[#F9FAFB] min-h-screen flex items-center justify-center px-4 sm:px-6">
      <div className="bg-white px-6 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-18 flex flex-col items-center rounded-4xl space-y-6 sm:space-y-7 lg:space-y-8 w-full max-w-150">
        <Logo className="size-20 sm:size-24 lg:size-32" />

        <div className="flex items-center justify-center rounded-full size-16 sm:size-18 lg:size-20 bg-[#FDEBEC]">
          <XCircle color="#D14343" className="size-12 sm:size-14 lg:size-16" />
        </div>

        <div className="space-y-3 sm:space-y-4 text-center">
          <h1 className="text-2xl sm:text-[28px] lg:text-[32px] font-semibold text-[#0F2A3C]">
            Payment Cancelled
          </h1>
          <p className="text-sm sm:text-base text-[#637381]">
            Your payment was cancelled, and no order has been created. You can
            return to your cart to review your items and try again.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button
            asChild
            className="h-11 sm:h-12 lg:h-14.5 text-sm sm:text-base"
          >
            <Link href="/cart" className="px-8 sm:px-10">
              Back to Cart
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="h-11 sm:h-12 lg:h-14.5 text-sm sm:text-base"
          >
            <Link href="/for-clients" className="px-8 sm:px-10">
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
