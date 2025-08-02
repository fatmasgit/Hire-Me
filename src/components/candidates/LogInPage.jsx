import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { loginCandidate, loginWithGoogle } from "../../redux/slices/candidatesSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LangButton from "../nav/arEnButton";
import { FcGoogle } from "react-icons/fc";

export default function LogIn() {
  const { t, i18n } = useTranslation();
  const direction = i18n.dir(i18n.language);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();
    const navigate =useNavigate()
  const { formLoading, googleLoading, user, error, message } = useSelector(
    (state) => state.candidateSignUp
  );

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setEmailError(t("Email is required"));
    } else if (!emailRegex.test(value)) {
      setEmailError(t("Please enter a valid email address"));
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (value) => {
    if (!value) {
      setPasswordError(t("Password is required"));
    } else if (value.length < 8) {
      setPasswordError(t("Password must be at least 8 characters long"));
    } else {
      setPasswordError("");
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validate email and password
    validateEmail(email);
    validatePassword(password);
  
    if (!emailError && !passwordError && email && password) {
      dispatch(loginCandidate({ email, password }))
        .unwrap()
        .then(() => {
          toast.success(t("Login successful!"));
          // Navigate after success
          setTimeout(() => {
            navigate('/');
          }, 3000); 
        })
        .catch((err) => toast.error(err || t("Login failed")));
    } else {
      toast.error(t("Please check your inputs."));
    }
  };
  



  const handleGoogleSignIn = () => {
    dispatch(loginWithGoogle())
      .unwrap()
      .then((response) => {
        toast.success(t("Welcome") + `, ${response.displayName}!`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
  
     
        setTimeout(() => {
          navigate('/');
        }, 3000);
      })
      .catch((err) => {
        toast.error(err || t("Google Sign-In Error"), {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  

  return (
    <div className="flex flex-col justify-start w-full bg-[#FDFDFD] bg-cover py-4 bg-multiple  min-h-screen  ">
      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        newestOnTop={false}
        rtl={direction === "rtl"}
        pauseOnFocusLoss
      />

      <div className="w-full flex  px-4 justify-between  items-start">
        <Link to="/" className="!no-underline">
          <img
            className="w-[8rem] lg:w-[9rem] object-contain  mb-5"
            src="/assets/Logo/logo.png"
          />
        </Link>
        <LangButton />
      </div>

      <div className="flex-1 flex w-full items-center">
        <div className="mx-auto mb-2 flex h-fit flex-col items-center gap-y-2 rounded-xl border-[1px]
          border-[#dcd9d9] bg-white px-3 py-4 shadow-md xs:w-[80%] sm:w-[60%] md:w-[45%] lg:w-[35%] ">
          <p className="font-PoppinsSemiBold text-[1.5rem] leading-tight text-[#444444] mt-2">
            {t("Welcome back!")}
          </p>
          <p className="text-center font-PoppinsMedium text-[1rem] leading-tight text-[#444444] mb-2">
            {t("You Have Been Missed For Long Time")}
          </p>

          <form onSubmit={handleSubmit} className="flex w-full flex-col">
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder={t("Enter your email")}
              className={`my-1 !h-[2.5rem] rounded-md border ps-2 font-PoppinsRegular ${emailError ? "border-red-500" : "border-gray-300"}
                focus:outline-none focus:ring-2 ${emailError ? "focus:ring-red-500" : "focus:ring-blue-500"}`}
            />
            {emailError && <p className="mt-1 text-sm text-red-500">{emailError}</p>}

            <div className="relative my-2">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder={t("Password")}
                className={`h-[2.5rem] w-full rounded-md border ps-2 font-PoppinsRegular ${passwordError ? "border-red-500" : "border-gray-300"}
                  focus:outline-none focus:ring-2 ${passwordError ? "focus:ring-red-500" : "focus:ring-blue-500"}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute inset-y-0 ${direction === "rtl" ? "left-3" : "right-3"} flex items-center text-gray-500`}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>
            {passwordError && <p className="mt-1 text-sm text-red-500">{passwordError}</p>}

            <span className="self-end font-PoppinsMedium text-[0.95rem] text-[#3B235D]">
              <Link to="/SendOtp" className="w-full !no-underline">
                {t("Forget Your Password ?")}
              </Link>
            </span>

            <button
              type="submit"
              className="mt-4 rounded-md bg-[#3B235D] py-2 font-PoppinsRegular text-base text-white focus:outline-none"
            >
              {formLoading ? t("Logging in...") : t("Log in")}
            </button>
          </form>

          <button
            onClick={handleGoogleSignIn}
            className="flex justify-center gap-x-1 mt-4 w-full rounded-md
            bg-white py-2 text-[#3B235D] border text-base font-PoppinsRegular"
          >
            <FcGoogle size={22} />
            {googleLoading ? t("Logging in...") : t("Login with Google")}
          </button>

          <p className="mx-2 my-2 font-PoppinsRegular text-[0.9rem] text-[#808184]">
            {t("Don't have an account ?")}
            <span className="px-1 font-PoppinsMedium text-[#3B235D]">
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
