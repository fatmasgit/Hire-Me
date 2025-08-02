import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyJobs } from "../../redux/slices/companiesSlice";
import { LiaArrowCircleRightSolid } from "react-icons/lia";
import { GrUserWorker, GrLocation } from "react-icons/gr";
import { TbCirclesRelation } from "react-icons/tb";
import { TfiWorld } from "react-icons/tfi";
import { GoMail } from "react-icons/go";
import { SlPhone } from "react-icons/sl";
import { Link } from "react-router-dom";


export default function CompanyCard({ company, handleShowRelatedJobs }) {
  const dispatch = useDispatch();
  const { companiesWithJobs, loadingJobs, error } = useSelector((state) => state.companies);
  const relatedJobs = companiesWithJobs[company?.name] || [];


  //get a number of jobs for every company
  useEffect(() => {
    if (company?.name && !companiesWithJobs[company.name]) {
      // console.log('com', company.name)
      dispatch(fetchCompanyJobs(company.name));

    }
  }, [dispatch]);


  const handleFetchRelatedJobs = () => {
    if (company?.name) {
      dispatch(fetchCompanyJobs(company.name));
      handleShowRelatedJobs(company.name);
    }
  };



  //console.log(companiesWithJobs)

  if (loadingJobs) return <div>Loading jobs for {company?.name}...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="border-1 flex w-full rounded-lg bg-[#EAE8ED] px-1   ">

      <div className="w-[32%] rounded-lg bg-[#EAE8ED] pt-3">
        <img
          className="mx-auto xs:h-[5rem] sm:h-[6rem] w-[85%] rounded-md object-cover"
          src={company?.image}
          alt={`${company?.name} logo`}
        />

        <div className="mx-auto mb-1 mt-2.5 flex items-start justify-center gap-x-1 xs:w-[60%] md:w-full">
          <GrLocation size={23} />
          <p className="font-PoppinsRegular text-[#444444] xs:text-[0.8rem] md:text-sm">
            {company?.country}, {company?.city}
          </p>
        </div>
      </div>


      <div className="w-[65%] bg-[#EAE8ED] py-3 xs:ms-1 sm:ms-0 ">
        <p className="my-3 font-PoppinsBold text-[#3B235D] xs:text-base md:text-lg">
          {company?.name}
        </p>

        <div className="my-1 flex gap-x-2">
          <GrUserWorker size={22} />
          <p className="font-PoppinsRegular text-[#444444] xs:text-sm md:text-base">
            {company?.industry}
          </p>
        </div>

        {/*view related jobs */}
        <div className="my-1 flex gap-x-2   cursor-pointer items-center justify-start "
          onClick={handleFetchRelatedJobs}  >
          <TbCirclesRelation size={22} color='#3B235D' />
          <p className="  font-PoppinsMedium text-[#3B235D] xs:text-sm 
             md:text-base cursor-pointer text-nowrap truncate "
          >
            View related jobs ( {relatedJobs.length} )
          </p>
          <LiaArrowCircleRightSolid color='#3B235D' className="scale-75 -translate-x-2  md:-translate-x-1  md:scale-100" size={25} />
        </div>

        <hr className="my-2 border-[1px] border-black" />

        <div className="my-2 flex gap-x-2">
          <TfiWorld size={22} />
          <p className="font-PoppinsRegular text-[#444444] xs:text-sm md:text-base">
            {company?.website}
          </p>
        </div>

        <div className="my-2 flex gap-x-2">
          <GoMail size={22} />
          <p className="max-w-[90%] truncate font-PoppinsRegular text-[#444444] xs:text-sm md:text-base">
            {company?.email}
          </p>
        </div>

        <div className="my-2 flex gap-x-2">
          <SlPhone size={22} />
          <p className="font-PoppinsRegular text-[#444444] xs:text-sm md:text-base">
            {company?.phone}
          </p>
        </div>


        <Link
          to={`/Companies/${company?.id}/${company?.name.replace(/\s+/g, "_")}`}
          className="w-fit xs:self-end"
        >
          <button className="mt-2 w-full rounded-md border-[1px] border-solid border-[#3B235D] bg-white font-PoppinsMedium text-[#3B235D] xs:h-[2rem] xs:text-[0.8rem] md:h-[2.3rem] md:text-sm">
            View Company
          </button>
        </Link>
      </div>
    </div>
  );
}
