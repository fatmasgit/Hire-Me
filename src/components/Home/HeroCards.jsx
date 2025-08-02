import { useTranslation } from "react-i18next";

export default function HeroCards() {
  const { t } = useTranslation();

  const HeaderCards = [
    {
      img: "/assets/icons/list.svg",
      heading: t("Skill"),
      caption: t("the ability to carry out diverse duties in IT roles"),
    },
    {
      img: "/assets/icons/employers.png",
      heading: t("Employer"),
      caption: t("seek candidates who write code in several languages"),
    },
    {
      img: "/assets/icons/Province.png",
      heading: t("Province"),
      caption: t("where an Employee reports for work at Company"),
    },
    {
      img: "/assets/icons/title.png",
      heading: t("Title"),
      caption: t("the type of position and level an employee holds"),
    },
  ];

  return (
    <div className="w-full bg-[#FAFAFA] pb-5 shadow">

      <div className="mx-auto flex w-full -translate-y-14 flex-row flex-wrap justify-center gap-x-5 
      gap-y-5 bg-transparent lg:w-[90%]  2xl:w-[80%]">
        {HeaderCards.map((elm, index) => (
          <div
            key={index}
            className="flex basis-[40%] flex-col items-center gap-y-1 rounded-lg border-[1px]
             bg-white py-3 text-center  sm:basis-1/3 lg:basis-1/5"
          >
            <div>
              <img src={elm.img} className="object-cover" alt={elm.heading} />
            </div>
            <span className="ltr:font-PoppinsMedium rtl:font-TajawalMedium text-base text-[#444444]">
              {elm.heading}
            </span>
            <p className="text-balance px-2 ltr:font-PoppinsLight  rtl:font-TajawalRegular
             text-xs text-[#444444] sm:text-sm">
              {elm.caption}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
