import Image from "next/image";
import Container from "../shared/Container";
import { Play } from "lucide-react";

/* Placeholder images — replace with actual assets */
const GALLERY_LEFT =
  "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=726&h=724&fit=crop";
const GALLERY_TOP_RIGHT =
  "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=730&h=350&fit=crop";
const GALLERY_BOTTOM_RIGHT =
  "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=730&h=350&fit=crop";
const VIDEO_BG =
  "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=1480&h=608&fit=crop";

const PhotoGallerySection = () => {
  return (
    <section className="w-full">
      <Container className="flex flex-col gap-6">
        {/* Photo Grid */}
        <div className="flex gap-6 w-full">
          {/* Large left image */}
          <div className="relative w-1/2 aspect-square rounded-[32px] overflow-hidden">
            <Image
              src={GALLERY_LEFT}
              alt="Barber at work"
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          {/* Two stacked right images */}
          <div className="flex flex-col gap-6 w-1/2">
            <div className="relative flex-1 rounded-[32px] overflow-hidden">
              <Image
                src={GALLERY_TOP_RIGHT}
                alt="Professional grooming"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="relative flex-1 rounded-[32px] overflow-hidden">
              <Image
                src={GALLERY_BOTTOM_RIGHT}
                alt="Grooming products"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div className="relative w-full h-152 rounded-[32px] overflow-hidden">
          <Image
            src={VIDEO_BG}
            alt="Video preview"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/20" />
          {/* Play button */}
          <button
            type="button"
            className="absolute inset-0 flex items-center justify-center"
            aria-label="Play video"
          >
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:bg-white transition-colors">
              <Play className="w-7 h-7 text-[#0F2A3C] fill-[#0F2A3C] ml-1" />
            </div>
          </button>
        </div>
      </Container>
    </section>
  );
};

export default PhotoGallerySection;
