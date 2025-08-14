import React from "react";
import HeroBackGround from "../components/shared/HeroBackGround";
import { IoIosArrowForward } from "react-icons/io";
import CompanyData from "../components/companies/CompanyData";
import { useTranslation } from "react-i18next";


export default function CompanyDetailsPage() {
  const { t, i18n } = useTranslation();
  return (
    <div className="bg-[#FAFAFA]">
      <HeroBackGround>
        <div className="flex h-full w-full flex-col items-center justify-center gap-y-3">
          <p className="flex items-center font-PoppinsRegular rtl:font-TajawalRegular text-base text-white">
            {" "}
            {t("home")} <IoIosArrowForward className="xs:mx-2 md:mx-3  rtl:rotate-180" />  {t("Company Details")}
          </p>
        </div>
      </HeroBackGround>



      <hr className="mt-4 text-transparent" />
      {/* jobs section  */}
      <div className="w-full bg-[#FAFAFA]">
        {/* screens */}
        <div className="mx-auto flex xs:w-[90%] xs:flex-col lg:w-[85%] lg:flex-row xl:w-[78%]">
          {/* job card */}
          <div className="bg-[#FAFAFA] xs:w-full lg:w-[63%]">
            <CompanyData />
          </div>


        </div>
      </div>
    </div>
  );
}
