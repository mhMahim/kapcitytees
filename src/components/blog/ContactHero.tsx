import Container from "@/components/shared/Container";
import Link from "next/link";

// Same hero background as FAQ page — replace with a local file when available
const CONTACT_HERO_IMG = "https://i.ibb.co.com/twmL4hz9/Frame-2147228538.png";

const BlogHero = () => {
  return (
    <section className="w-full px-8">
      <div className="relative h-100 rounded-3xl overflow-hidden">
        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={CONTACT_HERO_IMG}
          alt="Contact Us hero background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/15" />

        {/* Content */}
        <Container className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-white text-[64px] font-bold leading-[1.4]">
            Blog
          </h1>
          <p className="text-[#E9F1F6] text-xl font-medium leading-7.5">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            {" / Blog"}
          </p>
        </Container>
      </div>
    </section>
  );
};

export default BlogHero;
