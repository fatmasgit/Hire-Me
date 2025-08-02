import React from "react";
import HeroBackGround from "../components/HeroBackGround";
import { IoIosArrowForward } from "react-icons/io";
import LocationsFilter from "../components/jobs/LocationsFilter";
import SkillsFilter from "../components/jobs/SkillsFillter";
import TopRatedCarousel from "../components/jobs/TopRatedJobsCrousel";
import CompanyData from "../components/companies/CompanyData";

export default function CompanyDetailsPage() {
  return (
    <div className="bg-[#FAFAFA]">
      <HeroBackGround>
        <div className="flex h-full w-full flex-col items-center justify-center gap-y-3">
          <p className="flex items-center font-PoppinsRegular text-base text-white">
            {" "}
            Home <IoIosArrowForward className="xs:mx-2 md:mx-3  rtl:rotate-180" /> Company Details
          </p>
        </div>
      </HeroBackGround>



      <hr className="mt-4 text-transparent" />
      {/* jobs section  */}
      <div className="w-full bg-[#FAFAFA]">
        {/* screens */}
        <div className="mx-auto flex xs:w-[90%] xs:flex-col lg:w-[85%] lg:flex-row xl:w-[78%]">
          {/* job card */}
          <div className="bg-[#FAFAFA] xs:w-full lg:w-[63%]">
            <CompanyData />
          </div>

       
        </div>
      </div>
    </div>
  );
}
