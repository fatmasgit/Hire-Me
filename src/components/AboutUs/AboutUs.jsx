import React from "react";
import { CiUser, CiHeadphones, CiMedal, CiStar } from "react-icons/ci";
import { SlDiamond } from "react-icons/sl";
import { RxRocket } from "react-icons/rx";
import { FaHandsHelping } from "react-icons/fa";
//images
import picOne from "./who are we.jpg";
import picThree from "./all.jpg";
////////

import emp1 from "./employee2.jpg";
import emp2 from "./employee1.jpg";
import emp3 from "./employee4.jpg";
import emp4 from "./employee3.jpg";

export default function AboutUs() {
  const cardsData = [
    { icon: <CiUser color="#3B235D" size={30} />, title: "Expert Technicians", description: "Usage of the Internet is becoming more common due to rapid advancement of technology and power." },
    { icon: <FaHandsHelping color="#3B235D" size={28} /> , title: "Professional Service", description: "Usage of the Internet is becoming more common due to rapid advancement of technology and power." },
    { icon: <CiHeadphones color="#3B235D" size={30} /> , title: "Great Support", description: "Usage of the Internet is becoming more common due to rapid advancement of technology and power." },
    { icon: <RxRocket color="#3B235D" size={30} /> , title: "Technical Skills", description: "Usage of the Internet is becoming more common due to rapid advancement of technology and power." },
    { icon: <SlDiamond color="#3B235D" size={28} /> , title: "Highly Recommended", description: "Usage of the Internet is becoming more common due to rapid advancement of technology and power." },
    { icon: <CiStar color="#3B235D" size={30} /> , title: "Positive Reviews", description: "Usage of the Internet is becoming more common due to rapid advancement of technology and power." },
  ];

  const teamMembers = [
    { img: emp1, name: "Lina Code", role: "Managing Director (Sales)" },
    { img: emp2, name: "Leo Stack", role: "Creative Art Director (Project)" },
    { img: emp3, name: "Mia Node", role: "Senior Core Developer" },
    { img: emp4, name: "Max Dev", role: "Creative Content Developer" }
  ];

  return (
    <div className="w-full bg-[#FAFAFA]">
      <p className="!mb-0 text-center font-PoppinsSemiBold text-[1.1rem] text-[#000000] md:text-[1.3rem]">
        Why Choose Us
      </p>
      <p className="mx-auto !mt-0 mb-4 max-w-[80%] text-center font-PoppinsRegular text-[0.8rem] text-[#000000] md:text-[1rem]">
        Who are in extremely love with eco friendly system.
      </p>

      {/*cards */}
      <div className=":bg-black mx-auto flex flex-row flex-wrap justify-center gap-x-4 gap-y-4 pb-5 xs:w-[85%] smallScreens:w-[70%] md:w-[85%]">
        {cardsData.map((card, index) => (
          <div key={index} className="flex flex-col justify-center gap-y-2 rounded-md
           bg-[#EAE8ED] px-3 xs:h-[9.5rem] sm:w-[80%] md:w-[48%] lg:w-[32%] xl:h-[8.5rem]">
            <div className="flex items-end gap-x-2 text-[#444444]">
              {card.icon}
              <p className="font-PoppinsSemiBold text-[1rem]">{card.title}</p>
            </div>
            <p className="font-PoppinsRegular text-[0.85rem] text-[#444444]">
              {card.description}
            </p>
          </div>
        ))}
      </div>

      {/*what/who are we */}
      <div className="mx-auto flex h-fit w-[82%] items-center justify-center gap-x-5 
      gap-y-[2.4rem] py-5 xs:flex-col md:flex-row ">
        <div className="flex flex-col xs:w-[90%] md:w-[48%]">
          <img src={picOne} className="w-full rounded-lg object-cover" />
          <p className="ms-2 mt-2 font-PoppinsSemiBold text-[1.2rem]">Who we are</p>
          <p className="ms-2 font-PoppinsRegular text-[0.9rem]  leading-relaxed">
            Computer users and programmers have become so accustomed to using Windows, even for the changing capabilities and the appearances of the graphical.
          </p>
        </div>

        <div className="flex flex-col xs:w-[90%] md:w-[48%]">
          <img src={picThree} className="w-full rounded-lg object-cover" />
          <p className="ms-2 mt-2 font-PoppinsSemiBold text-[1.2rem]">What we do</p>
          <p className="ms-2 font-PoppinsRegular text-[0.9rem]  leading-relaxed">
            Computer users and programmers have become so accustomed to using Windows, even for the changing capabilities and the appearances of the graphical.
          </p>
        </div>
      </div>

      <hr className="invisible bg-[#FAFAFA] pt-5 text-transparent" />

      {/* meet our team */}
      <p className="!mb-0 text-center font-PoppinsSemiBold text-[1.1rem] text-[#000000] md:text-[1.3rem]">
        Experienced Mentor Team
      </p>
      <p className="mx-auto !mt-0 mb-4 max-w-[80%] text-center font-PoppinsRegular text-[0.8rem] text-[#000000] md:text-[1rem]">
        Who are in extremely love with eco friendly system.
      </p>

      <div className="mx-auto flex h-fit w-[85%] flex-row flex-wrap justify-center gap-x-4 gap-y-[2.2rem] bg-[#FAFAFA] pb-5">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col xs:w-[70%] md:w-[37%] lg:w-[21%]">
            <img src={member.img} className="h-[15.5rem] w-full rounded-lg object-cover" />
            <p className="ms-1 mt-2 font-PoppinsSemiBold text-[1rem]">{member.name}</p>
            <p className="font-PoppinsRegular text-[0.9rem]">{member.role}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
