import AuthBanner from "@/assets/images/auth-banner.jpg";
import Logo from "@/components/shared/Logo";
import Image from "next/image";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative bg-[#F9FAFB]">
      <div className="flex flex-col lg:grid lg:grid-cols-7 lg:gap-5">
        {children}
        <div className="hidden lg:block lg:col-span-3">
          <figure className="overflow-hidden sticky top-0 h-screen">
            <Image
              src={AuthBanner}
              alt="Authentication Banner"
              className="w-full h-full object-cover"
            />
            <div className="overlay absolute inset-0 bg-black opacity-32"></div>
          </figure>
        </div>
      </div>
      <Logo className="hidden 2xl:block 2xl:fixed top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8 size-16 sm:size-18 lg:size-22" />
    </div>
  );
};

export default layout;
