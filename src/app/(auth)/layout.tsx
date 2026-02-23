import AuthBanner from "@/assets/images/auth-banner.jpg";
import Logo from "@/components/shared/Logo";
import Image from "next/image";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative bg-[#F9FAFB]">
      <div className="grid grid-cols-7 gap-5">
        {children}
        <div className="col-span-3">
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
      <Logo className="fixed top-8 left-8" />
    </div>
  );
};

export default layout;
