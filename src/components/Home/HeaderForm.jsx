import React, { useState, useEffect } from 'react';
import SelectCity from "./SelectCity";
import SelectMajor from "./SelectMajor";
import { useTranslation } from "react-i18next";
import { useDispatch } from 'react-redux';
import { setFilter, resetFilters } from '../../redux/slices/jobsSlice';
import { useSearchParams, useNavigate } from 'react-router-dom';
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
      const cityObj = Cities.find(c => c.value.toLowerCase() === firstCity.toLowerCase());
      if (cityObj) {
        setselectedCity(cityObj);
        dispatch(setFilter({ name: "city", value: [cityObj.value] }));
      }
    }

    const categoryParam = searchParams.get("category");
    const decodedCategory = categoryParam?.replace(/-/g, " "); // convert `data-base` → `data base`

    if (decodedCategory) {
      const categoryObj = Categories.find(c => c.value === decodedCategory);
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

    setSearchParams(newParams); // internal React Router state
    navigate("/Search?" + newParams.toString().replace(/\+/g, "-")); // visible URL
  };

  return (
    <form
      className="flex flex-col justify-center gap-y-[0.6rem] 
      xs:w-[65%] sm:w-[40%] md:w-[35%] lg:w-[28%] xl:w-[24%] 2xl:w-[22%]"
      onSubmit={handleSubmit}
    >
      <input
        className="outline-none placeholder:text-[#808184] 
        xs:h-[2.3rem] sm:h-[2.5rem] w-full rounded-md px-3 xs:text-xs sm:text-sm  
        rtl:font-TajawalMedium ltr:font-PoppinsRegular"
        placeholder={t("What Are You Looking For ?")}
      />

      <SelectCity setselectedCity={setselectedCity} selectedCity={selectedCity} />
      <SelectMajor setselectedMajor={setselectedMajor} selectedMajor={selectedMajor} />

      <button
        type="submit"
        className="bg-[#3B235D] w-full text-white xs:h-[2.2rem] rounded-md 
        xs:text-sm xs:tracking-[1px] sm:text-base rtl:font-TajawalRegular ltr:font-PoppinsRegular"
      >
        {t("Search")}
      </button>
    </form>
  );
}
