import Image from "next/image";
import Container from "../shared/Container";
import DashboardPreview from "@/assets/images/dashboard.png";

const DashboardPreviewSection = () => {
  return (
    <section className="pt-16 lg:pt-30">
      <Container>
        <Image
          src={DashboardPreview}
          alt="Dashboard Preview"
          width={1180}
          height={850}
          className="max-w-295 h-auto mx-auto"
        />
      </Container>
    </section>
  );
};

export default DashboardPreviewSection;
