import React from "react";
import HeroBackGround from "../components/HeroBackGround";
import { IoIosArrowForward } from "react-icons/io";
import AboutUs from "../components/AboutUs/AboutUs";
import { useTranslation } from "react-i18next";

export default function AboutUsPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-[#FAFAFA]">
      <HeroBackGround>
        <div className="flex h-full w-full flex-col items-center justify-center gap-y-3">
          <p className="flex items-center font-PoppinsRegular rtl:font-TajawalRegular text-[1.1rem] text-white">
            {t("home")}
            <IoIosArrowForward className="xs:mx-2 md:mx-3 rtl:rotate-180" />
            {t("aboutUs")}
          </p>
        </div>
      </HeroBackGround>

      {/* about us content */}
      <hr className="bg-[#FAFAFA] pt-5 text-transparent" />

      <AboutUs />
    </div>
  );
}
