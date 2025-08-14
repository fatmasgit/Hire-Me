import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../redux/slices/employersSlice";
import { FaUser, FaEnvelope, FaBriefcase, FaLock, FaUnlock, FaCamera } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const { i18n, t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { loading, error, user } = useSelector((state) => state.employersSignUp);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);



  const initialValues = {
    name: "",
    email: "",
    profession: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  };


  //yup validation
  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[A-Za-zأ-ي ]+$/, (value) => value ? t("nameInvalid") : "")
      .min(3, t("NameMinLength"))
      .required(t("nameRequired")),

    email: Yup.string()
      .email(t("emailInvalid"))
      .required(t("emailRequired")),

    profession: Yup.string()
      .matches(/^[A-Za-zأ-ي ]+$/, (value) => value ? t("professionInvalid") : ""),

    password: Yup.string()
      .min(8, t("passwordMin"))
      .required(t("passwordRequired")),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], t("confirmPasswordMismatch"))
      .required(t("confirmPasswordRequired")),

    profileImage: Yup.mixed().notRequired(),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const { name, email, profession, password, profileImage } = values;
    dispatch(signupUser({ name, email, profession, password, profileImage }))
      .unwrap()
      .then(() => {
        toast.success(t("Signup successful!"), { position: "top-center" });
        setTimeout(() => {
          navigate('/');
        }, 3500);

      })
      .catch((err) => {
        toast.error(`${t("signupFailed")}: ${err}`, { position: "top-center" });
      });
    setSubmitting(false);
  };


  return (
    <>
      <ToastContainer />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className="flex flex-col items-center md:items-end space-y-4">
            {[
              { id: "name", placeholder: t("namePlaceholder"), icon: FaUser, type: "text" },
              { id: "email", placeholder: t("emailPlaceholder"), icon: FaEnvelope, type: "email" },
              { id: "profession", placeholder: t("professionPlaceholder"), icon: FaBriefcase, type: "text" },
              {
                id: "password",
                placeholder: t("passwordPlaceholder"),
                icon: showPassword ? FaUnlock : FaLock,
                type: showPassword ? "text" : "password",
                toggleShow: () => setShowPassword((prev) => !prev),
              },
              {
                id: "confirmPassword",
                placeholder: t("confirmPasswordPlaceholder"),
                icon: showConfirmPassword ? FaUnlock : FaLock,
                type: showConfirmPassword ? "text" : "password",
                toggleShow: () => setShowConfirmPassword((prev) => !prev),
              },
            ].map(({ id, placeholder, icon: Icon, type, toggleShow }, index) => (
              <div key={id || index} className="flex flex-col items-first w-[70%]">
                <div className="relative w-full">
                  <Field
                    id={`${id}+${Math.random()}`}
                    name={id}
                    type={type}
                    placeholder={placeholder}
                    className="w-full ps-11 py-2 text-gray-800 bg-white border border-[#3B235D]
                  ltr:font-PoppinsRegular rtl:font-TajawalRegular rounded-full focus:outline-none focus:ring-2 focus:ring-[#3B235D]"
                  />
                  <div
                    onClick={toggleShow}
                    className="cursor-pointer absolute ltr:left-4 rtl:right-4 top-1/2 transform -translate-y-1/2 text-[#3B235D]"
                  >
                    <Icon size={16} />
                  </div>
                </div>
                <ErrorMessage name={id} component="p" className="text-red-500 text-sm mt-1    ltr:font-PoppinsRegular rtl:font-TajawalRegular " />
              </div>
            ))}

            {/* File Input */}
            <div className="flex flex-col items-center w-[70%]">
              <input
                id={`profileImage-${Date.now()}`}
                name="profileImage"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  setFieldValue("profileImage", file);
                  // console.log("Selected File:", file);
                }}
              />
              <label
                htmlFor={`profileImage-${Date.now()}`}
                className="cursor-pointer flex items-center justify-center w-12 h-12 bg-[#3B235D] text-white rounded-full"
              >
                <FaCamera size={18} />
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className={`w-[70%] py-2 text-white    ltr:font-PoppinsMedium rtl:font-TajawalMedium  rounded-full ${loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#3B235D] hover:bg-[#4a2b75] transition duration-300"
                }`}
            >
              {loading ? t("signingUp") : t("signUp")}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignupForm;
