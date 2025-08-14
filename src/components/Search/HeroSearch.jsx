import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import HeroForm from "../Home/HeroForm";
import { useTranslation } from "react-i18next";

export default function HeroSearch() {
  const { t } = useTranslation();
  return (
    <div className="h-[32rem] w-full bg-Hero bg-cover bg-no-repeat xs:bg-left">

      <div className="flex h-full w-full flex-col items-center justify-center gap-y-3 bg-overlay">
        <p className="font-PoppinsRegular rtl:font-TajawalRegular tracking-wider text-white xs:text-xl md:text-2xl xl:text-3xl">
          {t("searchResults")}
        </p>
        <p className="-mt-6 flex items-center font-PoppinsRegular rtl:font-TajawalRegular text-sm text-white md:text-base mb-4">
          {t("home")}{" "}
          <IoIosArrowForward className="xs:mx-2 md:mx-3 rtl:rotate-180" />{" "}
          {t("Search")}
        </p>

        {/* form start */}
        <HeroForm />
        {/* form end */}
      </div>
    </div>
  );
}
