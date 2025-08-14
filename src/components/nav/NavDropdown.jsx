import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'antd';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

export const Options = () => {
  const { t } = useTranslation(); // Use the translation hook

  const items = [
    {
      label: (
        <Link
          to="/Search"
          className="!no-underline lg:text-sm xl:text-base ltr:font-PoppinsRegular rtl:font-TajawalMedium"
        >
          {t('search')}
        </Link>
      ),
      key: "1",
    },
    {
      label: (
        <Link
          to="/Blog"
          className="!no-underline lg:text-sm xl:text-base ltr:font-PoppinsRegular rtl:font-TajawalMedium"
        >
          {t('blog')}
        </Link>
      ),
      key: "2",
    },
    {
      label: (
        <Link
          to="/AboutUsPage"
          className="!no-underline lg:text-sm xl:text-base ltr:font-PoppinsRegular rtl:font-TajawalMedium"
        >
          {t('aboutUs')}
        </Link>
      ),
      key: "3",
    },
    {
      label: (
        <a
          href="/ContactUsPage"
          className="!no-underline lg:text-sm xl:text-base ltr:font-PoppinsRegular rtl:font-TajawalMedium"
        >
          {t('contactUs')}
        </a>
      ),
      key: "4",
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
      }}
      overlayClassName="pt-[1.1rem] z-100  w-[7rem]"
    >
      <a
        onClick={(e) => e.preventDefault()}
        className="flex items-center ltr:font-PoppinsMedium rtl:font-TajawalBold !no-underline"
      >
        {t('options')}
        <p className="-ms-1.5 mt-[2px] lg:text-[1.5rem] xl:text-[1.8rem]">
          {" "}
          <RiArrowDropDownLine />{" "}
        </p>
      </a>
    </Dropdown>
  );
};
