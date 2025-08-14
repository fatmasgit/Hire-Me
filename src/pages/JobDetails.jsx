import React, { useEffect } from "react";
import HeroBackGround from "../components/shared/HeroBackGround";
import { IoIosArrowForward } from "react-icons/io";
import JobCard from "../components/jobs/JobCard";
import JobData from "../components/jobs/JobData";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobById } from "../redux/slices/jobsSlice";
import { useTranslation } from "react-i18next";
import CircularLoader from "../components/shared/Loading";

export default function JobDetailsPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedJob, status, error } = useSelector((state) => state.jobs);

  const JobTitle = selectedJob?.jobTitle;

  useEffect(() => {
    if (id) {
      dispatch(fetchJobById(id));
    }
  }, [dispatch, id]);

  return (
    <div className="bg-[#FAFAFA]">
      {/* Hero Section Always Visible */}
      <HeroBackGround>
        <div className="flex h-full w-full flex-col items-center justify-center gap-y-1 lg:gap-y-2">
          {/* Job Title */}
          <p className="font-PoppinsRegular rtl:font-TajawalRegular text-white xs:text-base sm:text-lg md:text-xl lg:text-2xl">
            {t(JobTitle || "")}
          </p>

          {/* Breadcrumbs */}
          <p className="mt-2 flex items-center font-PoppinsRegular rtl:font-TajawalRegular text-base text-white md:text-lg">
            {t("home")}
            <IoIosArrowForward className="xs:mx-2 md:mx-3 rtl:rotate-180" />
            {t("Jobs")}
            <IoIosArrowForward className="xs:mx-2 md:mx-3 rtl:rotate-180" />
            {t("Job Details")}
          </p>
        </div>
      </HeroBackGround>

      <hr className="pt-4 text-transparent" />

      {/* Loader or Error directly under Hero */}
      {status === "loading" && (
        <div className="mt-8 text-center">
          <CircularLoader />
        </div>
      )}
      {error && (
        <div className="mt-8 text-center text-red-500">
          Error loading job details: {error}
        </div>
      )}

      {/* Only show job details if loaded & no error */}
      {status === "succeeded" && selectedJob && (
        <div className="w-full bg-[#FAFAFA]">
          <div className="mx-auto flex xs:w-[90%] xs:flex-col lg:w-[85%] lg:flex-row xl:w-[78%]">
            <div className="bg-[#FAFAFA] xs:w-full lg:w-[63%]">
              <JobCard job={selectedJob} />
              <JobData job={selectedJob} />
            </div>
          </div>
        </div>
      )}

      {/* No job found */}
      {status === "succeeded" && !selectedJob && !error && (
        <div className="mt-8 text-center">
          Job not found. Please check the URL or try again later.
        </div>
      )}
    </div>
  );
}
