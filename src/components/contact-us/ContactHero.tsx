import Container from "@/components/shared/Container";
import Link from "next/link";

// Same hero background as FAQ page — replace with a local file when available
const CONTACT_HERO_IMG = "https://i.ibb.co.com/twmL4hz9/Frame-2147228538.png";

const ContactHero = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8">
      <div className="relative h-44 sm:h-60 lg:h-80 xl:h-100 rounded-2xl sm:rounded-3xl overflow-hidden">
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
        <Container className="absolute inset-0 flex flex-col items-center justify-center gap-2 sm:gap-4 text-center">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-[64px] font-bold leading-tight text-white">
            Contact Us
          </h1>
          <p className="text-[#E9F1F6] text-sm sm:text-base lg:text-xl font-medium leading-5 sm:leading-6 lg:leading-7.5">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            {" / Contact Us"}
          </p>
        </Container>
      </div>
    </section>
  );
};

export default ContactHero;
