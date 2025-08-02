import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { setFilter, setJobsPerCompany } from "../../redux/slices/jobsSlice";
import { useTranslation } from "react-i18next";

export default function SkillsFilter({ }) {
  const filterButtons = [
    { value: ".NET" },
    { value: "Python" },
    { value: "Android" },
    { value: "SQL" },
    { value: "JavaScript" },
    { value: "Flutter" },
  ];

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterValue, setFilterValue] = useState([]);

  // ✅ Clean %2C from the URL and replace with ","
  const updateCleanUrl = (params) => {
    const raw = params.toString();
    const cleaned = raw.replace(/%2C/g, ",");
    const newUrl = `${window.location.pathname}?${cleaned}`;
    window.history.replaceState(null, "", newUrl);
  };

  // ✅ Sync state and Redux from URL
  useEffect(() => {
    const skillsParam = searchParams.get("skills");
    const parsedSkills = skillsParam
      ? skillsParam.split(",").map((s) => s.trim().toLowerCase())
      : [];

    const uniqueSkills = [...new Set(parsedSkills)];
    setFilterValue(uniqueSkills);
    dispatch(setFilter({ name: "skill", value: uniqueSkills }));
  }, [searchParams]);

  // ✅ Cleanup on unmount
  useEffect(() => {
    return () => {
      dispatch(setFilter({ name: "skill", value: [] }));
      dispatch(setJobsPerCompany(null));
    };
  }, [dispatch]);

  // ✅ Handle toggle
  const handleButtonClick = (value) => {
    const lowerCaseValue = value.toLowerCase();

    const newFilterValue = filterValue.includes(lowerCaseValue)
      ? filterValue.filter((item) => item !== lowerCaseValue)
      : [...filterValue, lowerCaseValue];

    setFilterValue(newFilterValue);
    dispatch(setFilter({ name: "skill", value: newFilterValue }));

    const updatedParams = new URLSearchParams(searchParams.toString());

    if (newFilterValue.length === 0) {
      updatedParams.delete("skills");
    } else {
      updatedParams.set("skills", newFilterValue.join(","));
    }

    // ✅ Use replace:true so filter steps don't stack in history
    setSearchParams(updatedParams);
    updateCleanUrl(updatedParams);
  };

  const clearFilter = () => {
    setFilterValue([]);
    dispatch(setFilter({ name: "skill", value: [] }));

    const updatedParams = new URLSearchParams(searchParams.toString());
    updatedParams.delete("skills");

    // ✅ Use replace:true
    setSearchParams(updatedParams, { replace: true });
    updateCleanUrl(updatedParams);
  };

  return (
    <div className="mx-auto flex h-fit flex-col items-center justify-center gap-y-2 rounded-lg border-[1px] border-[#c0bcbc] bg-white py-3 xs:w-full md:w-[47%] lg:w-full">
      <p className="my-1 xs:text-sm xl:text-base">
        <span className="ltr:font-PoppinsSemiBold rtl:font-TajawalMedium xl:text-base mx-1">
          {t("Jobs By Skill")}
        </span>
      </p>

      <button
        onClick={clearFilter}
        className="mx-auto w-[90%] rounded-md border-[1px] border-[#3B235D] ltr:font-PoppinsMedium rtl:font-TajawalMedium xs:h-[2.2rem] xl:h-[2.5rem] xs:text-sm xl:text-base bg-white text-[#3B235D]"
      >
        {t("clearFilters")}
      </button>

      {filterButtons.map((button) => {
        const isActive = filterValue.includes(button.value.toLowerCase());
        return (
          <button
            key={button.value}
            onClick={() => handleButtonClick(button.value)}
            className={`mx-auto w-[90%] rounded-md border-[1px] border-[#3B235D] font-PoppinsMedium transition-all duration-300 xs:h-[2.2rem] xl:h-[2.5rem] xs:text-sm xl:text-base ${isActive ? "bg-[#3B235D] text-white" : "bg-white text-[#3B235D]"
              }`}
          >
            {button.value}
          </button>
        );
      })}
    </div>
  );
}
