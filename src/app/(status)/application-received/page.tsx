import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <div className="bg-[#F9FAFB] min-h-screen flex items-center justify-center px-4 sm:px-6">
      <div className="bg-white px-6 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-18 flex flex-col items-center rounded-4xl space-y-6 sm:space-y-7 lg:space-y-8 w-full max-w-150">
        <Logo className="size-20 sm:size-24 lg:size-32" />
        <div className="space-y-3 sm:space-y-4 text-center">
          <h2 className="text-2xl sm:text-[28px] lg:text-[32px] font-semibold">Application Received!</h2>
          <p className="text-sm sm:text-base text-[#637381]">
            Thank you for applying to Barber Certified. Our team is currently
            reviewing your professional credentials. You will receive an email
            once your account is activated.
          </p>
          <Button asChild className="h-11 sm:h-12 lg:h-14.5 text-sm sm:text-base">
            <Link href="/" className="px-8 sm:px-10">
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
