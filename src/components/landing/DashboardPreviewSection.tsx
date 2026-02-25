import Image from "next/image";
import Container from "../shared/Container";
import DashboardPreview from "@/assets/images/dashboard.png";
import DashboardPreviewOverlay from "@/assets/images/overlays/overlay1.png";

const DashboardPreviewSection = () => {
  return (
    <section className="pt-16 lg:pt-30 relative">
      <Container className="">
        <Image
          src={DashboardPreview}
          alt="Dashboard Preview"
          width={1180}
          height={850}
          className="max-w-295 h-auto mx-auto"
        />
      </Container>
      <Image
        src={DashboardPreviewOverlay}
        alt="Dashboard Preview Overlay"
        className="mx-auto absolute bottom-0 left-0"
      />
    </section>
  );
};

export default DashboardPreviewSection;
