import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Company({ companyInfo }) {
  const { t, i18n } = useTranslation();
  const direction = i18n.dir(i18n.language);

  return (
    <div
      dir={direction}
      className="mx-2 flex flex-col overflow-hidden rounded-lg border-[0.5px] border-solid bg-[white]
       shadow-md xs:h-[16rem]  md:w-[92%] lg:w-[90%]   "
    // Add the onClick event to handle the click
    >
      {/* Image Section */}
      <div className="w-full  border-b">
        <img
          className="w-full object-cover xs:h-[9rem] "
          src={companyInfo?.image}

        />
      </div>

      {/* Text Section */}
      <div className="mb-[0.5rem] ms-3 mt-[0.7rem] flex flex-col">
        <p className="max-w-[85%] truncate text-start font-PoppinsSemiBold text-[#3B235D] xs:text-[1.1rem] rtl:self-start">
          {companyInfo?.name}
        </p>
        <div className="mb-2 mt-2 flex gap-x-1">
          <img
            className="mr-[0.3rem] self-center object-contain"
            src="/assets/icons/loc.png"
            alt="location"
          />
          <p className="font-PoppinsRegular text-[#444444] xs:text-[1rem]">
            {companyInfo.country} , {companyInfo.city}
          </p>
        </div>
        <Link
          to={`/Companies/${companyInfo?.id}/${companyInfo?.name.replace(/\s+/g, "_")}`}
          className="!no-underline"
        >
          <div className="flex  cursor-pointer "   >
            <p className="font-PoppinsSemiBold text-[#3B235D] xs:text-[1rem]">
              {companyInfo.jobs} {t("jobs")}
            </p>
            <img
              src="/assets/icons/arrow.png"
              className="self-center object-contain xs:ms-[0.6rem] rtl:rotate-180"
              alt="arrow"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
