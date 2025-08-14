import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Company from "./CompaniesCarouselCard";
import {
  fetchCompanies,
  fetchCompanyJobs,
} from "../../redux/slices/companiesSlice";

export default function CompaniesCarousel() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { companies, companiesWithJobs } = useSelector(
    (state) => state.companies,
  );

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  useEffect(() => {
    if (companies.length > 0) {
      companies.forEach((company) => {
        dispatch(fetchCompanyJobs(company.name));
      });
    }
  }, [dispatch, companies]);

  const topCompanies = Object.entries(companiesWithJobs)
    .map(([name, jobs]) => ({ name, jobs, jobCount: jobs.length }))
    .sort((a, b) => b.jobCount - a.jobCount)
    .slice(0, 4);

  const filteredCompanies = companies.filter((company) =>
    topCompanies.some((topCompany) => topCompany.name === company.name),
  );

  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    speed: 300,
    arrows: false,
    responsive: [
      { breakpoint: 700, settings: { slidesToShow: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 1536, settings: { slidesToShow: 3 } },
    ],
  };

  return (
    <div className="w-full bg-[#FAFAFA] py-12 text-center">
      <p className="!mb-0 text-center font-PoppinsSemiBold rtl:font-TajawalBold text-base text-black md:text-lg">
        {t("TOP EMPLOYERS")}
      </p>
      <p className="mx-auto !mt-0 mb-4 w-4/5 max-w-screen-md font-PoppinsRegular rtl:font-TajawalRegular text-sm text-black md:text-base">
        {t("Recommend top employers")}
      </p>

      <div className=" slider-container mx-auto xs:w-4/6 md:w-3/4">
        <Slider {...settings}>
          {filteredCompanies.map((elm, i) => (
            <Company
              companyInfo={{
                ...elm,
                jobs:
                  topCompanies.find((top) => top.name === elm.name)?.jobCount ||
                  0,
              }}
              key={i}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
}
