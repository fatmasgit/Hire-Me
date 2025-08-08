import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { RiArrowRightDoubleLine } from "react-icons/ri";

export default function Company({ companyInfo }) {
  const { t, i18n } = useTranslation();
  const direction = i18n.dir(i18n.language);

  return (
    <div
      dir={direction}
      className="my-2 mx-auto flex flex-col overflow-hidden rounded-lg border border-solid bg-white  xs:h-64 md:w-11/12 lg:w-9/10 transition-transform duration-300 hover:scale-105"
    >
      {/* Image Section */}
      <div className="w-full border-b">
        <img
          className="w-full object-cover xs:h-36"
          src={companyInfo?.image}
        />
      </div>

      {/* Text Section */}
      <div className="mb-2 ms-3 mt-2 flex flex-col">
        <p className="max-w-[5/6] truncate text-start font-PoppinsSemiBold text-[#3B235D] xs:text-lg rtl:self-start">
          {companyInfo?.name}
        </p>
        <div className="mb-2 mt-2 flex gap-x-1">
          <img
            className="mr-1 self-center object-contain"
            src="/assets/icons/loc.png"
            alt="location"
          />
          <p className="font-PoppinsRegular text-[#444444] xs:text-base">
            {companyInfo.country} , {companyInfo.city}
          </p>
        </div>
        <Link
          to={`/Companies/${companyInfo?.id}/${companyInfo?.name.replace(/\s+/g, "_")}`}
          className="!no-underline"
        >
          <div className="flex cursor-pointer items-center">
            <p className="font-PoppinsSemiBold text-[#3B235D] xs:text-base">
              {companyInfo.jobs} {t("jobs")}
            </p>
            <RiArrowRightDoubleLine
              className="mx-1 rtl:rotate-180 text-[#3B235D]"
              size={22}
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
