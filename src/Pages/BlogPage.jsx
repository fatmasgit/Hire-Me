import React from "react";
import HeroBackGround from "../components/HeroBackGround";
import { IoIosArrowForward } from "react-icons/io";
import BlogData from "../components/Blog/blogData";
import { useTranslation } from "react-i18next";

export default function BlogPage() {
  const { t, i18n } = useTranslation();

  return (
    <div className="bg-[#FAFAFA]">
      <HeroBackGround>
        <div className="flex h-full w-full flex-col items-center justify-center gap-y-3">
          <p className="flex items-center font-PoppinsRegular rtl:font-TajawalRegular text-[1.1rem] text-white">
            {t("home")}
            <IoIosArrowForward className="xs:mx-2 md:mx-3 rtl:rotate-180" />
            {t("blog")}
          </p>
        </div>
      </HeroBackGround>


      {/* jobs section */}
      <hr className="bg-[#FAFAFA] pt-5 text-transparent" />

      <div className="w-full bg-[#FAFAFA]">
        {/* screens */}
        <div className="mx-auto flex xs:w-[90%] xs:flex-col lg:w-[85%] lg:flex-row xl:w-[78%]">
          {/* job card */}
          <div className="bg-[#FAFAFA] xs:w-full lg:w-[63%]">
            <BlogData />
          </div>


        </div>
      </div>
    </div>
  );
}
