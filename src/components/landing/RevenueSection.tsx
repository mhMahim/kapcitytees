import Container from "../shared/Container";

const calculationRows = [
  { label: "Conversion rate (10%)", value: "12 units" },
  { label: "Average product price", value: "$25" },
  { label: "Commission per sale (30%)", value: "$7.50" },
];

const RevenueSection = () => {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12 lg:gap-20">
          {/* Left content */}
          <div className="flex-1 flex flex-col gap-10 max-w-163.5">
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight lg:leading-17 text-[#0F2A3C]">
              Why Most Barbers Make $0 on Product
            </h2>

            <div className="flex flex-col gap-5 text-2xl font-medium leading-9 text-[#454F5B]">
              <p>
                Only recommending product you can make $90/month.
              </p>
              <div>
                <p className="font-bold leading-10.25">
                  That&apos;s $1,080 per year
                </p>
                <ul className="list-disc ml-9 leading-10.25">
                  <li>without inventory</li>
                  <li>without shelf space</li>
                  <li>without operational risk</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right calculation card */}
          <div className="w-full lg:w-150 shrink-0">
            <CalculationCard />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default RevenueSection;

const CalculationCard = () => (
  <div className="bg-[#F9FAFB] rounded-3xl p-6 flex flex-col gap-8">
    <p className="text-xl font-medium leading-7.5 text-[#454F5B]">
      For example you have 120 clients per month
    </p>

    <div className="flex flex-col gap-3">
      {calculationRows.map((row) => (
        <div key={row.label} className="flex items-center justify-between">
          <span className="text-xl font-medium leading-7.5 text-[#454F5B]">
            {row.label}
          </span>
          <span className="text-xl font-medium leading-7.5 text-[#454F5B] text-right">
            {row.value}
          </span>
        </div>
      ))}

      {/* Divider */}
      <div className="h-px bg-[#DFE3E8] my-1" />

      {/* Total */}
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold leading-7.5 text-[#454F5B]">
          Potential Monthly Revenue
        </span>
        <span className="text-xl font-bold leading-7.5 text-[#454F5B] text-right">
          $90
        </span>
      </div>
    </div>
  </div>
);
