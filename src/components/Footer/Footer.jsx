import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <>
      <div className="bg-[#FAFAFA] py-5"></div>

      <div className="w-full bg-[#F0F2F9] py-5">
        <div className="container xs:w-[90%] sm:w-[80%]">
          <Link to="/" className="!no-underline">
            <img
              className="w-[7rem] lg:w-[8rem] object-contain my-1"
              src="/assets/Logo/logo.png"

            />
          </Link>

          {/* Start */}
          <div className="flex gap-y-7 bg-[#F0F2F9] xs:flex-col lg:flex-row">
            <div className="flex basis-1/3 flex-col items-start justify-start">
              <p className="text-balance ltr:font-PoppinsRegular rtl:font-TajawalMedium">
                {t("footer_description")}
              </p>
            </div>

            {/* Links */}
            <div className="flex basis-1/3 flex-col items-start justify-start lg:ms-5 lg:ps-[3rem]">
              <p className="ltr:font-PoppinsMedium  rtl:font-TajawalBold text-lg text-[#444444]">
                {t("important_links")}
              </p>
              <Link  to='/AboutUsPage'  className='!no-underline' >
                <p className="ltr:font-PoppinsMedium  rtl:font-TajawalBold text-base text-[#3B235D]">
                  {t("about_us")}
                </p>
              </Link>

              <Link  to='ContactUsPage' className='!no-underline' >
                <p className="ltr:font-PoppinsMedium  rtl:font-TajawalBold text-base text-[#3B235D]">
                  {t("contact_us")}
                </p>
              </Link>

              <Link  to='/Blog' className='!no-underline'  >
                <p className="ltr:font-PoppinsMedium  rtl:font-TajawalBold text-base text-[#3B235D]">
                  {t("blog")}
                </p>
              </Link>

            </div>

            {/* Apps */}
            <div className="flex basis-1/3 flex-col items-start justify-start xs:items-start">
              <p className="ltr:font-PoppinsMedium  rtl:font-TajawalBold text-base text-[#444444]">
                {t("download_app")}
              </p>
              <div className="flex gap-2 py-2 xs:flex-col lg:flex-row">
                <img
                  className="h-[2rem] object-contain"
                  src="/assets/image/apple.png"
                  alt="Apple Store"
                />
                <img
                  className="h-[2rem] object-contain"
                  src="/assets/image/android.png"
                  alt="Google Play Store"
                />
              </div>
            </div>
          </div>
          {/* End */}
          <hr className="mt-4 w-full border-[1px] border-black" />
        </div>
      </div>
    </>
  );
}
