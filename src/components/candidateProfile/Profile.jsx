import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase/firebaseConfig";
import { fetchCandidateByUid, updateProfile } from "../../redux/slices/profileSlice";
import LangButton from "../nav/ArEnButton";
import { Link } from "react-router-dom";
import CandidateForm from "../shared/CandidateForm";
import CircularLoader from "../shared/Loading"

export default function Profile() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [authReady, setAuthReady] = useState(false); // ✅ wait for auth check
  const { candidate, loading } = useSelector((state) => state.candidateProfile);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(fetchCandidateByUid());
      }
      setAuthReady(true); // ✅ done checking auth (with or without user)
    });

    return () => unsubscribe();
  }, [dispatch]);

  const handleSubmit = (values) => {
    dispatch(updateProfile(values));
  };

  const isDataReady = authReady && candidate;

  return (
    <div className="min-h-screen bg-[#FDFDFD] py-5 bg-multiple">
      <div className="w-full flex px-4 justify-between items-start">
        <Link to="/" className="!no-underline">
          <img className=" w-32 lg:w-36 object-contain mb-5" src="/assets/Logo/logo.png" />
        </Link>
        <LangButton />
      </div>

      <div className="mx-auto rounded-xl border-[1px] border-[#dcd9d9] bg-white px-3 py-4 shadow-md 
        xs:w-4/5 sm:w-3/5 md:w-2/5 lg:w-1/3">
        <p className="mb-2 text-center py-1 ltr:font-PoppinsSemiBold rtl:font-TajawalBold text-lg text-[#444444]">
          {t("editProfile")}
        </p>

        {isDataReady ? (
          <CandidateForm
            initialValues={{
              firstName: candidate.firstName || "",
              lastName: candidate.lastName || "",
              email: candidate.email || "",
              dateOfBirth: candidate.dateOfBirth || "",
              university: candidate.university || "",
              major: candidate.major || "",
              educationLevel: candidate.educationLevel || "",
              graduationYear: candidate.graduationYear || "",
              cv: candidate.cvUrl || "",
              profilePhoto: candidate.imageUrl || "",
            }}
            onSubmit={handleSubmit}
            isProfile={true}
            isSubmitting={loading}
          />
        ) : (
          <p className="text-center py-4 "><CircularLoader /></p>
        )}
      </div>
    </div>
  );
}