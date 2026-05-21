import Container from "../shared/Container";

const OurStorySection = () => {
  return (
    <section className="w-full">
      <Container className="flex flex-col items-center gap-10 sm:gap-14 lg:gap-20 xl:gap-27.5">
        {/* Header with decorative lines */}
        <div className="flex flex-col items-center gap-6 sm:gap-8 max-w-full">
          <div className="flex items-center gap-3 sm:gap-5 lg:gap-6">
            <div className="w-10 sm:w-16 lg:w-24 xl:w-32.5 h-px bg-[#1E6FA8]" />
            <h2 className="text-xl sm:text-2xl lg:text-[28px] xl:text-[32px] font-semibold leading-7 sm:leading-9 xl:leading-12 text-[#1E6FA8]">
              Our Story
            </h2>
            <div className="w-10 sm:w-16 lg:w-24 xl:w-32.5 h-px bg-[#1E6FA8]" />
          </div>

          {/* Quote & Description */}
          <div className="flex flex-col items-center gap-4 sm:gap-6 text-center">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-8 sm:leading-10 lg:leading-12 xl:leading-16 text-[#0F2A3C]">
              Barber Certified was built from firsthand experience inside the
              barber industry - not from the outside looking in.
            </h3>
            <div className="flex flex-col gap-4 text-sm sm:text-base lg:text-lg font-medium leading-6 sm:leading-7 text-[#637381]">
              <p>
                I created this company because I saw a problem most people
                ignored: talented barbers were building strong personal brands,
                loyal clientele, and influence in their communities, yet many
                still had limited ways to create long-term wealth outside of
                the chair.
              </p>
              <p>
                The industry had skill, culture, and reach, but very few
                systems designed to help barbers scale beyond daily
                appointments. Most brands profited from the culture without
                creating real opportunities for the professionals driving it.
              </p>
              <p>Barber Certified was created to change that.</p>
              <p>
                The vision has always been bigger than grooming products. The
                goal is to build a nationally recognized platform that gives
                barbers more leverage, more visibility, and more ownership over
                their future.
              </p>
            </div>
          </div>
        </div>

        {/* CEO Signature */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-3xl sm:text-4xl lg:text-5xl leading-10 sm:leading-12 lg:leading-16 text-[#161C24] font-licorice">
            Andrew Johnson
          </p>
          <p className="text-base sm:text-lg font-medium leading-6 sm:leading-7 text-[#11161C]">
            Andrew Johnson <span className="text-[#1E6FA8]">•</span> Founder
          </p>
        </div>
      </Container>
    </section>
  );
};

export default OurStorySection;
