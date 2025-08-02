import React from "react";
import HeroBackGround from "../components/HeroBackGround";
import { IoIosArrowForward } from "react-icons/io";
import AboutUs from "../components/AboutUs/AboutUs";

export default function AboutUsPage() {
  return (
    <div className="bg-[#FAFAFA]">
      <HeroBackGround>
        <div className="flex h-full w-full flex-col items-center justify-center gap-y-3">
      
          <p className="flex items-center font-PoppinsRegular text-[1.1rem] text-white">
            {" "}
            Home <IoIosArrowForward className="xs:mx-2 md:mx-3" /> About Us
          </p>
        </div>
      </HeroBackGround>

      {/* about us content */}
      <hr className="bg-[#FAFAFA] pt-5 text-transparent" />

      <AboutUs />
    </div>
  );
}
