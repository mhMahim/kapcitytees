import { cn } from "@/lib/utils";
import { CircleCheck, CircleX } from "lucide-react";
import Container from "../shared/Container";
import SectionHeaderWithLines from "../shared/SectionHeaderWithLines";

interface ComparisonColumnData {
  title: string;
  items: string[];
  variant: "positive" | "negative";
  highlighted?: boolean;
}

const columns: ComparisonColumnData[] = [
  {
    title: "Barber Certified",
    variant: "positive",
    highlighted: true,
    items: ["No Inventory", "High Commissions", "We Handle Shipping"],
  },
  {
    title: "Stocking Inventory",
    variant: "negative",
    items: ["Upfront Costs", "Shelf Management", "Shipping Hassles"],
  },
  {
    title: "Other Brands",
    variant: "negative",
    items: ["Low Commissions", "No Control", "Limited Support"],
  },
];

const ComparisonSection = () => {
  return (
    <section className="pt-10 pb-20 lg:pb-30">
      <Container>
        <div className="flex flex-col gap-12">
          <SectionHeaderWithLines title="Barber Certified vs. The Other Options" />

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {columns.map((column) => (
              <ComparisonCard key={column.title} {...column} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ComparisonSection;

const ComparisonCard = ({
  title,
  items,
  variant,
  highlighted = false,
}: ComparisonColumnData) => (
  <div
    className={cn(
      "rounded-2xl p-9 border flex flex-col gap-6",
      highlighted
        ? "bg-white border-[#F4F6F8] shadow-[0px_12px_24px_-4px_rgba(145,158,171,0.16)]"
        : "bg-[#F9FAFB] border-[#F4F6F8]"
    )}
  >
    <h3
      className={cn(
        "text-2xl lg:text-[32px] font-semibold leading-tight lg:leading-12",
        highlighted ? "text-[#1E6FA8]" : "text-[#3F5563]"
      )}
    >
      {title}
    </h3>

    <div className="flex flex-col gap-3">
      {items.map((item, index) => (
        <ComparisonListItem
          key={index}
          text={item}
          variant={variant}
          highlighted={highlighted}
        />
      ))}
    </div>
  </div>
);

interface ComparisonListItemProps {
  text: string;
  variant: "positive" | "negative";
  highlighted?: boolean;
}

const ComparisonListItem = ({
  text,
  variant,
  highlighted,
}: ComparisonListItemProps) => (
  <div className="flex items-center gap-3">
    {variant === "positive" ? (
      <CircleCheck className="w-6 h-6 text-[#1E6FA8] shrink-0" />
    ) : (
      <CircleX className="w-6 h-6 text-[#637381] shrink-0" />
    )}
    <span
      className={cn(
        "text-base lg:text-lg font-medium leading-7",
        highlighted ? "text-[#0F2A3C]" : "text-[#3F5563]"
      )}
    >
      {text}
    </span>
  </div>
);
