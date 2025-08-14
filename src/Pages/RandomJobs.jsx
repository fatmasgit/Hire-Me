import React, { useEffect } from "react";
import HeroBackGround from "../components/HeroBackGround";
import { IoIosArrowForward } from "react-icons/io";
import { fetchJobs } from "../redux/slices/jobsSlice";
import { useDispatch, useSelector } from "react-redux";
import JobsAndFilters from "../components/jobs/JobsAndFilters";
import { useTranslation } from "react-i18next";

export default function RandomJobsPage() {
  const { t } = useTranslation();
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
          <p className="font-PoppinsRegular rtl:font-TajawalRegular text-white xs:text-base sm:text-lg md:text-xl lg:text-2xl">
            <span className="font-PoppinsMedium rtl:font-TajawalBold">{displayedData?.length + 1}</span>{" "}
            {t("jobsForDevelopers")}
          </p>
          <p className="flex items-center font-PoppinsRegular rtl:font-TajawalRegular text-base text-white">
            {t("home")}
            <IoIosArrowForward className="mx-2 md:mx-3 rtl:rotate-180" />
            {t("jobs")}
          </p>
        </div>
      </HeroBackGround>

      <JobsAndFilters data={displayedData} status={status} error={error} />
    </div>
  );
}
