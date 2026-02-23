import { Button } from "../ui/button";
import Container from "../shared/Container";
import HeroTitle from "../shared/HeroTitle";

const HeroCourseSection = () => {
  return (
    <div className="pt-30 pb-12">
      <Container className="relative flex flex-col items-center gap-10">
        <HeroTitle
          tag="IELTS General"
          title="Online Preparation for the IELTS General Exam"
          description="Build the skills and confidence needed to succeed in the IELTS General exam. Learn the test format, practise with real exam-style questions, and improve your performance with focused guidance."
        />
        <div className="flex gap-4">
          <Button className="px-12">Start Free Trial</Button>
          <Button variant="outline" className="px-12">
            IELTS Academic
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default HeroCourseSection;
