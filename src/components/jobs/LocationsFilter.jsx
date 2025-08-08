import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../../redux/slices/jobsSlice";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

export default function LocationsFilter({ }) {
  const locationButtons = [
    { value: "Cairo", arabic: "القاهرة" },
    { value: "Giza", arabic: "الجيزة" },
    { value: "Alexandria", arabic: "الإسكندرية" },
    { value: "Ismailia", arabic: "الإسماعيلية" },
    { value: "Mansoura", arabic: "المنصورة" },
  ];

  const { t } = useTranslation();
  const [filterValue, setFilterValue] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // ✅ Clean %2C from the URL and replace it with commas
  const updateCleanUrl = (params) => {
    const raw = params.toString();
    const cleaned = raw.replace(/%2C/g, ",");
    const newUrl = `${window.location.pathname}?${cleaned}`;
    window.history.replaceState(null, "", newUrl);
  };

  // ✅ Sync UI and Redux state when URL changes
  useEffect(() => {
    const citiesParam = searchParams.get("cities");
    const parsedCities = citiesParam
      ? citiesParam.split(",").map((city) => city.trim().toLowerCase())
      : [];

    const uniqueCities = [...new Set(parsedCities)];
    setFilterValue(uniqueCities);
    dispatch(setFilter({ name: "city", value: uniqueCities }));
  }, [searchParams]);

  // ✅ Handle city filter toggle
  const handleButtonClick = (value) => {

    const lowerCaseValue = value.toLowerCase();

    const newFilterValue = filterValue.includes(lowerCaseValue)
      ? filterValue.filter((item) => item !== lowerCaseValue)
      : [...filterValue, lowerCaseValue];

    const updatedParams = new URLSearchParams(searchParams.toString());

    if (newFilterValue.length === 0) {
      updatedParams.delete("cities");
    } else {
      updatedParams.set("cities", newFilterValue.join(","));
    }

    setSearchParams(updatedParams);
    updateCleanUrl(updatedParams);
  };

  // ✅ Clear all cities
  const clearFilter = () => {
    setFilterValue([]);
    dispatch(setFilter({ name: "city", value: [] }));

    const updatedParams = new URLSearchParams(searchParams.toString());
    updatedParams.delete("cities");

    setSearchParams(updatedParams, { replace: true });
    updateCleanUrl(updatedParams);
  };

  return (
    <div className="mx-auto flex h-fit flex-col items-center justify-center gap-y-2 rounded-lg border-[1px] border-[#c0bcbc] bg-white py-3 xs:w-full md:w-[47%] lg:w-full">
      <p className="my-1 xs:text-sm xl:text-base">
        <span className="font-PoppinsSemiBold xl:text-base mx-1 ltr:font-PoppinsMedium rtl:font-TajawalMedium">
          {t("Jobs By Location")}
        </span>
      </p>

      <button
        onClick={clearFilter}
        className="mx-auto w-11/12 rounded-md border-[1px] border-[#3B235D] 
        ltr:font-PoppinsMedium rtl:font-TajawalMedium xs:h-9 xl:h-10 
        xs:text-sm xl:text-base bg-white text-[#3B235D]"
      >
        {t("clearFilters")}
      </button>

      {(showAll ? locationButtons : locationButtons.slice(0, 3)).map((button) => {
        const isActive = filterValue.includes(button.value.toLowerCase());

        return (
          <button
            key={button.value}
            onClick={() => handleButtonClick(button.value)}
            className={`mx-auto w-11/12 rounded-md border-[1px] border-[#3B235D] 
              ltr:font-PoppinsMedium rtl:font-TajawalMedium transition-all duration-300 
              xs:h-9 xl:h-10 xs:text-sm xl:text-base ${isActive ? "bg-[#3B235D] text-white" : "bg-white text-[#3B235D]"
              }`}
          >
            <span className="ltr:hidden rtl:block">{button.arabic}</span>
            <span className="rtl:hidden ltr:block">{button.value}</span>
          </button>
        );
      })}

      <button
        onClick={() => setShowAll(!showAll)}
        className="mx-auto w-11/12 rounded-md border-[1px] border-[#3B235D] 
        bg-white ltr:font-PoppinsMedium rtl:font-TajawalMedium text-[#3B235D] 
        xs:h-9 xs:text-[0.9rem] xl:h-10 xl:text-[1rem]"
      >
        {showAll ? t("showLess") : t("showMore")}
      </button>
    </div>
  );
}
