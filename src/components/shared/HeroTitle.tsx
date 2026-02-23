import { TagLinkIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";

const HeroTitle = ({
  tag = "",
  title = "",
  titleClassName = "",
  description = "",
  className = "",
}) => {
  return (
    <div className={cn(`flex flex-col items-center text-center`, className)}>
      <div className="bg-white rounded-full flex items-center gap-2 py-2 px-4 border border-[#FCFDFF] mb-4 w-fit">
        <TagLinkIcon />
        <p className="text-[#002B6B]">{tag}</p>
      </div>
      <h1 className={cn("text-[64px] font-bold leading-20 text-[#002B6B] mb-6 max-w-200", titleClassName)}>
        {title}
      </h1>
      <p className="text-lg text-[#637381] max-w-200">{description}</p>
    </div>
  );
};

export default HeroTitle;
