import Image from "next/image";
import Container from "../shared/Container";
import SectionHeader from "../shared/SectionHeader";
import { StaticImageData } from "next/image";
import CategoryImg1 from "@/assets/images/category-img/category1.png";
import CategoryImg2 from "@/assets/images/category-img/category2.png";
import CategoryImg3 from "@/assets/images/category-img/category3.png";
import CategoryImg4 from "@/assets/images/category-img/category4.png";

interface CategoryItem {
  icon: StaticImageData;
  title: string;
  description: string;
}

const categories: CategoryItem[] = [
  {
    icon: CategoryImg1,
    title: "Beard Care",
    description:
      "Hydrate and tame even the coarsest facial hair with pro-grade oils and balms.",
  },
  {
    icon: CategoryImg2,
    title: "Hair Styling",
    description:
      "From matte textures to high-shine pomades, find the hold that lasts all day.",
  },
  {
    icon: CategoryImg3,
    title: "Skin Nourishment",
    description:
      "Cleanse and protect your skin with formulas designed for post-shave sensitivity.",
  },
  {
    icon: CategoryImg4,
    title: "Shaving Essentials",
    description:
      "Achieve the ultimate close shave with precision razors and irritation-free creams.",
  },
];

const CategoryCard = ({ icon, title, description }: CategoryItem) => (
  <div className="bg-[#F4F6F8] border border-[#bbd8ec] rounded-[20px] flex flex-col gap-4 items-center pt-10 pb-5 px-5 w-full lg:w-88.75 flex-1">
    <div className="w-30 h-30 flex items-center justify-center">
      <Image src={icon} alt={title} width={120} height={120} />
    </div>
    <div className="flex flex-col gap-2 items-center text-center p-3 w-full">
      <h3 className="text-[30px] font-semibold leading-12 text-[#1E6FA8]">
        {title}
      </h3>
      <p className="text-base font-normal leading-6 text-[#5E707C] max-w-70">
        {description}
      </p>
    </div>
  </div>
);

const ProductCategoriesSection = () => {
  return (
    <section className="w-full pb-5">
      <Container>
        <div className="flex flex-col gap-12 items-center">
          <SectionHeader
            tag="Product categories"
            title={
              <>
                Built for Barbers.{" "}
                <span className="text-[#1E6FA8]">Designed for Clients.</span>
              </>
            }
          />
          <div className="flex flex-wrap gap-5 items-stretch justify-between w-full">
            {categories.map((category) => (
              <CategoryCard key={category.title} {...category} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProductCategoriesSection;
