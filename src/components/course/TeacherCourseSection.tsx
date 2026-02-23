import Container from "../shared/Container";
import teacher1img from "@/assets/images/teachers/teacher1.png";
import teacher2img from "@/assets/images/teachers/teacher2.png";
import teacher3img from "@/assets/images/teachers/teacher3.png";
import teacher4img from "@/assets/images/teachers/teacher4.png";
import Image from "next/image";

const teachersInfo = [
  {
    name: "Robert David",
    title: "BE, CELTA",
    image: teacher1img,
  },
  {
    name: "Robert David",
    title: "BE, CELTA",
    image: teacher2img,
  },
  {
    name: "Robert David",
    title: "BE, CELTA",
    image: teacher3img,
  },
  {
    name: "Robert David",
    title: "BE, CELTA",
    image: teacher4img,
  },
];

const TeacherCourseSection = ({
  title = "Meet Your IELTS Teacher",
}: {
  title?: string;
}) => {
  return (
    <Container className="py-20">
      <div className="text-center mb-12">
        <h2 className="text-[32px] font-semibold text-[#212b36]">{title}</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        {teachersInfo.map((teacher, index) => (
          <div
            key={index}
            className="flex flex-col items-center flex-1 bg-white p-4 rounded-[20px] shadow-md"
          >
            <figure className="rounded-2xl h-70 overflow-hidden">
              <Image
                src={teacher.image}
                alt={teacher.name}
                className="h-full w-full object-cover"
              />
            </figure>
            <h3 className="text-lg font-semibold mt-4 mb-2">{teacher.name}</h3>
            <p className="text-sm text-gray-600">{teacher.title}</p>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default TeacherCourseSection;
