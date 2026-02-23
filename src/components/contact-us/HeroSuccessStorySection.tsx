import Container from "../shared/Container";
import HeroTitle from "../shared/HeroTitle";

const HeroContactUsSection = () => {
  return (
    <div className="pt-30 pb-12">
      <Container className="relative flex flex-col items-center gap-10">
        <HeroTitle
          tag="Contact Us"
          title="We're Here to Help"
          description="Have a question about IELTS or PTE preparation? We're here to help quickly and clearly."
        />
      </Container>
    </div>
  );
};

export default HeroContactUsSection;
