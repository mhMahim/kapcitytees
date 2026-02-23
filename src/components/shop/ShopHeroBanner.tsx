import Image from "next/image";
import Link from "next/link";

// Default: use any banner image available in your project
const DEFAULT_BG = "https://i.ibb.co.com/twmL4hz9/Frame-2147228538.png";

interface ShopHeroBannerProps {
  title?: string;
  bgImage?: string;
  breadcrumb?: { label: string; href: string }[];
}

const ShopHeroBanner = ({
  title = "Shop",
  bgImage = DEFAULT_BG,
  breadcrumb = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
  ],
}: ShopHeroBannerProps) => {
  return (
    <div className="relative h-100 w-full overflow-hidden rounded-3xl mx-auto">
      {/* Background image */}
      <Image
        src={bgImage}
        alt="Shop banner"
        fill
        className="object-cover"
        priority
        unoptimized
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/15" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <h1 className="text-white text-6xl font-bold leading-tight">{title}</h1>

        <p className="text-[#E9F1F6] text-base font-medium">
          {breadcrumb.map((crumb, i) => (
            <span key={crumb.href}>
              {i > 0 && <span className="mx-2">/</span>}
              <Link
                href={crumb.href}
                className={
                  i === breadcrumb.length - 1
                    ? "text-[#E9F1F6]"
                    : "text-[#E9F1F6] hover:text-white transition-colors"
                }
              >
                {crumb.label}
              </Link>
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default ShopHeroBanner;
