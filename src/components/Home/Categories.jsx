import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setFilter } from "../../redux/slices/jobsSlice";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Categories() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Initialize AOS when component mounts
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  // Helper function to provide AOS attributes
  const getAOSProps = (index) => ({
    "data-aos": "zoom-out-up",
    "data-aos-delay": index * 100,
  });

  const languages = [
    { language: "JavaScript", value: "javascript", src: "/assets/languages/js.png" },
    { language: "Flutter", value: "flutter", src: "/assets/languages/flluter.svg" },
    { language: "Android", value: "android", src: "/assets/languages/android.webp" },
    { language: ".NET", value: ".net", src: "/assets/languages/net.svg" },
    { language: "Python", value: "python", src: "/assets/languages/python.webp" },
    { language: "SQL", value: "sql", src: "/assets/languages/sql.svg" },
  ];

  return (
    <div className="bg-[#FAFAFA] py-8 text-center">
      <p className="!mb-0 font-PoppinsSemiBold rtl:font-TajawalBold text-base text-black md:text-lg">
        {t("Featured Skill Categories")}
      </p>
      <p className="mx-auto !mt-0 mb-4 w-11/12 max-w-screen-md font-PoppinsRegular rtl:font-TajawalRegular text-sm text-black md:text-base">
        {t("Who are in extremely love with eco friendly system")}
      </p>

      <div className="mx-auto flex w-11/12 flex-wrap justify-center gap-x-5 gap-y-5 bg-[#FAFAFA] lg:flex-nowrap">
        {languages.map((elm, i) => (
          <Link
            key={i}
            to={`/jobs/filter/skill/${elm.value}`}
            onClick={() => dispatch(setFilter({ name: "skill", value: [elm.value] }))}
            onMouseEnter={() => setHoveredSkill(elm.value)}
            onMouseLeave={() => setHoveredSkill(null)}
            className={`flex flex-col items-center justify-end text-inherit !no-underline xs:w-1/4 lg:w-auto transition-all duration-300
              ${hoveredSkill && hoveredSkill !== elm.value ? "opacity-45" : "opacity-100"}`}
            {...getAOSProps(i)}
          >
            <img
              src={elm.src}
              className="object-contain xs:w-[6.5rem] md:w-[7.5rem] lg:w-[8.5rem]"
              alt={elm.language}
            />
            <p className="text-center font-PoppinsSemiBold rtl:font-TajawalBold text-base xs:mt-2 sm:mt-3">
              {elm.language}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
