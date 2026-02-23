import Container from "../shared/Container";
import BlogImg from "@/assets/images/blog1.jpg";
import Image from "next/image";

const teachersInfo = [
  {
    title: "BE, CELTA",
    description:
      "Lorem ipsum dolor sit amet consectetur. Cras a nisl nisl euismod odio. Cras a nisl nisl euismod odio. Cras a nisl nisl euismod odio.",
    date: "Sep 27, 2023",
    time: "02:00 PM",
    image: BlogImg,
  },
  {
    title: "MA, TESOL",
    description:
      "Lorem ipsum dolor sit amet consectetur. Cras a nisl nisl euismod odio. Cras a nisl nisl euismod odio. Cras a nisl nisl euismod odio.",
    date: "Sep 28, 2023",
    time: "03:00 PM",
    image: BlogImg,
  },
  {
    title: "PhD, Applied Linguistics",
    description:
      "Lorem ipsum dolor sit amet consectetur. Cras a nisl nisl euismod odio. Cras a nisl nisl euismod odio. Cras a nisl nisl euismod odio.",
    date: "Sep 29, 2023",
    time: "04:00 PM",
    image: BlogImg,
  },
  {
    title: "CELTA, DELTA",
    description:
      "Lorem ipsum dolor sit amet consectetur. Cras a nisl nisl euismod odio. Cras a nisl nisl euismod odio. Cras a nisl nisl euismod odio.",
    date: "Sep 30, 2023",
    time: "05:00 PM",
    image: BlogImg,
  },
  {
    title: "PhD, Applied Linguistics",
    description:
      "Lorem ipsum dolor sit amet consectetur. Cras a nisl nisl euismod odio. Cras a nisl nisl euismod odio. Cras a nisl nisl euismod odio.",
    date: "Sep 29, 2023",
    time: "04:00 PM",
    image: BlogImg,
  },
  {
    title: "CELTA, DELTA",
    description:
      "Lorem ipsum dolor sit amet consectetur. Cras a nisl nisl euismod odio. Cras a nisl nisl euismod odio. Cras a nisl nisl euismod odio.",
    date: "Sep 30, 2023",
    time: "05:00 PM",
    image: BlogImg,
  },
];

const LiveClassScheduleSection = () => {
  return (
    <Container className="py-20">
      <div className="text-center mb-12">
        <h2 className="text-[32px] font-semibold text-[#212b36]">
          Live Class Schedule
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {teachersInfo.map((teacher, index) => (
          <div key={index} className="bg-white p-6 rounded-3xl shadow-md">
            <figure className="h-50 rounded-xl overflow-hidden">
              <Image
                src={teacher.image}
                alt={teacher.title}
                className="h-full w-full object-cover object-center"
              />
            </figure>
            <h3 className="text-xl text-[#161C24] font-medium mt-6 mb-3">{teacher.title}</h3>
            <p className="text-sm text-[#454F5B]">{teacher.description}</p>
            <div className="flex justify-between items-center mt-4">
              <p className="text-[#919EAB] text-xs">{teacher.date}</p>
              <p className="text-primary text-lg leading-7 font-medium">
                {teacher.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default LiveClassScheduleSection;
