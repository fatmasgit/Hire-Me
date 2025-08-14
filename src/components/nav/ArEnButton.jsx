import React from "react";
import { useTranslation } from "react-i18next";

export default function LangButton() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = i18n.language.includes("en") ? "ar" : "en"; 
    i18n.changeLanguage(newLanguage);

    // Update the direction attribute on the HTML element
    document.documentElement.setAttribute("dir", newLanguage === "ar" ? "rtl" : "ltr");
  };

  const isEnglish = i18n.language.includes("en");

  return (
    <button
      onClick={toggleLanguage}
      className="block min-w-[5rem]    rounded-md border-[1px] border-[#3B235D] 
       h-[1.8rem] xl:h-[2rem]"
    >
      {isEnglish ? (
        <p className="  font-TajawalMedium text-xs  xl:text-sm">العربية</p>
      ) : (
        <p className="font-PoppinsMedium  text-xs  xl:text-sm">English</p>
      )}
    </button>
  );
}
