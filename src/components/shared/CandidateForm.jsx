import React from "react";
import { Formik, Form, Field } from "formik";
import { useTranslation } from "react-i18next";
import Date from "./DatePicker";
import YearsDate from "./YearsDatePicker";
import SelectDegreeField from "./DegreeSelect";
import FileUpload from "./Cv";
import ProfilePhotoUpload from "./ProfilePhotoUpload";
import PasswordFields from "./PasswordFields";
import { BsExclamationCircle } from "react-icons/bs";
import { getCandidateValidationSchema } from "./YupValidation";


export default function CandidateForm({
    initialValues,
    onSubmit,
    isProfile = false,
    isSubmitting = false,
}) {
    const { t } = useTranslation();

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={getCandidateValidationSchema(t, isProfile)}
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

                        {/* First & Last Name */}
                        <div className="flex w-full justify-between">
                            {/* First Name */}
                            <div className="flex w-1/2 flex-col">
                                <label className="ms-1 text-sm text-[#707070] flex items-center">
                                    {t("firstName")}
                                    {errors.firstName && touched.firstName && (
                                        <BsExclamationCircle className="text-red-500 mx-1 mb-1" />
                                    )}
                                </label>
                                <Field
                                    type="text"
                                    name="firstName"
                                    className="h-9 rounded-lg border-[1px] px-2 text-sm outline-none border-[#dcd9d9]"
                                />
                                {errors.firstName && touched.firstName && (
                                    <div className="text-red-500 text-xs">{errors.firstName}</div>
                                )}
                            </div>

                            {/* Last Name */}
                            <div className="flex w-[48%] flex-col">
                                <label className="ms-1 text-sm text-[#707070] flex items-center">
                                    {t("lastName")}
                                    {errors.lastName && touched.lastName && (
                                        <BsExclamationCircle className="text-red-500 mx-1 mb-1" />
                                    )}
                                </label>
                                <Field
                                    type="text"
                                    name="lastName"
                                    className="h-9 rounded-lg border-[1px] px-2 text-sm outline-none border-[#dcd9d9]"
                                />
                                {errors.lastName && touched.lastName && (
                                    <div className="text-red-500 text-xs">{errors.lastName}</div>
                                )}
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex w-full flex-col">
                            <label className="ms-1 text-sm text-[#707070] flex items-center">
                                {t("email")}
                                {errors.email && touched.email && (
                                    <BsExclamationCircle className="text-red-500 mx-1 mb-1" />
                                )}
                            </label>
                            <Field
                                type="email"
                                name="email"
                                className="h-9 rounded-lg border-[1px] px-2 text-sm outline-none border-[#dcd9d9]"
                            />
                            {errors.email && touched.email && (
                                <div className="text-red-500 text-xs">{errors.email}</div>
                            )}
                        </div>

                        {/* Date of Birth */}
                        <Date name="dateOfBirth" label={t("dateOfBirth")} />

                        {/* Education & Graduation */}
                        <div className="flex w-full justify-between gap-x-3">
                            <SelectDegreeField
                                label={t("educationLevel")}
                                name="educationLevel"
                            />
                            <YearsDate label={t("graduationYear")} name="graduationYear" />
                        </div>

                        {/* University */}
                        <div className="flex w-full flex-col">
                            <label className="ms-1 text-sm text-[#707070] flex items-center">
                                {t("university")}
                                {errors.university && touched.university && (
                                    <BsExclamationCircle className="text-red-500 mx-1 mb-1" />
                                )}
                            </label>
                            <Field
                                type="text"
                                name="university"
                                className="h-9 rounded-lg border-[1px] px-2 text-sm outline-none border-[#dcd9d9]"
                            />
                            {errors.university && touched.university && (
                                <div className="text-red-500 text-xs">{errors.university}</div>
                            )}
                        </div>

                        {/* Major */}
                        <div className="flex w-full flex-col">
                            <label className="ms-1 text-sm text-[#707070] flex items-center">
                                {t("major")}
                                {errors.major && touched.major && (
                                    <BsExclamationCircle className="text-red-500 mx-1 mb-1" />
                                )}
                            </label>
                            <Field
                                type="text"
                                name="major"
                                className="h-9 rounded-lg border-[1px] px-2 text-sm outline-none border-[#dcd9d9]"
                            />
                            {errors.major && touched.major && (
                                <div className="text-red-500 text-xs">{errors.major}</div>
                            )}
                        </div>

                        {/* Password Fields */}
                        {!isProfile && <PasswordFields />}

                        {/* CV Upload */}
                        <FileUpload
                            name="cv"
                            onChange={setFieldValue}
                            value={values.cv}
                        />

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className={`mt-1 h-10 w-full rounded-lg bg-[#3B235D] 
                                ltr:font-PoppinsMedium rtl:font-TajawalMedium text-base text-white  
                                ${disableSubmit ? "cursor-not-allowed opacity-50" : ""}`}
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
