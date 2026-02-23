"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

// ── Checkbox row ──────────────────────────────────────────────────────────────
interface CheckboxRowProps {
  label: string;
  count?: number;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const CheckboxRow = ({
  label,
  count,
  checked = false,
  onChange,
}: CheckboxRowProps) => (
  <label className="flex items-center gap-3 cursor-pointer w-full">
    <div
      className={`w-5 h-5 rounded shrink-0 border-2 flex items-center justify-center transition-colors ${
        checked
          ? "bg-[#1E6FA8] border-[#1E6FA8]"
          : "bg-white border-[#C4CDD5]"
      }`}
      onClick={() => onChange?.(!checked)}
    >
      {checked && (
        <svg
          className="w-3 h-3 text-white"
          viewBox="0 0 12 12"
          fill="none"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
    <span className="flex-1 font-semibold text-base text-[#3F5563]">{label}</span>
    {count !== undefined && (
      <span className="text-sm text-[#919DA5]">({count})</span>
    )}
  </label>
);

// ── Collapsible section ───────────────────────────────────────────────────────
interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const FilterSection = ({
  title,
  children,
  defaultOpen = true,
}: FilterSectionProps) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="flex flex-col gap-4 w-full">
      <button
        className="flex items-center justify-between w-full"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="text-xl font-medium text-[#3F5563]">{title}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-[#3F5563]" />
        ) : (
          <ChevronDown className="w-4 h-4 text-[#3F5563]" />
        )}
      </button>
      {open && <div className="flex flex-col gap-3">{children}</div>}
      <div className="h-px w-full bg-[#E7EAEC]" />
    </div>
  );
};

// ── Price range ───────────────────────────────────────────────────────────────
const PriceRangeFilter = () => {
  const [min, setMin] = useState(10);
  const [max, setMax] = useState(500);
  const MIN = 0;
  const MAX = 1000;

  const minPercent = ((min - MIN) / (MAX - MIN)) * 100;
  const maxPercent = ((max - MIN) / (MAX - MIN)) * 100;

  return (
    <div className="flex flex-col gap-4 w-full">
      <button className="flex items-center justify-between w-full">
        <span className="text-xl font-medium text-[#3F5563]">Price</span>
        <ChevronUp className="w-4 h-4 text-[#3F5563]" />
      </button>

      {/* Dual range track */}
      <div className="relative w-full h-[15px] flex items-center">
        {/* Track bg */}
        <div className="absolute w-full h-[5px] bg-[#E7EAEC] rounded-full" />
        {/* Active track */}
        <div
          className="absolute h-[5px] bg-[#1E6FA8] rounded-full"
          style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
        />
        {/* Min thumb */}
        <input
          type="range"
          min={MIN}
          max={MAX}
          value={min}
          onChange={(e) => {
            const val = Math.min(Number(e.target.value), max - 10);
            setMin(val);
          }}
          className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#1E6FA8] [&::-webkit-slider-thumb]:shadow-sm"
        />
        {/* Max thumb */}
        <input
          type="range"
          min={MIN}
          max={MAX}
          value={max}
          onChange={(e) => {
            const val = Math.max(Number(e.target.value), min + 10);
            setMax(val);
          }}
          className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#1E6FA8] [&::-webkit-slider-thumb]:shadow-sm"
        />
      </div>

      {/* Min / Max inputs */}
      <div className="flex items-center justify-between gap-3">
        <div className="border border-[#E4E4E4] rounded-[10px] px-4 py-2 w-full">
          <span className="text-base text-[#3F5563]">$ {min}</span>
        </div>
        <div className="border border-[#E4E4E4] rounded-[10px] px-4 py-2 w-full text-right">
          <span className="text-base text-[#3F5563]">$ {max}</span>
        </div>
      </div>

      <div className="h-px w-full bg-[#E7EAEC]" />
    </div>
  );
};

// ── Main sidebar ──────────────────────────────────────────────────────────────
const categories = [
  { label: "Beard", count: 18 },
  { label: "Hair", count: 18 },
  { label: "Skin", count: 18 },
  { label: "Shaving", count: 18 },
];

const ratings = [
  { label: "5", count: 18 },
  { label: "4+", count: 18 },
  { label: "3+", count: 18 },
  { label: "2+", count: 18 },
  { label: "1+", count: 18 },
];

const ShopFilterSidebar = () => {
  const [activeCats, setActiveCats] = useState<string[]>(["Beard"]);
  const [activeRatings, setActiveRatings] = useState<string[]>([]);
  const [barberCertified, setBarberCertified] = useState(true);

  const toggleCat = (label: string) =>
    setActiveCats((prev) =>
      prev.includes(label) ? prev.filter((c) => c !== label) : [...prev, label]
    );

  const toggleRating = (label: string) =>
    setActiveRatings((prev) =>
      prev.includes(label) ? prev.filter((r) => r !== label) : [...prev, label]
    );

  return (
    <aside className="flex flex-col gap-6 w-full">
      <h2 className="text-2xl font-semibold text-[#0F2A3C]">Filters</h2>

      <div className="bg-white rounded-[20px] shadow-[0px_4px_20px_0px_rgba(145,158,171,0.08)] p-8 flex flex-col gap-6 w-full">
        {/* Price */}
        <PriceRangeFilter />

        {/* Barber Certified */}
        <div className="flex flex-col gap-4 w-full">
          <CheckboxRow
            label="Barber Certified Product"
            count={18}
            checked={barberCertified}
            onChange={setBarberCertified}
          />
          <div className="h-px w-full bg-[#E7EAEC]" />
        </div>

        {/* Category */}
        <FilterSection title="Category">
          {categories.map((cat) => (
            <CheckboxRow
              key={cat.label}
              label={cat.label}
              count={cat.count}
              checked={activeCats.includes(cat.label)}
              onChange={() => toggleCat(cat.label)}
            />
          ))}
        </FilterSection>

        {/* Rating */}
        <FilterSection title="Rating">
          {ratings.map((r) => (
            <CheckboxRow
              key={r.label}
              label={r.label}
              count={r.count}
              checked={activeRatings.includes(r.label)}
              onChange={() => toggleRating(r.label)}
            />
          ))}
        </FilterSection>
      </div>
    </aside>
  );
};

export default ShopFilterSidebar;
