import * as Yup from "yup";

export const getCandidateValidationSchema = (t, isProfile) => {
  const baseSchema = {
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
  };

  if (!isProfile) {
    baseSchema.password = Yup.string()
      .min(8, t("passwordMinLength"))
      .required(t("passwordRequired"));
    baseSchema.confirmPassword = Yup.string()
      .oneOf([Yup.ref("password"), null], t("passwordsMustMatch"))
      .required(t("confirmPasswordRequired"));
  }

  return Yup.object(baseSchema);
};
