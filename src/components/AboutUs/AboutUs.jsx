import React from "react";
import { useTranslation } from "react-i18next";
import { CiUser, CiHeadphones, CiMedal, CiStar } from "react-icons/ci";
import { SlDiamond } from "react-icons/sl";
import { RxRocket } from "react-icons/rx";
import { FaHandsHelping } from "react-icons/fa";
// images
import picOne from "./who are we.jpg";
import picThree from "./all.jpg";
import emp1 from "./employee2.jpg";
import emp2 from "./employee1.jpg";
import emp3 from "./employee4.jpg";
import emp4 from "./employee3.jpg";

export default function AboutUs() {
  const { t } = useTranslation();

  const cardsData = [
    { icon: <CiUser color="#3B235D" size={30} />, title: t("Expert Technicians"), description: t("Expert Technicians Description") },
    { icon: <FaHandsHelping color="#3B235D" size={28} />, title: t("Professional Service"), description: t("Professional Service Description") },
    { icon: <CiHeadphones color="#3B235D" size={30} />, title: t("Great Support"), description: t("Great Support Description") },
    { icon: <RxRocket color="#3B235D" size={30} />, title: t("Technical Skills"), description: t("Technical Skills Description") },
    { icon: <SlDiamond color="#3B235D" size={28} />, title: t("Highly Recommended"), description: t("Highly Recommended Description") },
    { icon: <CiStar color="#3B235D" size={30} />, title: t("Positive Reviews"), description: t("Positive Reviews Description") },
  ];

  const teamMembers = [
    { img: emp1, name: t("Lina Code"), role: t("Managing Director (Sales)") },
    { img: emp2, name: t("Leo Stack"), role: t("Creative Art Director (Project)") },
    { img: emp3, name: t("Mia Node"), role: t("Senior Core Developer") },
    { img: emp4, name: t("Max Dev"), role: t("Creative Content Developer") },
  ];

  return (
    <div className="w-full bg-[#FAFAFA]">
      <p className="!mb-0 text-center font-PoppinsSemiBold text-base text-[#000000] md:text-lg">
        {t("Why Choose Us")}
      </p>
      <p className="max-w-4/5 mx-auto !mt-0 mb-4 text-center font-PoppinsRegular text-xs text-[#000000] md:text-[1rem]">
        {t("Who are in extremely love with eco friendly system")}
      </p>

      {/* Cards */}
      <div className="smallScreens:w-[70%] mx-auto flex flex-row flex-wrap justify-center gap-x-4 gap-y-4 pb-5 xs:w-5/6 md:w-5/6">
        {cardsData.map((card, index) => (
          <div key={index} className="flex flex-col justify-center gap-y-2 rounded-md bg-[#EAE8ED] px-3 xs:h-40 sm:w-4/5 md:w-[48%] lg:w-[32%] xl:h-36">
            <div className="flex items-end gap-x-2 text-[#444444]">
              {card.icon}
              <p className="font-PoppinsSemiBold text-[1rem]">{card.title}</p>
            </div>
            <p className="font-PoppinsRegular text-sm text-[#444444]">
              {card.description}
            </p>
          </div>
        ))}
      </div>

      {/* Who/What We Are */}
      <div className="mx-auto flex h-fit w-[82%] items-center justify-center gap-x-5 gap-y-[2.4rem] py-5 xs:flex-col md:flex-row">
        <div className="flex flex-col xs:w-11/12 md:w-[48%]">
          <img src={picOne} className="w-full rounded-lg object-cover" />
          <p className="ms-2 mt-2 font-PoppinsSemiBold text-lg">{t("Who we are")}</p>
          <p className="ms-2 font-PoppinsRegular text-sm leading-relaxed">
            {t("Who we are Description")}
          </p>
        </div>
        <div className="flex flex-col xs:w-11/12 md:w-[48%]">
          <img src={picThree} className="w-full rounded-lg object-cover" />
          <p className="ms-2 mt-2 font-PoppinsSemiBold text-lg">{t("What we do")}</p>
          <p className="ms-2 font-PoppinsRegular text-sm leading-relaxed">
            {t("What we do Description")}
          </p>
        </div>
      </div>

      <hr className="invisible bg-[#FAFAFA] pt-5 text-transparent" />

      {/* Meet Our Team */}
      <p className="!mb-0 text-center font-PoppinsSemiBold text-base text-[#000000] md:text-lg">
        {t("Experienced Mentor Team")}
      </p>
      <p className="max-w-4/5 mx-auto !mt-0 mb-4 text-center font-PoppinsRegular text-xs text-[#000000] md:text-[1rem]">
        {t("Who are in extremely love with eco friendly system")}
      </p>

      <div className="mx-auto flex h-fit w-5/6 flex-row flex-wrap justify-center gap-x-4 gap-y-[2.2rem] bg-[#FAFAFA] pb-5">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col xs:w-2/3 md:w-2/5 lg:w-1/5">
            <img src={member.img} className="h-[15.5rem] w-full rounded-lg object-cover" />
            <p className="ms-1 mt-2 font-PoppinsSemiBold text-[1rem]">{member.name}</p>
            <p className="font-PoppinsRegular text-sm">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
