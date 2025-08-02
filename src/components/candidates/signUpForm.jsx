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



export default function SignUpForm({ onSubmit, isSubmitting }) {
  const { t, i18n } = useTranslation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);




  //initialValues
  const initialValues = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    university: "",
    major: "",
    educationLevel: "",
    graduationYear: "",
    email: "",
    password: "",
    confirmPassword: "",
    cv: null,
    profilePhoto: null,
  };


  // yup validation
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .matches(/^[A-Za-zأ-ي ]+$/, t("noNumbersAllowed"))
      .min(3, t("firstNameMinLength"))
      .required(t("firstNameRequired")),
    lastName: Yup.string()
      .matches(/^[A-Za-zأ-ي ]+$/, t("noNumbersAllowed"))
      .min(3, t("lastNameMinLength"))
      .required(t("lastNameRequired")),
    email: Yup.string()
      .email(t("invalidEmail"))
      .required(t("emailRequired")),
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
    password: Yup.string()
      .min(8, t("passwordMinLength"))
      .required(t("passwordRequired")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], t("passwordsDontMatch"))
      .required(t("confirmPasswordRequired")),
    cv: Yup.mixed().nullable(),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, setFieldValue, values, dirty }) => {

        return (<Form className="flex h-auto flex-col gap-y-3">
          {/* Profile Photo Upload */}
          <ProfilePhotoUpload
            name="profilePhoto"
            value={values.profilePhoto}
            onChange={(name, file) => setFieldValue(name, file)}
          />

          {/* First and Last Name */}
          <div className="flex w-full justify-between">
            <div className="flex w-[48%] flex-col">
              <label
                htmlFor="first-name"
                className="ms-1 ltr:font-PoppinsRegular rtl:font-TajawalMedium text-[0.8rem] text-[#707070] flex items-center"
              >
                {t("firstName")}
                {errors.firstName && touched.firstName && (
                  <BsExclamationCircle size={16} className="text-red-500 mx-1 mb-1" />
                )}
              </label>
              <Field
                type="text"
                id="first-name"
                name="firstName"
                className="h-[2.2rem] rounded-lg border-[1px] px-2 font-PoppinsRegular 
                 text-[0.8rem] outline-none border-[#dcd9d9]"
              />
              {errors.firstName && touched.firstName && (
                <div className="text-red-500 text-xs">{errors.firstName}</div>
              )}
            </div>

            <div className="flex w-[48%] flex-col">
              <label
                htmlFor="last-name"
                className="ms-1 ltr:font-PoppinsRegular rtl:font-TajawalMedium  text-[0.8rem] text-[#707070] flex items-center"
              >
                {t("lastName")}
                {errors.lastName && touched.lastName && (
                  <BsExclamationCircle size={16} className="text-red-500 mx-1 mb-1" />
                )}
              </label>
              <Field
                type="text"
                id="last-name"
                name="lastName"
                className="h-[2.2rem] rounded-lg border-[1px] px-2 font-PoppinsRegular text-[0.8rem] outline-none border-[#dcd9d9]"
              />
              {errors.lastName && touched.lastName && (
                <div className="text-red-500 text-xs">{errors.lastName}</div>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="flex w-full flex-col">
            <label
              htmlFor="email"
              className="ms-1 ltr:font-PoppinsRegular rtl:font-TajawalMedium  text-[0.8rem] text-[#707070] flex items-center"
            >
              {t("email")}
              {errors.email && touched.email && (
                <BsExclamationCircle size={16} className="text-red-500 mx-1 mb-1" />
              )}
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className="h-[2.2rem] rounded-lg border-[1px] px-2 font-PoppinsRegular text-[0.8rem] outline-none border-[#dcd9d9]"
            />
            {errors.email && touched.email && (
              <div className="text-red-500 text-xs">{errors.email}</div>
            )}
          </div>

          {/* Date of Birth */}
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
            <label
              htmlFor="university"
              className="ms-1 ltr:font-PoppinsRegular rtl:font-TajawalMedium  text-[0.8rem] text-[#707070] flex items-center"
            >
              {t("university")}
              {errors.university && touched.university && (
                <BsExclamationCircle size={16} className="text-red-500 mx-1 mb-1" />
              )}
            </label>
            <Field
              type="text"
              id="university"
              name="university"
              className="h-[2.2rem] rounded-lg border-[1px] px-2 font-PoppinsRegular text-[0.8rem] outline-none border-[#dcd9d9]"
            />
            {errors.university && touched.university && (
              <div className="text-red-500 text-xs">{errors.university}</div>
            )}
          </div>

          {/* Major */}
          <div className="flex w-full flex-col">
            <label
              htmlFor="major"
              className="ms-1 ltr:font-PoppinsRegular rtl:font-TajawalMedium  text-[0.8rem] text-[#707070] flex items-center"
            >
              {t("major")}
              {errors.major && touched.major && (
                <BsExclamationCircle size={16} className="text-red-500 mx-1 mb-1" />
              )}
            </label>
            <Field
              type="text"
              id="major"
              name="major"
              className="h-[2.2rem] rounded-lg border-[1px] px-2 font-PoppinsRegular text-[0.8rem] outline-none border-[#dcd9d9]"
            />
            {errors.major && touched.major && (
              <div className="text-red-500 text-xs">{errors.major}</div>
            )}
          </div>

          {/* Password */}
          <div className="flex w-full flex-col">
            <label
              htmlFor="password"
              className="ms-1 ltr:font-PoppinsRegular rtl:font-TajawalMedium  text-[0.8rem] text-[#707070] flex items-center"
            >
              {t("password")}
              {errors.password && touched.password && (
                <BsExclamationCircle size={16} className="text-red-500 mx-1 mb-1" />
              )}
            </label>
            <div className="relative">
              <Field
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                className="h-[2.2rem] w-full rounded-lg border-[1px] px-2 font-PoppinsRegular text-[0.8rem] outline-none border-[#dcd9d9]"
              />
              <button
                type="button"
                className="absolute ltr:right-2  rtl:left-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
              </button>
            </div>
            {errors.password && touched.password && (
              <div className="text-red-500 text-xs">{errors.password}</div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex w-full flex-col">
            <label
              htmlFor="confirmPassword"
              className="ms-1 ltr:font-PoppinsRegular rtl:font-TajawalMedium  text-[0.8rem] text-[#707070] flex items-center"
            >
              {t("confirmPassword")}
              {errors.confirmPassword && touched.confirmPassword && (
                <BsExclamationCircle size={16} className="text-red-500 mx-1 mb-1" />
              )}
            </label>
            <div className="relative">
              <Field
                type={confirmPasswordVisible ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className="h-[2.2rem] w-full rounded-lg border-[1px] px-2 
                ltr:font-PoppinsRegular  rtl:font-TajawalMedium text-[0.8rem] outline-none border-[#dcd9d9]"
              />
              <button
                type="button"
                className="absolute ltr:right-2  rtl:left-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              >
                {confirmPasswordVisible ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && touched.confirmPassword && (
              <div className="text-red-500 text-xs">{errors.confirmPassword}</div>
            )}
          </div>

          {/* File Upload */}
          <FileUpload
            name="cv"
            onChange={setFieldValue}
            value={values.cv}
          />

          <button
            type="submit"
            className={`mt-1 h-[2.5rem] w-full rounded-lg bg-[#3B235D] 
              ltr:font-PoppinsMedium rtl:font-TajawalMedium  text-[1rem] text-white ${isSubmitting ? "cursor-not-allowed opacity-50" : ""
              }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? t("signingUp") : t("signUpButton")}
          </button>
        </Form>)
      }}
    </Formik>
  );
}
