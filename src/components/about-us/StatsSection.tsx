import Container from "../shared/Container";

interface StatItem {
  value: string;
  label: string;
}

const stats: StatItem[] = [
  { value: "25+", label: "Years" },
  { value: "100K+", label: "Customers" },
  { value: "35+", label: "Awards" },
  { value: "98%", label: "Satisfied" },
];

const StatCard = ({ value, label }: StatItem) => (
  <div className="flex-1 flex flex-col items-center gap-2 bg-[#E9F1F6] rounded-2xl sm:rounded-[20px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 text-center">
    <p className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-8 sm:leading-10 lg:leading-12 xl:leading-16 text-[#1E6FA8]">
      {value}
    </p>
    <p className="text-sm sm:text-base lg:text-lg font-medium leading-6 sm:leading-7 text-[#5E707C]">
      {label}
    </p>
  </div>
);

const StatsSection = () => {
  return (
    <section className="w-full">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 2xl:gap-8">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default StatsSection;
