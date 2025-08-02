import React from "react";
import HeroBackGround from "../components/HeroBackGround";
import { IoIosArrowForward } from "react-icons/io";
import BlogData from "../components/Blog/blogData";

export default function BlogPage() {
  return (
    <div className="bg-[#FAFAFA]">
      <HeroBackGround>
        <div className="flex h-full w-full flex-col items-center justify-center gap-y-3">
          <p className="font-PoppinsRegular text-white xs:text-[1.3rem] 
           md:text-[1.9rem] lg:text-[2.5rem]">
            64 Internships For Developers
          </p>
          <p className="flex items-center font-PoppinsRegular text-[1.1rem] text-white">
            {" "}
            Home <IoIosArrowForward className="xs:mx-2 md:mx-3" /> Blog
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
