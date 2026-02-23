import Container from "../shared/Container";
import { Mail, Phone, MapPin } from "lucide-react";

type ContactInfoItem = {
  icon: React.ReactNode;
  title: string;
  hoursLabel: string;
  hours: string;
};

const items: ContactInfoItem[] = [
  {
    icon: <Mail size={28} className="text-[#1E6FA8]" />,
    title: "support@kapcitytees.com",
    hoursLabel: "Assistance hours:",
    hours: "Monday – Friday 6 am to 8 pm PST",
  },
  {
    icon: <Phone size={28} className="text-[#1E6FA8]" />,
    title: "(458) 272-8738",
    hoursLabel: "Assistance hours:",
    hours: "Monday – Friday 6 am to 8 pm PST",
  },
  {
    icon: <MapPin size={28} className="text-[#1E6FA8]" />,
    title: "Office Address",
    hoursLabel: "Office hours:",
    hours: "Monday – Friday 6 am to 8 pm PST",
  },
];

const ContactInfoStrip = () => {
  return (
    <section className="w-full py-8 pb-16">
      <Container>
        <div className="bg-[#F4F6F8] rounded-3xl flex gap-10 items-stretch px-[calc(10%)] py-4">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex-1 flex flex-col items-center gap-5 p-8 rounded-2xl"
            >
              {/* Icon bubble */}
              <div className="w-14 h-14 flex items-center justify-center rounded-[10px] bg-white shadow-[0px_0px_11px_0px_rgba(183,231,255,0.3)]">
                {item.icon}
              </div>

              {/* Text */}
              <div className="flex flex-col gap-3 items-center text-center">
                <p className="text-[#0F2A3C] font-semibold text-2xl leading-9">
                  {item.title}
                </p>
                <div className="text-[#3F5563] text-base font-normal leading-6">
                  <p>{item.hoursLabel}</p>
                  <p>{item.hours}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ContactInfoStrip;
