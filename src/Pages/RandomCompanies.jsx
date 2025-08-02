import React, { useState } from "react";
import HeroBackGround from "../components/HeroBackGround";
import { IoIosArrowForward } from "react-icons/io";
import TopRatedCarousel from "../components/jobs/TopRatedJobsCrousel";
import CompaniesSection from "../components/companies/CompaniesSection";
import { useTranslation } from "react-i18next";

export default function JobDetailsPage() {
  const { t, i18n } = useTranslation();

  return (
    <div className="bg-[#FAFAFA]">
      {/* <input className="w-[200px]  border-[2px] border-red-600"  value={test}   onChange={(e)=>settest(e.target.value) }/> */}

      <HeroBackGround>
        <div className="flex h-full w-full flex-col items-center justify-center gap-y-3">
        
          <p className="flex items-center font-PoppinsRegular text-base text-white ">
            {" "}
            Home <IoIosArrowForward className="mx-2 md:mx-3  rtl:rotate-180 " /> Companies
          </p>
        </div>
      </HeroBackGround>



      {/*   */}
      <hr className="pt-4 text-transparent" />

      
      {/* jobs section  */}
      <div className="w-full h-fit bg-[#FAFAFA]">
        {/* screens */}
        <div className="mx-auto flex xs:w-[90%] xs:flex-col lg:w-[85%]  lg:flex-row xl:w-[78%]">
          {/* job card */}
          <div className="bg-[#FAFAFA] xs:w-full lg:w-[63%]">
            <CompaniesSection />
          </div>

        </div>
      </div>
    </div>
  );
}
