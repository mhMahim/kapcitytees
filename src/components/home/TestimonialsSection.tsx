"use client";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { QuoteIcon, StarFilledIcon, StarEmptyIcon } from "@/assets/icons";
import Container from "../shared/Container";
import SectionHeader from "../shared/SectionHeader";

interface TestimonialProps {
  name: string;
  avatar: string;
  rating: number;
  review: string;
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1 items-center">
    {Array.from({ length: 5 }).map((_, i) =>
      i < rating ? (
        <StarFilledIcon key={i} className="w-4 h-4" />
      ) : (
        <StarEmptyIcon key={i} className="w-4 h-4" />
      )
    )}
  </div>
);

const TestimonialCard = ({
  name,
  avatar,
  rating,
  review,
}: TestimonialProps) => (
  <div className="bg-white rounded-2xl px-8 py-6 w-94 flex flex-col gap-6 relative shrink-0 mr-6">
    {/* Quote icon */}
    <div className="absolute top-5 right-8">
      <QuoteIcon />
    </div>

    {/* User info */}
    <div className="flex gap-3 items-center">
      <div className="w-12 h-12 rounded-full overflow-hidden relative bg-[#E7EAEC] shrink-0">
        <Image
          src={avatar}
          alt={name}
          width={48}
          height={48}
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-xl font-bold leading-7.5 text-[#0F2A3C]">
          {name}
        </p>
        <StarRating rating={rating} />
      </div>
    </div>

    {/* Review text */}
    <p className="text-base font-normal leading-6 text-[#3F5563] opacity-80">
      {review}
    </p>
  </div>
);

const TestimonialsSection = () => {
  const testimonials: TestimonialProps[] = [
    {
      name: "John Doe",
      avatar: "/images/avatar-placeholder.svg",
      rating: 4,
      review:
        "This platform is incredibly intuitive and efficient, streamlining our workflow and boosting productivity. A must-have for any team!",
    },
    {
      name: "John Doe",
      avatar: "/images/avatar-placeholder.svg",
      rating: 4,
      review:
        "This platform is incredibly intuitive and efficient, streamlining our workflow and boosting productivity. A must-have for any team!",
    },
    {
      name: "John Doe",
      avatar: "/images/avatar-placeholder.svg",
      rating: 4,
      review:
        "This platform is incredibly intuitive and efficient, streamlining our workflow and boosting productivity. A must-have for any team!",
    },
    {
      name: "John Doe",
      avatar: "/images/avatar-placeholder.svg",
      rating: 4,
      review:
        "This platform is incredibly intuitive and efficient, streamlining our workflow and boosting productivity. A must-have for any team!",
    },
    {
      name: "John Doe",
      avatar: "/images/avatar-placeholder.svg",
      rating: 4,
      review:
        "This platform is incredibly intuitive and efficient, streamlining our workflow and boosting productivity. A must-have for any team!",
    },
  ];

  return (
    <section className="w-full relative overflow-hidden">
      <Container>
        <div className="flex flex-col items-center">
          <SectionHeader
            tag="TESTIMONIALS"
            title="What Our Customers Say"
          />
        </div>
      </Container>

      {/* Marquee rows */}
      <div className="mt-16 flex flex-col gap-6">
        <Marquee speed={40} gradient={false} pauseOnHover>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={`row1-${index}`} {...testimonial} />
          ))}
        </Marquee>
        <Marquee
          speed={40}
          gradient={false}
          pauseOnHover
          direction="right"
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={`row2-${index}`} {...testimonial} />
          ))}
        </Marquee>
      </div>

      {/* Fade edges */}
      <div className="absolute top-0 left-0 w-55 h-full bg-linear-to-r from-[#F9FAFB] to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 right-0 w-55 h-full bg-linear-to-l from-[#F9FAFB] to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default TestimonialsSection;
