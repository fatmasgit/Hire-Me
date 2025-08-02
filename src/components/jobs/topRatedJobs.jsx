import React from "react";
import { useTranslation } from "react-i18next";
import { FaLaptopCode } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";

export default function TopRatedJobs({ job }) {
  const { i18n } = useTranslation();

  return (
    <div
      dir={i18n.dir(i18n.language)}
      className="mx-auto flex h-fit w-full flex-col items-start rounded-md border-[1px] 
      border-[#cac6c6] bg-white p-3 pb-4 shadow-md"
    >
      <p className="my-2 self-center font-PoppinsSemiBold text-[1rem] text-[#444444]">
        Top rated jobs posts{" "}
      </p>

      <img
        className="max-h-[11rem] w-full rounded-md object-cover"
        src={job?.companyImage}
      />
      <p className="mt-2 self-center font-PoppinsSemiBold text-[1rem] text-[#3B235D]">
      {job?.jobTitle}{" "}
      </p>
      <p className="self-center text-center font-PoppinsSemiBold text-[0.9em] text-[#3B235D]">
      { job?.jobSkills ?  job?.jobSkills.map((skill, index) => (
            <span key={index}>
              {skill}
              {index < job?.jobSkills.length - 1 && ", "}
            </span>
          )) : '' }
      </p>

      <div className="mx-auto mb-1 mt-2.5 flex w-full items-start justify-center gap-x-1">
      <SlLocationPin size={20} />
       <p className="font-PoppinsRegular text-[#444444] xs:tesxt-sm  md:text-base ">
       {job?.jobLocation.country} , {job?.jobLocation.city}
        </p>
      </div>

      {/*3 reasons */}

      <hr className="my-2 w-[90%] self-center border-[1px] border-black" />

      <p className="my-2 mb-2 font-PoppinsSemiBold text-[#444444] xs:tesxt-sm  md:text-base ">
        Top 3 reasons to join us{" "}
      </p>
      <p className="font-PoppinsRegular text-[#444444] xs:tesxt-sm  md:text-base ">
        • 13th-month salary. Dedication bonus goes up to 40%{" "}
      </p>
      <p className="font-PoppinsRegular text-[#444444] xs:tesxt-sm  md:text-base ">
        • Premium healthcare insurance{" "}
      </p>
      <p className="mb-2 font-PoppinsRegular text-[#444444] xs:tesxt-sm  md:text-base ">
        • Teambuilding trips, training events{" "}
      </p>

      <hr className="my-2 w-[90%] self-center border-[1px] border-black" />

      {/*hr2 */}
      <p className="mb-1 mt-1 font-PoppinsRegular text-[#444444] xs:text-base  md:text-base ">
        Posted 2 Days Ago{" "}
        <span className="font-PoppinsSemiBold">• {job?.jobType}</span>{" "}
      </p>

  <div className=" flex gap-x-2 my-1">
             <FaLaptopCode  size={20}  />
              <p className="text-sm text-[#444444]  ltr:font-PoppinsRegular rtl:font-TajawalRegular">
              {job?.workMode}
              </p>
            </div>

      <p className="mb-1 font-PoppinsSemiBold text-[#444444] xs:text-base  md:text-[1rem]">
      {job?.salaryRange?.min} - {job?.salaryRange?.max}
      </p>
      <button className="mx-auto my-1 h-[2.2rem] w-[95%] rounded-md border-[1px] border-[#3B235D] bg-white font-PoppinsMedium text-base  text-[#3B235D]">
        Apply Now
      </button>
    </div>
  );
}
