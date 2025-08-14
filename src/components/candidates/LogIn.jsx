import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { loginCandidate, loginWithGoogle } from "../../redux/slices/candidatesSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LangButton from "../nav/ArEnButton";
import { FcGoogle } from "react-icons/fc";

export default function LogIn() {
  const { t, i18n } = useTranslation();
  const direction = i18n.dir(i18n.language);

  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formLoading, googleLoading } = useSelector(
    (state) => state.candidateSignUp
  );

  const toastConfig = {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  };

  const inputClass = (error) =>
    `h-10 w-full rounded-md border px-2 font-PoppinsRegular rtl:font-TajawalRegular focus:outline-none focus:ring-2 ${error
      ? "border-red-500 focus:ring-red-500"
      : "border-gray-300 focus:ring-blue-500"
    }`;

  const validateEmail = (value) => {
    if (!value) return t("Email is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return t("Please enter a valid email address");
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return t("Password is required");
    if (value.length < 8)
      return t("Password must be at least 8 characters long");
    return "";
  };

  const handleChange = (field, value) => {
    setCredentials((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({
      ...prev,
      [field]:
        field === "email" ? validateEmail(value) : validatePassword(value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailError = validateEmail(credentials.email);
    const passwordError = validatePassword(credentials.password);
    setErrors({ email: emailError, password: passwordError });

    if (!emailError && !passwordError) {
      dispatch(loginCandidate(credentials))
        .unwrap()
        .then(() => {
          toast.success(t("Login successful!"), toastConfig);
          setTimeout(() => navigate("/"), 3000);
        })
        .catch((err) =>
          toast.error(err || t("Login failed"), toastConfig)
        );
    } else {
      toast.error(t("Please check your inputs."), toastConfig);
    }
  };

  const handleGoogleSignIn = () => {
    dispatch(loginWithGoogle())
      .unwrap()
      .then(() => {
        toast.success(t("Login successful!"), toastConfig);
        setTimeout(() => navigate("/"), 3000);
      })
      .catch((err) =>
        toast.error(err || t("Google Sign-In Error"), toastConfig)
      );
  };

  return (
    <div className="flex flex-col justify-start w-full bg-[#FDFDFD] py-4 min-h-screen">
      <ToastContainer newestOnTop={false} rtl={direction === "rtl"} />

      {/* Logo & Lang Switch */}
      <div className="w-full flex px-4 justify-between items-start">
        <Link to="/" className="!no-underline">
          <img
            className="w-32 lg:w-36 object-contain mb-5"
            src="/assets/Logo/logo.png"
            alt="Logo"
          />
        </Link>
        <LangButton />
      </div>

      {/* Form Container */}
      <div className="flex-1 flex w-full items-center">
        <div className="mx-auto mb-2 flex h-fit flex-col items-center gap-y-2 rounded-xl border border-gray-300 bg-white px-3 py-4 shadow-md xs:w-4/5 sm:w-3/5 md:w-[45%] lg:w-[35%]">
          <p className="font-PoppinsSemiBold rtl:font-TajawalBold text-xl leading-tight text-gray-700 mt-3">
            {t("Welcome back!")}
          </p>
          <p className="text-center font-PoppinsMedium rtl:font-TajawalMedium text-base leading-tight text-gray-700 mb-4">
            {t("You Have Been Missed For Long Time")}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex w-full flex-col">
            <input
              type="email"
              value={credentials.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder={t("Enter your email")}
              className={inputClass(errors.email)}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}

            <div className="relative my-2">
              <input
                type={showPassword ? "text" : "password"}
                value={credentials.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder={t("Password")}
                className={inputClass(errors.password)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className={`absolute inset-y-0 ${direction === "rtl" ? "left-3" : "right-3"
                  } flex items-center text-gray-500`}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}

            <span className="self-end font-PoppinsMedium rtl:font-TajawalMedium text-sm text-[#3B235D]">
              <Link to="/SendOtp" className="!no-underline">
                {t("Forget Your Password ?")}
              </Link>
            </span>

            <button
              type="submit"
              className="mt-4 rounded-md bg-[#3B235D] py-2 font-PoppinsRegular rtl:font-TajawalRegular text-base text-white focus:outline-none"
            >
              {formLoading ? t("Logging in...") : t("Log in")}
            </button>
          </form>

          {/* Google Login */}
          <button
            onClick={handleGoogleSignIn}
            className="flex rtl:flex-row-reverse justify-center gap-x-1 mt-4 w-full rounded-md bg-white py-2 text-[#3B235D] border text-base font-PoppinsRegular rtl:font-TajawalRegular"
          >
            <FcGoogle size={22} />
            {googleLoading ? t("Logging in...") : t("Login with Google")}
          </button>

          {/* Sign Up Link */}
          <p className="mx-2 my-2 font-PoppinsRegular rtl:font-TajawalRegular text-sm text-gray-500">
            {t("Don't have an account ?")}
            <span className="px-1 font-PoppinsMedium rtl:font-TajawalMedium text-[#3B235D]">
              <Link to="/SignUp" className="!no-underline">
                {t("Sign Up")}
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
