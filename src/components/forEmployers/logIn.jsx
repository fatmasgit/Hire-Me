import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, loginWithGoogle } from "../../redux/slices/employersSlice";
import { FaEnvelope, FaLock ,FaUnlock } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcGoogle } from "react-icons/fc";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
   const navigate =useNavigate()
  const [showPassword, setShowPassword] = useState(false);


  const { formLoading, googleLoading, error, user, message } = useSelector(
    (state) => state.employersSignUp
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t("invalidEmail"))
        .required(t("emailRequired")),
      password: Yup.string()
        .min(8, t("passwordMinLength"))
        .required(t("passwordRequired")),
    }),
    onSubmit: async (values) => {
      try {
        await dispatch(loginUser(values)).unwrap();
        toast.success(t("loginSuccess"), {
          position: "top-center",
          autoClose: 3000,
        });

        setTimeout(() => {
          navigate('/');
        }, 3500); 
      } catch (err) {
        toast.error(`${t("loginFailed")}: ${err || t("unknownError")}`, {
          position: "top-center",
          autoClose: 3000,
        });
      }
    },
  });

  const handleGoogleLogin = async () => {
    try {
      await dispatch(loginWithGoogle()).unwrap();
      toast.success(t("googleLoginSuccess"), {
        position: "top-center",
        autoClose: 3000,
      });

      setTimeout(() => {
        navigate('/');
      }, 4000); 
    } catch (err) {
      toast.error(`${t("googleLoginFailed")}: ${err || t("unknownError")}`, {
        position: "top-center",
        autoClose: 3500,
      });
    }
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="flex flex-col items-center md:items-end space-y-4">
        {/* Email Input */}
        <div className="relative w-[70%]">
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={t("emailPlaceholder")}
              className="w-full  ltr:font-PoppinsRegular rtl:font-TajawalMedium px-11 py-2 text-gray-800 bg-white border border-[#3B235D]
               rounded-full focus:outline-none focus:ring-2 focus:ring-[#3B235D]"
            />
            <div className="absolute ltr:left-4 rtl:right-4 top-1/2 transform -translate-y-1/2 text-[#3B235D]">
              <FaEnvelope size={16} />
            </div>
          </div>
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1  ltr:font-PoppinsRegular rtl:font-TajawalMedium">{formik.errors.email}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="w-[70%]">
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' :'password' } 
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={t("passwordPlaceholder")}
              className="w-full  ltr:font-PoppinsRegular rtl:font-TajawalMedium  px-11 py-2 text-gray-800 bg-white border border-[#3B235D] rounded-full focus:outline-none focus:ring-2 focus:ring-[#3B235D]"
            />
            <div onClick={() => setShowPassword((prev) => !prev)}
              className="absolute  cursor-pointer ltr:left-4 rtl:right-4 top-1/2 transform -translate-y-1/2 text-[#3B235D]">
            
            {showPassword ?  < FaUnlock size={16} /> :   < FaLock size={16} />}
            
            </div>
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mt-1 ltr:font-PoppinsRegular rtl:font-TajawalMedium ">{formik.errors.password}</p>
          )}
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={formLoading}
          className={`w-[70%]   ltr:font-PoppinsRegular rtl:font-TajawalMedium py-2
             text-white  rounded-full ${formLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#3B235D] hover:bg-[#4a2b75] transition duration-300"
            }`}
        >
          {formLoading ? t("loggingIn") : t("login")}
        </button>

        {/* Google Login Button */}
        <div className="w-[70%] flex justify-center items-center">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className={`w-full  ltr:font-PoppinsMedium rtl:font-TajawalBold flex justify-center border items-center gap-x-1 py-2 mt-2 text-[#3B235D]  rounded-full ${googleLoading
                ? "cursor-not-allowed"
                : "bg-white transition duration-300"
              }`}
          >
            <FcGoogle size={22} />
            {googleLoading ? t("loggingInWithGoogle") : t("signInWithGoogle")}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
