import { useTranslation } from "react-i18next";
import HeaderForm from './HeaderForm'

export default function Hero() {
  const formattedNumber = new Intl.NumberFormat("ar-EG").format(1500);
  const { t, i18n } = useTranslation();
  const direction = i18n.dir(i18n.language);

  return (
    <div className="w-full bg-[#FAFAFA]" dir={direction}>
      <div className="h-[34rem] w-full bg-Hero bg-cover bg-no-repeat ">

        <div className="flex h-full w-full flex-col items-center justify-start gap-y-[2rem] bg-overlay pt-5">

          <p className="text-[#FFFFFF] xs:text-lg    sm:text-2xl  lg:text-3xl
           ltr:font-PoppinsRegular rtl:font-TajawalRegular  ">
            <span className="mx-2 font-PoppinsSemiBold rtl:font-TajawalMedium">
              {direction === "rtl" ? formattedNumber : "+1500"}
            </span>
            {t("Jobs posted week ago")}
          </p>

          {/* Search Form  start */}

          <HeaderForm />
          {/* Search Form  end */}
          <p className="text-center font-PoppinsLight text-white xs:w-[85%]  xs:text-sm
            md:text-base lg:text-lg rtl:font-TajawalLight">
            <span className="font-PoppinsSemiBold rtl:font-TajawalMedium">
              {t("Search by tags")}:
            </span>{" "}
            {t("Developer, Engineer, Support, Manager, Senior, Junior")}
          </p>
        </div>
      </div>
    </div>
  );
}
