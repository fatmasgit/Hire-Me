import React from "react";
import { Link, useParams } from "react-router-dom";
import { SlLocationPin } from "react-icons/sl";

export default function JobCard({ job }) {
  const params = useParams();



  return (
    <div className="border-1 flex w-full rounded-lg bg-[#EAE8ED] px-1 ">
      
      {/*card img */}
      <div className="w-[32%] rounded-lg bg-[#EAE8ED] pt-3">
        <img
          className="mx-auto   xs:h-[5rem] sm:h-[6rem] w-[85%] rounded-md object-cover"
          src={job?.companyImage}
          alt="Company logo"
        />


        {/* location */}
        <div className="mx-auto mb-1 mt-3 flex items-start justify-center gap-x-1 xs:w-[60%] md:w-full">
         <SlLocationPin size={20} />

          <p className="font-PoppinsRegular text-[#444444] xs:text-xs  md:text-sm">
            {job?.jobLocation.country} , {job?.jobLocation.city}
          </p>
        </div>
      </div>


      {/* card text */}
      <div className="w-[65%] bg-[#EAE8ED] py-3 ps-1   ">
        <p className="font-PoppinsBold text-[#3B235D] xs:text-sm  md:text-base">
          {job?.jobTitle}{" "}
        </p>

        <p className="truncate font-PoppinsSemiBold text-[#3B235D] xs:text-xs sm:text-sm  pe-3">
        { job?.jobSkills ?  job?.jobSkills.map((skill, index) => (
            <span key={index}>
              {skill}
              {index < job?.jobSkills.length - 1 && ", "}
            </span>
          )) : '' }
        </p>

        <p className="my-1 font-PoppinsRegular xs:text-xs sm:text-sm ">
          Posted 2 Days Ago{" "}
          <span className="font-PoppinsSemiBold">• {job?.jobType}</span>{" "}
        </p>

        <p className="mb-2 font-PoppinsRegular xs:text-xs sm:text-sm ">
          From{" "}
          <span className="font-PoppinsSemiBold text-[#3B235D]">
            {job?.companyName}
          </span>{" "}
        </p>

        {/*hr */}
        <hr className="my-1 border-[1px] border-black" />

        <p className="my-2 mb-2 font-PoppinsSemiBold xs:text-xs sm:text-sm ">
          Top 3 reasons to join us{" "}
        </p>

        <p className="font-PoppinsRegular xs:text-xs sm:text-sm ">
          • 13th-month salary. Dedication bonus goes up to 40%{" "}
        </p>
        <p className="font-PoppinsRegular xs:text-xs sm:text-sm ">
          • Premium healthcare insurance{" "}
        </p>
        <p className="mb-2 font-PoppinsRegular xs:text-xs sm:text-sm ">
          • Teambuilding trips, training events{" "}
        </p>

        {/*hr */}
        <hr className="my-2 border-[1px] border-black" />
        <div className="flex gap-x-1">
          {/**         <img className=" object-contain" src="/assets/icons/job.png" /> */}
          <p className="font-PoppinsRegular text-[#444444] xs:text-sm  md:text-[1rem]">
            {job?.workMode}
          </p>
        </div>

        <div className=" flex w-full justify-between xs:flex-col xs:items-start md:flex-row
         md:items-center">
          <p className=" font-PoppinsSemiBold xs:text-sm  md:text-base">
            {job?.salaryRange?.min} - {job?.salaryRange?.max}
             {job?.salaryCurrency  ?  job?.salaryCurrency?.toUpperCase() : ' EGP'}
          </p>

          <Link
            to={`/jobs/${job?.id}/${job?.jobTitle.replace(/\s+/g, "_")}`}
            className="w-fit xs:self-end"
          >
            {!params.title && (
              <button className="mx-2 w-full rounded-md border-[1px] border-solid border-[#3B235D]
               bg-white font-PoppinsMedium text-[#3B235D] xs:mt-3 xs:h-[2rem] xs:w-[10rem] 
               xs:text-xs md:h-[2.3rem] md:w-[12.5rem] sm:text-sm  lg:mt-0">
                Applay Now
              </button>
            )}
          </Link>
        </div>
      </div>



    </div>
  );
}
