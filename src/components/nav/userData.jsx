import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'antd';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import profile from './profile.svg';

export default function UserData() {
  const { t } = useTranslation(); // Use the translation hook
  const { role, userDocument, displayName } = useSelector((state) => state.auth);

  const candidateItems = [
    {
      label: (
        <Link
          to="/profile"
          className="!no-underline lg:text-sm xl:text-base ltr:font-PoppinsRegular rtl:font-TajawalMedium"
        >
          {t('profile')}
        </Link>
      ),
      key: '1',
    },
    {
      label: (
        <Link
          to="/Jobs"
          className="!no-underline lg:text-sm xl:text-base ltr:font-PoppinsRegular rtl:font-TajawalMedium"
        >
          {t('findAJob')}
        </Link>
      ),
      key: '2',
    },
  ];

  const employerItems = [
    {
      label: (
        <Link
          to="/"
          className="!no-underline lg:text-sm xl:text-base ltr:font-PoppinsRegular rtl:font-TajawalMedium"
        >
          {t('profile')}
        </Link>
      ),
      key: '1',
    },
    {
      label: (
        <Link
          to="/postJob"
          className="!no-underline lg:text-sm xl:text-base ltr:font-PoppinsRegular rtl:font-TajawalMedium"
        >
          {t('postAJob')}
        </Link>
      ),
      key: '2',
    },
  ];

  const items = role === 'candidate' ? candidateItems : employerItems || '';
  const img = userDocument?.imageUrl || profile;
  const name = role === 'candidate' ? userDocument?.firstName : userDocument?.name || '';
  const googleDisplayName = displayName;

  return (
    <div className="flex max-w-[12rem] h-[2.3rem] items-center gap-x-1 mx-2">
      {img && (
        <img
          className="w-[2.3rem] h-full rounded-full object-cover"
          src={img}
        />
      )}

      {googleDisplayName && (
        <p className="text-base font-PoppinsRegular tracking-wider truncate">
          {t('hi')},{googleDisplayName}
        </p>
      )}

      {name && (
        <Dropdown
          menu={{
            items,
          }}
          overlayClassName="pt-[1.1rem] z-100 w-[7rem]"
        >
          <a
            onClick={(e) => e.preventDefault()}
            className="flex items-center !no-underline"
          >
            <p className="text-base ltr:font-PoppinsMedium rtl:font-TajawalBold tracking-wider
            max-w-[8rem] truncate">
              {t('hi')},{name}
            </p>
            <p className="-ms-1.5 mt-[2px] lg:text-[1.5rem] navXl:text-[1.8rem]">
              <RiArrowDropDownLine />
            </p>
          </a>
        </Dropdown>
      )}
    </div>
  );
}
