import { Button } from "../ui/button";
import Container from "../shared/Container";
import HeroTitle from "../shared/HeroTitle";

const HeroSuccessStorySection = () => {
  return (
    <div className="pt-30 pb-12">
      <Container className="relative flex flex-col items-center gap-10">
        <HeroTitle
          tag="Success Stories"
          title="What Students Say"
          description="Real feedback from students preparing for IELTS and PTE with our platform."
        />
        <div className="flex gap-4">
          <Button className="px-12">Register Now</Button>
        </div>
      </Container>
    </div>
  );
};

export default HeroSuccessStorySection;
