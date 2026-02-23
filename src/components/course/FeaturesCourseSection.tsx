import Image from "next/image";
import Container from "../shared/Container";
import FeatureImg from "@/assets/images/about-us-img.png";

interface FeatureCardProps {
  title: string;
  description?: string;
  isActive?: boolean;
}

const FeatureCard = ({
  title,
  description,
  isActive = false,
}: FeatureCardProps) => {
  if (isActive) {
    return (
      <div className="bg-[#e6f0ff] border border-[#0066ff] rounded-[20px] p-4 w-full">
        <h6 className="text-[18px] font-medium leading-7 text-[#161c24] mb-4">
          {title}
        </h6>
        <p className="text-[14px] font-normal leading-normal text-[#454f5b]">
          {description}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[20px] p-4 w-full">
      <h6 className="text-[18px] font-medium leading-7 text-[#161c24]">
        {title}
      </h6>
    </div>
  );
};

const FeaturesCourseSection = () => {
  const features = [
    {
      title: "IELTS General Exam Preparation Materials",
      description:
        "Lorem ipsum dolor sit amet consectetur. Fringilla dui lorem imperdiet mauris. Odio morbi urna ut habitasse. Tortor enim massa ac donec amet. Gravida congue donec eu nisl consectetur magna neque augue.",
      isActive: true,
    },
    {
      title: "IELTS General Exam Preparation Materials",
      description: "",
      isActive: false,
    },
    {
      title: "IELTS General Exam Preparation Materials",
      description: "",
      isActive: false,
    },
    {
      title: "IELTS General Exam Preparation Materials",
      description: "",
      isActive: false,
    },
  ];

  return (
    <Container as="section" className="py-20">
      {/* First Row - Left Content, Right Image */}
      <div className="flex flex-col lg:flex-row gap-8 mb-16">
        {/* Left Content */}
        <div className="lg:w-1/2">
          <h3 className="text-[32px] font-semibold leading-12 text-[#212b36] mb-4">
            Features
          </h3>
          <p className="text-[14px] font-normal leading-normal text-[#454f5b] mb-8 max-w-122">
            Lorem ipsum dolor sit amet consectetur. Fringilla dui lorem
            imperdiet mauris. Odio morbi urna ut habitasse. Tortor enim massa ac
            donec amet. Gravida congue donec eu nisl consectetur magna neque
            augue.
          </p>
          <div className="flex flex-col gap-4">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                isActive={feature.isActive}
              />
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div className="lg:w-1/2">
          <div className="relative h-136.5 w-full rounded-[20px] border border-[#0066ff] overflow-hidden">
            <Image
              src={FeatureImg}
              alt="Features Image"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Second Row - Left Image, Right Content (Reversed) */}
      <div className="flex flex-col lg:flex-row-reverse gap-8">
        {/* Right Content */}
        <div className="lg:w-1/2">
          <div className="flex flex-col gap-4">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                isActive={feature.isActive}
              />
            ))}
          </div>
        </div>

        {/* Left Image */}
        <div className="lg:w-1/2">
          <div className="relative h-136.5 w-full rounded-[20px] border border-[#0066ff] overflow-hidden">
            <Image
              src={FeatureImg}
              alt="Features Image"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default FeaturesCourseSection;
