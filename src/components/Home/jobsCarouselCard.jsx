import React from 'react'
import { SlLocationPin } from "react-icons/sl";
import { FaLaptopCode } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';



export default function JobsCarouselCard({ job }) {
  const { t, i18n } = useTranslation();
  //console.log(i18n.dir(i18n.language))


  return (
    <div dir={i18n.dir(i18n.language)}
      className='w-11/12  mx-auto bg-[#EAE8ED]  p-2 
    flex  gap-x-2   rounded-lg '>

      {/** Card Img */}
      <div className='flex-1  '>
        <img
          className="w-full rounded-lg object-cover  h-20  md:h-24  "
          src={job.companyImage}
          alt="Company logo" />
      </div>



      {/*Card Text Data */}
      <div className='w-9/12    py-1 flex flex-col gap-y-2  leading-relaxed '>
        <p className=" leading-none text-base text-[#3B235D]  ltr:font-PoppinsSemiBold rtl:font-TajawalBold  ">
          {job?.jobTitle}
        </p>

        <span className=" leading-none text-base text-[#3B235D]  ltr:font-PoppinsMedium rtl:font-TajawalMedium truncate pe-4">
          { job?.jobSkills ?  job?.jobSkills.map((skill, index) => (
            <span key={index}>
              {skill}
              {index < job?.jobSkills.length - 1 && ", "}
            </span>
          )) : '' }
        </span>



        <p className="text-sm text-[#444444]  ltr:font-PoppinsMedium rtl:font-TajawalMedium">
          Posted 2 Days Ago
          <span className="">• {job?.jobType} </span>{" "}
        </p>


        <div className=" flex gap-x-1">
          <SlLocationPin size={20} />
          <p className="text-sm text-[#444444]  ltr:font-PoppinsRegular rtl:font-TajawalRegular">
            {job?.jobLocation.country} , {job?.jobLocation.city}
          </p>
        </div>




        <div className=" flex gap-x-1">
          <FaLaptopCode size={20} />
          <p className="text-sm text-[#444444]  ltr:font-PoppinsRegular rtl:font-TajawalRegular">
            {job?.workMode}
          </p>
        </div>



        <p className="text-base text-[#444444]  ltr:font-PoppinsMedium rtl:font-TajawalMedium mb-1">
          {job?.salaryRange?.min} - {job?.salaryRange?.max}
        </p>

        <Link
          to={`/jobs/${job?.id}/${job?.jobTitle.replace(/\s+/g, "_")}`}
          className="w-full no-underline"
        >
          <button className=' text-sm text-[#3B235D] bg-[#FFFFFF] ltr:font-PoppinsMedium rtl:font-TajawalMedium
          rounded-md    w-11/12 py-1  border-[1px]  border-solid  border-[#3B235D] '>        {t("View Job")} </button>
        </Link>
      </div>

    </div>
  )
}
