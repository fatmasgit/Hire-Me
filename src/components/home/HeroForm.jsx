import React, { useState, useEffect } from "react";
import SelectCity from "./SelectCity";
import SelectMajor from "./SelectMajor";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, resetFilters } from "../../redux/slices/jobsSlice";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Cities, Categories } from "../../utils/filters";
import { ReactTyped } from "react-typed";

export default function HeroForm() {
  const { filteredByQIds, status, error, allJobs } = useSelector(
    (state) => state.jobs
  );
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl"; // check if current language is RTL

  const [selectedCity, setselectedCity] = useState("");
  const [selectedMajor, setselectedMajor] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Load params on mount
  useEffect(() => {
    const citiesParam = searchParams.get("cities");
    if (citiesParam) {
      const firstCity = citiesParam.split(",")[0];
      const cityObj = Cities.find(
        (c) => c.value.toLowerCase() === firstCity.toLowerCase()
      );
      if (cityObj) {
        setselectedCity(cityObj);
        dispatch(
          setFilter({ name: "city", value: [cityObj.value.toLowerCase()] })
        );
      }
    }

    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      const decodedCategory = categoryParam.replace(/-/g, " ");
      const categoryObj = Categories.find((c) => c.value === decodedCategory);
      if (categoryObj) {
        setselectedMajor(categoryObj);
        dispatch(setFilter({ name: "category", value: categoryObj.value }));
      }
    }

    const qParam = searchParams.get("q");
    if (qParam !== null) {
      setSearchQuery(qParam);
      dispatch(setFilter({ name: "q", value: qParam.toLowerCase() }));
    }

    return () => {
      dispatch(resetFilters());
      setSearchQuery("");
      setselectedCity("");
      setselectedMajor("");
    };
  }, [dispatch]);

  // Reset if params are cleared
  useEffect(() => {
    if (
      !searchParams.get("cities") &&
      !searchParams.get("category") &&
      !searchParams.get("q")
    ) {
      setSearchQuery("");
      setselectedCity("");
      setselectedMajor("");
      dispatch(resetFilters());
    }
  }, [searchParams, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const city = selectedCity?.value?.toLowerCase() || "";
    const category = selectedMajor?.value || "";
    const qValueOriginal = searchQuery;
    const qValueLower = qValueOriginal.toLowerCase();

    dispatch(resetFilters());
    if (city) dispatch(setFilter({ name: "city", value: [city] }));
    if (category) dispatch(setFilter({ name: "category", value: category }));
    if (qValueOriginal) dispatch(setFilter({ name: "q", value: qValueLower }));

    const newParams = new URLSearchParams();
    if (city) newParams.set("cities", city);
    if (category) newParams.set("category", category);
    if (qValueOriginal) newParams.set("q", qValueOriginal);

    navigate("/Search?" + decodeURIComponent(newParams.toString()));
  };

  return (
    <form
      className="flex flex-col justify-center gap-y-2 xs:w-2/3 sm:w-2/5 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-[22%]"
      onSubmit={handleSubmit}
    >
      {/* Search input with ReactTyped placeholder */}
      <div className="relative w-full">
        <input
          type="text"
          autoCapitalize="off"
          spellCheck="false"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full rounded-md px-3 outline-none placeholder:text-[#808184] xs:h-9 xs:text-xs sm:h-10 sm:text-sm ltr:font-PoppinsRegular rtl:font-TajawalMedium`}
          placeholder=""
        />
        {!searchQuery && (
          <div
            className={`absolute top-1/2 -translate-y-1/2 pointer-events-none text-[#808184] xs:text-xs sm:text-sm ${isRTL ? "right-3 text-right" : "left-3 text-left"
              }`}
          >
            <ReactTyped
              strings={[
                t("What Are You Looking For ?"),
                t("Search for jobs..."),
                t("Search by title or skill..."),
                t("title: flutter developer"),
                t("skill: react"),
                t("skill: next"),
              ]}
              typeSpeed={50}
              backSpeed={30}
            //  loop
            />
          </div>
        )}
      </div>

      {/* City and Category dropdowns */}
      <SelectCity
        setselectedCity={setselectedCity}
        selectedCity={selectedCity}
      />
      <SelectMajor
        setselectedMajor={setselectedMajor}
        selectedMajor={selectedMajor}
      />

      <button
        type="submit"
        className="group relative z-0 inline-flex h-9 w-full items-center justify-center overflow-hidden rounded-md bg-[#3B235D] text-white transition duration-500 ease-in-out xs:h-9 xs:text-sm sm:h-10 sm:text-base ltr:font-PoppinsRegular rtl:font-TajawalRegular"
      >
        <span className="absolute inset-0 z-[-1] h-full w-0 bg-gradient-to-r from-[#1E102F] to-[#3B235D] transition-all duration-500 ease-in-out group-hover:w-full"></span>
        <span className="relative z-0 group-hover:text-white">
          {t("Search")}
        </span>
      </button>
    </form>
  );
}
