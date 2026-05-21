import Image from "next/image";
import Container from "../shared/Container";

const PHILOSOPHY_IMAGE =
  "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=605&h=480&fit=crop";

const PhilosophySection = () => {
  return (
    <section className="w-full">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-16 xl:gap-31.25">
          {/* Left Image */}
          <div className="relative w-full lg:w-151.25 h-56 sm:h-72 lg:h-120 rounded-2xl sm:rounded-[28px] lg:rounded-4xl overflow-hidden shrink-0">
            <Image
              src={PHILOSOPHY_IMAGE}
              alt="Grooming philosophy"
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          {/* Right Content */}
          <div className="flex flex-col gap-4 sm:gap-6 py-0 lg:py-4 xl:py-8 flex-1">
            <div className="flex flex-col gap-3 sm:gap-4">
              <p className="text-sm sm:text-base font-medium leading-5 sm:leading-6 text-[#DE5D56] uppercase tracking-[3px]">
                OUR PHILOSOPHY
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-8 sm:leading-10 xl:leading-17 text-[#0F2A3C] max-w-full">
                Our Philosophy
              </h2>
            </div>
            <p className="text-sm sm:text-base lg:text-lg font-normal leading-6 sm:leading-7 lg:leading-8 text-[#3F5563] opacity-80">
              We believe barbering is more than a service. A barber is a
              professional, a communicator, a creative, and often a cornerstone
              of the community. The industry deserves brands and systems that
              reflect that level of importance.
            </p>
            <div className="text-sm sm:text-base lg:text-lg font-normal leading-6 sm:leading-7 lg:leading-8 text-[#3F5563] opacity-80 mt-4">
              <p>
                Our philosophy is rooted in discipline, presentation,
                consistency, and ownership.
              </p>
              <p>
                We believe barbers should not only master their craft - they
                should also have access to the tools, education, and platforms
                necessary to build wealth, influence, and legacy.
              </p>
              <p className="mt-2 font-semibold">
                Barber Certified represents a higher standard - not just in
                grooming, but in how barbers operate, present themselves, and
                build for the future.
              </p>
              <p className="mt-2">Barbers need their cut.</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PhilosophySection;
