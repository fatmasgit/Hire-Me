import React, { useEffect } from "react";
import HeroBackGround from "../components/HeroBackGround";
import { IoIosArrowForward } from "react-icons/io";
import { fetchJobs } from '../redux/slices/jobsSlice'
import { useDispatch, useSelector } from "react-redux";
import JobsAndFilters from "../components/jobs/JobsAndFilters";


export default function RandomJobsPage() {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.jobs);
  const { data, status, error } = useSelector((state) => state.jobs);



  useEffect(() => {

    dispatch(fetchJobs());
  }, [filters, dispatch]);


  const displayedData = data;



  return (
    <div className="bg-[#FAFAFA]">
      <HeroBackGround>
        <div className="flex h-full w-full flex-col items-center justify-center gap-y-3 leading-relaxed">
          <p className="font-PoppinsRegular text-white xs:text-base 
          sm:text-lg md:text-xl  lg:text-2xl  ">
            <span className="font-PoppinsMedium"> {displayedData?.length}</span> Jobs For Developers
          </p>
          <p className="flex items-center font-PoppinsRegular text-base text-white ">
            {" "}
            Home <IoIosArrowForward className="mx-2 md:mx-3  rtl:rotate-180 " /> Jobs
          </p>
        </div>
      </HeroBackGround>


      <JobsAndFilters data={displayedData} status={status} error={error} />
    </div>
  );
}