import React, { useState } from "react";
import { Field, useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { BsExclamationCircle, BsEye, BsEyeSlash } from "react-icons/bs";

export default function PasswordFields() {
  const { t } = useTranslation();
  const { errors, touched } = useFormikContext();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  return (
    <>
      {/* Password */}
      <div className="flex w-full flex-col">
        <label className="ms-1 flex items-center text-sm text-[#707070]">
          {t("password")}
          {errors.password && touched.password && (
            <BsExclamationCircle className="mx-1 mb-1 text-red-500" />
          )}
        </label>
        <div className="relative">
          <Field
            type={passwordVisible ? "text" : "password"}
            name="password"
            className="h-9 w-full rounded-lg border-[1px] border-[#dcd9d9] px-2 text-sm outline-none"
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute top-1/2 -translate-y-1/2 transform ltr:right-2 rtl:left-2"
          >
            {passwordVisible ? <BsEyeSlash /> : <BsEye />}
          </button>
        </div>
        {errors.password && touched.password && (
          <div className="text-xs text-red-500">{errors.password}</div>
        )}
      </div>

      {/* Confirm Password */}
      <div className="flex w-full flex-col">
        <label className="ms-1 flex items-center text-sm text-[#707070]">
          {t("confirmPassword")}
          {errors.confirmPassword && touched.confirmPassword && (
            <BsExclamationCircle className="mx-1 mb-1 text-red-500" />
          )}
        </label>
        <div className="relative">
          <Field
            type={confirmPasswordVisible ? "text" : "password"}
            name="confirmPassword"
            className="h-9 w-full rounded-lg border-[1px] border-[#dcd9d9] px-2 text-sm outline-none"
          />
          <button
            type="button"
            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            className="absolute top-1/2 -translate-y-1/2 transform ltr:right-2 rtl:left-2"
          >
            {confirmPasswordVisible ? <BsEyeSlash /> : <BsEye />}
          </button>
        </div>
        {errors.confirmPassword && touched.confirmPassword && (
          <div className="text-xs text-red-500">{errors.confirmPassword}</div>
        )}
      </div>
    </>
  );
}
