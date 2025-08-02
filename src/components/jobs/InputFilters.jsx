import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/slices/jobsSlice";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

export default function InputFilters({ }) {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const jobTypesValues = [
    { value: "Part Time", valueAr: "دوام جزئي" },
    { value: "Full Time", valueAr: "دوام كامل" },
  ];

  const workModeValues = [
    { value: "Hybrid", valueAr: "هجيني" },
    { value: "Remote", valueAr: "عن بُعد" },
    { value: "On Site", valueAr: "في الموقع" },
  ];

  const { workMode, jobType } = useSelector((state) => state.jobs.filters);
  const [jobTypesValue, setJobTypesValue] = useState("");
  const [workModeValue, setWorkModeValue] = useState("");

  // ✅ Read from URL and convert hyphens to spaces
  useEffect(() => {
    const jobTypeParam = searchParams.get("jobType");
    const workModeParam = searchParams.get("workMode");

    if (jobTypeParam) {
      const decoded = jobTypeParam.replace(/-/g, " ").toLowerCase();
      setJobTypesValue(decoded);
      dispatch(setFilter({ name: "jobType", value: decoded }));
    } else {
      setJobTypesValue("");
      dispatch(setFilter({ name: "jobType", value: "" }));
    }

    if (workModeParam) {
      const decoded = workModeParam.replace(/-/g, " ").toLowerCase();
      setWorkModeValue(decoded);
      dispatch(setFilter({ name: "workMode", value: decoded }));
    } else {
      setWorkModeValue("");
      dispatch(setFilter({ name: "workMode", value: "" }));
    }
  }, [searchParams]);

  // ✅ Reset local state when Redux is cleared externally
  useEffect(() => {
    if (
      workMode === "" &&
      jobType === "" &&
      (workModeValue !== "" || jobTypesValue !== "")
    ) {
      setJobTypesValue("");
      setWorkModeValue("");
    }
  }, [workMode, jobType]);

  // ✅ Handle toggle and update URL with hyphenated values
  const handleClick = (value, type) => {
    const lower = value.toLowerCase();
    const updatedParams = new URLSearchParams(searchParams.toString());

    if (type === "jobTypesValue") {
      const newValue = jobTypesValue === lower ? "" : lower;
      setJobTypesValue(newValue);
      dispatch(setFilter({ name: "jobType", value: newValue }));

      if (newValue) {
        updatedParams.set("jobType", newValue.replace(/\s+/g, "-"));
      } else {
        updatedParams.delete("jobType");
      }
    }

    if (type === "workModeValue") {
      const newValue = workModeValue === lower ? "" : lower;
      setWorkModeValue(newValue);
      dispatch(setFilter({ name: "workMode", value: newValue }));

      if (newValue) {
        updatedParams.set("workMode", newValue.replace(/\s+/g, "-"));
      } else {
        updatedParams.delete("workMode");
      }
    }

    setSearchParams(updatedParams);
  };

  return (
    <div className="ms-1.5 flex w-full flex-col gap-y-4 bg-[#FAFAFA] py-3">
      <div className="flex w-full justify-start gap-x-2 gap-y-2 xs:flex-wrap">
        {/* Job Types */}
        {jobTypesValues.map((job, index) => (
          <button
            key={index}
            type="button"
            className={`rounded-md !border-[1px] !border-solid h-[2.2rem] px-3
              ltr:font-PoppinsMedium rtl:font-TajawalMedium xs:text-xs lg:text-sm 
              ${jobTypesValue === job.value.toLowerCase()
                ? "bg-[#3B235D] text-white border-[#3B235D]"
                : "bg-white text-[#3B235D] border-[#3B235D]"
              }`}
            onClick={() => handleClick(job.value, "jobTypesValue")}
          >
            {i18n.dir(i18n.language) === "rtl" ? job.valueAr : job.value}
          </button>
        ))}

        {/* Work Modes */}
        {workModeValues.map((mode, index) => (
          <button
            key={index}
            type="button"
            className={`rounded-md !border-[1px] !border-solid h-[2.2rem] px-3
              ltr:font-PoppinsMedium rtl:font-TajawalMedium xs:text-xs lg:text-sm 
              ${workModeValue === mode.value.toLowerCase()
                ? "bg-[#3B235D] text-white border-[#3B235D]"
                : "bg-white text-[#3B235D] border-[#3B235D]"
              }`}
            onClick={() => handleClick(mode.value, "workModeValue")}
          >
            {i18n.dir(i18n.language) === "rtl" ? mode.valueAr : mode.value}
          </button>
        ))}
      </div>
    </div>
  );
}
