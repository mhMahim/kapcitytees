import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <div className="bg-[#F9FAFB] min-h-screen flex items-center justify-center">
      <div className="bg-white px-12 py-18 flex flex-col items-center rounded-4xl space-y-8 max-w-150">
        <Logo className="size-32" />
        <div className="space-y-4 text-center">
          <h2 className="text-[32px] font-semibold">All Done!</h2>
          <p className="text-[#637381]">
            Thank you for updating your password. Your account has been
            successfully updated. You can now log in with your new password.
          </p>
          <Button asChild>
            <Link href="/login" className="px-10">
              Go to Login
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
