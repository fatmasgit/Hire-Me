import React, { useState, useEffect } from "react";
import SelectCity from "./SelectCity";
import SelectMajor from "./SelectMajor";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setFilter, resetFilters } from "../../redux/slices/jobsSlice";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Cities, Categories } from "../../utils/filters";

export default function HeaderForm() {
  const { t, i18n } = useTranslation();
  const direction = i18n.dir(i18n.language);
  const [selectedCity, setselectedCity] = useState("");
  const [selectedMajor, setselectedMajor] = useState("");
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const citiesParam = searchParams.get("cities");
    const firstCity = citiesParam?.split(",")[0];

    if (firstCity) {
      const cityObj = Cities.find(
        (c) => c.value.toLowerCase() === firstCity.toLowerCase(),
      );
      if (cityObj) {
        setselectedCity(cityObj);
        dispatch(setFilter({ name: "city", value: [cityObj.value] }));
      }
    }

    const categoryParam = searchParams.get("category");
    const decodedCategory = categoryParam?.replace(/-/g, " ");

    if (decodedCategory) {
      const categoryObj = Categories.find((c) => c.value === decodedCategory);
      if (categoryObj) {
        setselectedMajor(categoryObj);
        dispatch(setFilter({ name: "category", value: categoryObj.value }));
      }
    }
  }, [dispatch, searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const city = selectedCity?.value?.toLowerCase() || "";
    const category = selectedMajor?.value || "";

    dispatch(resetFilters());
    dispatch(setFilter({ name: "city", value: [city] }));
    dispatch(setFilter({ name: "category", value: category }));

    const newParams = new URLSearchParams();
    if (city) newParams.set("cities", city);
    if (category) newParams.set("category", category);

    setSearchParams(newParams);
    navigate("/Search?" + newParams.toString().replace(/\+/g, "-"));
  };

  return (
    <form
      className="flex flex-col justify-center gap-y-2 xs:w-2/3 sm:w-2/5 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-[22%]"
      onSubmit={handleSubmit}
    >
      <input
        className="w-full rounded-md px-3 outline-none placeholder:text-[#808184] xs:h-9 xs:text-xs sm:h-10 sm:text-sm ltr:font-PoppinsRegular rtl:font-TajawalMedium"
        placeholder={t("What Are You Looking For ?")}
      />

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
        <span className="absolute inset-0 z-[-1] h-full w-0 bg-gradient-to-r  from-[#1E102F] to-[#3B235D] transition-all duration-500 ease-in-out group-hover:w-full"></span>
        <span className="relative z-0 group-hover:text-white">
          {t("Search")}
        </span>
      </button>
    </form>
  );
}
