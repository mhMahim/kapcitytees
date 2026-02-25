import { cn } from "@/lib/utils";
import { CircleCheck, CircleX } from "lucide-react";
import Container from "../shared/Container";

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
    items: [
      "No inventory risk",
      "No shelf space needed",
      "Centralized logistics",
      "Higher margin control",
      "Brand authority",
    ],
  },
  {
    title: "Stocking Shelves",
    variant: "negative",
    items: [
      "High upfront cost",
      "Takes up space",
      "You handle shipping",
      "Inventory can expire",
      "Generic branding",
    ],
  },
  {
    title: "Other brands",
    variant: "negative",
    items: [
      "Low commission (5-10%)",
      "No brand control",
      "Competing with everyone",
      "No exclusivity",
      "No exclusivity",
    ],
  },
];

const ComparisonSection = () => {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        {/* Header */}
        <div className="flex flex-col items-center gap-3 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-[#0F2A3C] text-center">
            How Barber Certified Compares
          </h2>
          <p className="text-lg font-medium leading-7 text-[#637381] text-center max-w-223.25">
            See the difference between stocking inventory, affiliate promotion,
            and a centralized distribution model.
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {columns.map((column) => (
            <ComparisonCard key={column.title} {...column} />
          ))}
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
      "rounded-3xl p-9 border flex flex-col gap-6",
      highlighted
        ? "bg-white border-[#F4F6F8] shadow-[0px_12px_24px_-4px_rgba(145,158,171,0.16)]"
        : "bg-[#F9FAFB] border-[#F4F6F8]"
    )}
  >
    <h3
      className={cn(
        "text-[32px] font-semibold leading-12",
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
        "text-lg font-medium leading-7",
        highlighted ? "text-[#0F2A3C]" : "text-[#3F5563]"
      )}
    >
      {text}
    </span>
  </div>
);
