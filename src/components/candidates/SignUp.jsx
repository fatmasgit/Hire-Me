import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupCandidate } from "../../redux/slices/candidatesSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LangButton from "../nav/arEnButton"
import CandidateForm from "../Shared/CandidateForm";


export default function SignUp() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, loading, error } = useSelector((state) => state.candidateSignUp);

  const handleSubmit = async (values) => {
    // console.log(values)

    try {

      await dispatch(signupCandidate(values)).unwrap();
      toast.success(t("Signup successful!"), {
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

    } catch (err) {

      toast.error(`${t("signupFailed")}: ${err}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className=" bg-[#FDFDFD] bg-cover py-5 bg-multiple ">

      <div className="w-full flex  px-4 justify-between  items-start">
        <Link to="/" className="!no-underline">
          <img
            className="  w-32 lg:w-36 object-contain  mb-5"
            src="/assets/Logo/logo.png"
          />
        </Link>
        <LangButton />
      </div>

      <div className="mx-auto rounded-xl border-[1px] border-[#dcd9d9] bg-white px-3
       py-4 shadow-md       xs:w-4/5 sm:w-3/5 md:w-2/5 lg:w-1/3">
        <p className="mb-3 text-center ltr:font-PoppinsSemiBold  rtl:font-TajawalBold text-lg text-[#444444]">
          {t("signUp")}
        </p>

        {/* SignUpForm handled by Formik */}
        <CandidateForm
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            dateOfBirth: "",
            university: "",
            major: "",
            educationLevel: "",
            graduationYear: "",
            cv: "",
            profilePhoto: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={handleSubmit}
          isSubmitting={loading}
        />

        <p className="mt-3 text-center  ltr:font-PoppinsRegular  rtl:font-TajawalMedium text-sm">
          {t("alreadyHaveAccount")}
          <span className="  ltr:font-PoppinsRegular  rtl:font-TajawalMedium text-[#3B235D]">
            <Link to="/LogIn" className="!no-underline">
              {t("Log in")}
            </Link>
          </span>
        </p>
      </div>


      <ToastContainer />
    </div>
  );
}
