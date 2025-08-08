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
                <label className="ms-1 text-[0.8rem] text-[#707070] flex items-center">
                    {t("password")}
                    {errors.password && touched.password && (
                        <BsExclamationCircle className="text-red-500 mx-1 mb-1" />
                    )}
                </label>
                <div className="relative">
                    <Field
                        type={passwordVisible ? "text" : "password"}
                        name="password"
                        className="h-[2.2rem] w-full rounded-lg border-[1px] px-2 text-[0.8rem] outline-none border-[#dcd9d9]"
                    />
                    <button
                        type="button"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        className="absolute ltr:right-2 rtl:left-2 top-1/2 transform -translate-y-1/2"
                    >
                        {passwordVisible ? <BsEyeSlash /> : <BsEye />}
                    </button>
                </div>
                {errors.password && touched.password && (
                    <div className="text-red-500 text-xs">{errors.password}</div>
                )}
            </div>

            {/* Confirm Password */}
            <div className="flex w-full flex-col">
                <label className="ms-1 text-[0.8rem] text-[#707070] flex items-center">
                    {t("confirmPassword")}
                    {errors.confirmPassword && touched.confirmPassword && (
                        <BsExclamationCircle className="text-red-500 mx-1 mb-1" />
                    )}
                </label>
                <div className="relative">
                    <Field
                        type={confirmPasswordVisible ? "text" : "password"}
                        name="confirmPassword"
                        className="h-[2.2rem] w-full rounded-lg border-[1px] px-2 text-[0.8rem] outline-none border-[#dcd9d9]"
                    />
                    <button
                        type="button"
                        onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                        className="absolute ltr:right-2 rtl:left-2 top-1/2 transform -translate-y-1/2"
                    >
                        {confirmPasswordVisible ? <BsEyeSlash /> : <BsEye />}
                    </button>
                </div>
                {errors.confirmPassword && touched.confirmPassword && (
                    <div className="text-red-500 text-xs">{errors.confirmPassword}</div>
                )}
            </div>
        </>
    );
}
