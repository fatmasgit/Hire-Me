import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import Date from "./datePicker";
import YearsDate from "./yearsDatePicker";
import SelectDegreeField from "./degreeSelect";
import FileUpload from "./cv";
import ProfilePhotoUpload from "./imgReading";
import { BsExclamationCircle, BsEye, BsEyeSlash } from "react-icons/bs";

export default function CandidateForm({
    initialValues,
    onSubmit,
    isProfile = false,
    isSubmitting = false,
}) {
    const { t } = useTranslation();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const validationSchema = Yup.object({
        firstName: Yup.string()
            .matches(/^[A-Za-zأ-ي ]+$/, t("noNumbersAllowed"))
            .min(3, t("firstNameMinLength"))
            .required(t("firstNameRequired")),
        lastName: Yup.string()
            .matches(/^[A-Za-zأ-ي ]+$/, t("noNumbersAllowed"))
            .min(3, t("lastNameMinLength"))
            .required(t("lastNameRequired")),
        email: Yup.string().email(t("invalidEmail")).required(t("emailRequired")),
        dateOfBirth: Yup.string().required(t("dateOfBirthRequired")),
        university: Yup.string()
            .matches(/^[A-Za-zأ-ي ]+$/, t("noNumbersAllowed"))
            .min(6, t("universityMinLength"))
            .required(t("universityRequired")),
        major: Yup.string()
            .matches(/^[A-Za-zأ-ي ]+$/, t("noNumbersAllowed"))
            .min(6, t("majorMinLength"))
            .required(t("majorRequired")),
        educationLevel: Yup.string().required(t("educationLevelRequired")),
        graduationYear: Yup.string().required(t("graduationYearRequired")),
        cv: Yup.mixed().nullable(),
        ...(isProfile
            ? {}
            : {
                password: Yup.string()
                    .min(6, t("passwordMinLength"))
                    .required(t("passwordRequired")),
                confirmPassword: Yup.string()
                    .oneOf([Yup.ref("password"), null], t("passwordsMustMatch"))
                    .required(t("confirmPasswordRequired")),
            }),
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize={true}
        >
            {({ errors, touched, values, setFieldValue }) => {
                const areValuesDifferent = () => {
                    for (let key in initialValues) {
                        if (initialValues[key] !== values[key]) {
                            return true;
                        }
                    }
                    return false;
                };

                const disableSubmit =
                    isSubmitting ||
                    Object.keys(errors).length > 0 ||
                    (isProfile && !areValuesDifferent());

                return (
                    <Form className="flex h-auto flex-col gap-y-3">
                        <ProfilePhotoUpload
                            name="profilePhoto"
                            value={values.profilePhoto}
                            onChange={(name, file) => setFieldValue(name, file)}
                        />

                        {/* First and Last Name */}
                        <div className="flex w-full justify-between">
                            <div className="flex w-[48%] flex-col">
                                <label className="ms-1 text-[0.8rem] text-[#707070] flex items-center">
                                    {t("firstName")}
                                    {errors.firstName && touched.firstName && (
                                        <BsExclamationCircle className="text-red-500 mx-1 mb-1" />
                                    )}
                                </label>
                                <Field
                                    type="text"
                                    name="firstName"
                                    className="h-[2.2rem] rounded-lg border-[1px] px-2 text-[0.8rem] outline-none border-[#dcd9d9]"
                                />
                                {errors.firstName && touched.firstName && (
                                    <div className="text-red-500 text-xs">{errors.firstName}</div>
                                )}
                            </div>

                            <div className="flex w-[48%] flex-col">
                                <label className="ms-1 text-[0.8rem] text-[#707070] flex items-center">
                                    {t("lastName")}
                                    {errors.lastName && touched.lastName && (
                                        <BsExclamationCircle className="text-red-500 mx-1 mb-1" />
                                    )}
                                </label>
                                <Field
                                    type="text"
                                    name="lastName"
                                    className="h-[2.2rem] rounded-lg border-[1px] px-2 text-[0.8rem] outline-none border-[#dcd9d9]"
                                />
                                {errors.lastName && touched.lastName && (
                                    <div className="text-red-500 text-xs">{errors.lastName}</div>
                                )}
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex w-full flex-col">
                            <label className="ms-1 text-[0.8rem] text-[#707070] flex items-center">
                                {t("email")}
                                {errors.email && touched.email && (
                                    <BsExclamationCircle className="text-red-500 mx-1 mb-1" />
                                )}
                            </label>
                            <Field
                                type="email"
                                name="email"
                                className="h-[2.2rem] rounded-lg border-[1px] px-2 text-[0.8rem] outline-none border-[#dcd9d9]"
                            />
                            {errors.email && touched.email && (
                                <div className="text-red-500 text-xs">{errors.email}</div>
                            )}
                        </div>

                        {/* Date */}
                        <Date name="dateOfBirth" label={t("dateOfBirth")} />

                        {/* Education Level and Graduation Year */}
                        <div className="flex w-full justify-between gap-x-3">
                            <SelectDegreeField
                                label={t("educationLevel")}
                                name="educationLevel"
                            />
                            <YearsDate label={t("graduationYear")} name="graduationYear" />
                        </div>

                        {/* University */}
                        <div className="flex w-full flex-col">
                            <label className="ms-1 text-[0.8rem] text-[#707070] flex items-center">
                                {t("university")}
                                {errors.university && touched.university && (
                                    <BsExclamationCircle className="text-red-500 mx-1 mb-1" />
                                )}
                            </label>
                            <Field
                                type="text"
                                name="university"
                                className="h-[2.2rem] rounded-lg border-[1px] px-2 text-[0.8rem] outline-none border-[#dcd9d9]"
                            />
                            {errors.university && touched.university && (
                                <div className="text-red-500 text-xs">{errors.university}</div>
                            )}
                        </div>

                        {/* Major */}
                        <div className="flex w-full flex-col">
                            <label className="ms-1 text-[0.8rem] text-[#707070] flex items-center">
                                {t("major")}
                                {errors.major && touched.major && (
                                    <BsExclamationCircle className="text-red-500 mx-1 mb-1" />
                                )}
                            </label>
                            <Field
                                type="text"
                                name="major"
                                className="h-[2.2rem] rounded-lg border-[1px] px-2 text-[0.8rem] outline-none border-[#dcd9d9]"
                            />
                            {errors.major && touched.major && (
                                <div className="text-red-500 text-xs">{errors.major}</div>
                            )}
                        </div>

                        {/* Password fields (if NOT profile) */}
                        {!isProfile && (
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
                                            onClick={() =>
                                                setConfirmPasswordVisible(!confirmPasswordVisible)
                                            }
                                            className="absolute ltr:right-2 rtl:left-2 top-1/2 transform -translate-y-1/2"
                                        >
                                            {confirmPasswordVisible ? <BsEyeSlash /> : <BsEye />}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && touched.confirmPassword && (
                                        <div className="text-red-500 text-xs">
                                            {errors.confirmPassword}
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        {/* File Upload */}
                        <FileUpload
                            name="cv"
                            onChange={setFieldValue}
                            value={values.cv}
                        />

                        <button
                            type="submit"
                            className={`mt-1 h-[2.5rem] w-full rounded-lg bg-[#3B235D] 
                text-white text-[1rem] ${disableSubmit ? "cursor-not-allowed opacity-50" : ""
                                }`}
                            disabled={disableSubmit}
                        >
                            {isProfile
                                ? isSubmitting
                                    ? t("savingChanges")
                                    : t("saveChanges")
                                : isSubmitting
                                    ? t("signingUp")
                                    : t("signUpButton")}

                        </button>
                    </Form>
                );
            }}
        </Formik>
    );
}
