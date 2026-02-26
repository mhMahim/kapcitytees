import Container from "../shared/Container";
import SectionHeaderWithLines from "../shared/SectionHeaderWithLines";

interface StatItem {
  value: string;
  label: string;
}

const stats: StatItem[] = [
  { value: "120", label: "Clients Per Month" },
  { value: "12", label: "Sales (10% Conversion)" },
  { value: "$0", label: "Zero Earnings" },
];

const RevenueSection = () => {
  return (
    <section className="pt-10 pb-20 lg:pb-30">
      <Container>
        <div className="flex flex-col gap-12 items-center">
          <SectionHeaderWithLines
            title={
              <>
                Why Most Barbers Make{" "}
                <span className="text-[#D6342C]">$0</span> on Product
              </>
            }
          />

          {/* Arrow stat bars */}
          <div className="flex w-full relative">
            {stats.map((stat, index) => (
              <ArrowStatCard
                key={stat.label}
                {...stat}
                position={
                  index === 0
                    ? "first"
                    : index === stats.length - 1
                      ? "last"
                      : "middle"
                }
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default RevenueSection;

interface ArrowStatCardProps extends StatItem {
  position: "first" | "middle" | "last";
}

const ArrowStatCard = ({ value, label, position }: ArrowStatCardProps) => {
  const clipPaths = {
    first: "polygon(0 0, calc(100% - 36px) 0, 100% 50%, calc(100% - 36px) 100%, 0 100%)",
    middle:
      "polygon(0 0, calc(100% - 36px) 0, 100% 50%, calc(100% - 36px) 100%, 0 100%, 36px 50%)",
    last: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 36px 50%)",
  };

  return (
    <div
      className="flex-1 flex flex-col items-center justify-center gap-1 lg:gap-2 bg-[#E9F1F6] py-6 lg:py-8"
      style={{ clipPath: clipPaths[position] }}
    >
      <p className="text-3xl lg:text-[64px] font-bold leading-tight lg:leading-20 text-[#1E6FA8]">
        {value}
      </p>
      <p className="text-sm lg:text-xl font-medium leading-normal lg:leading-7.5 text-[#5E707C]">
        {label}
      </p>
    </div>
  );
};
