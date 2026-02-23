import Container from "@/components/shared/Container";
import Link from "next/link";

// TODO: Replace with a permanent local image at /images/faq-hero.jpg
const FAQ_HERO_IMG = "https://i.ibb.co.com/twmL4hz9/Frame-2147228538.png";

const FAQHero = () => {
  return (
    <section className="w-full px-8">
      <div className="relative h-100 rounded-3xl overflow-hidden">
        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={FAQ_HERO_IMG}
          alt="FAQ hero background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/15" />

        {/* Content */}
        <Container className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-[#E9F1F6] text-xl font-medium leading-7.5">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            {" / FAQ"}
          </p>
          <h1 className="text-white text-[64px] font-bold leading-[1.4]">
            Frequently Asked Questions
          </h1>
        </Container>
      </div>
    </section>
  );
};

export default FAQHero;
