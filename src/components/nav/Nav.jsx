import React, { useEffect } from "react";
import { Options } from "./navDropdown";
import { Link } from "react-router-dom";
import LangButton from "./arEnButton";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, logout } from "../../redux/slices/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase/firebaseConfig";
import UserData from './userData'


export default function Nav() {
  const { t } = useTranslation();
  const dispatch = useDispatch();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(fetchUserData());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);



  const { authenticated, role, userDocument, loading, error } = useSelector(
    (state) => state.auth
  );

  //console.log('authenticated: ' + authenticated,'role: '+ role  ,'data: '+ userDocument)

  return (
    <div className="hidden lg:block sticky  top-0 z-50 bg-white ">
      <div className="flex items-center justify-between lg:h-[3.5rem] xl:h-[4rem] px-3 ">
        <div
          className="flex h-full  items-center justify-start px-2 lg:gap-x-3
         xl:gap-x-4"
        >
          {/* logo */}
          <Link to="/" className="!no-underline">
            <img
              className="lg:w-[8rem] object-contain me-3"
              src="/assets/Logo/logo.png"
            />
          </Link>


          {/* links */}
          <div
            className="ltr:font-PoppinsMedium rtl:font-TajawalBold text-[#444444] 
          lg:text-sm  xl:text-base"
          >
            <Link to="Jobs" className="!no-underline">
              {t("Jobs")}
            </Link>{" "}
          </div>

          <div
            className="ltr:font-PoppinsMedium rtl:font-TajawalBold text-[#444444] 
         lg:text-sm  xl:text-base"
          >
            <Link to="Companies" className="!no-underline">
              {t("Companies")}
            </Link>{" "}
          </div>

          <div
            className="relative font-PoppinsSemiBold text-[#444444]
            lg:text-sm  xl:text-base"
          >
            <Options />
          </div>
        </div>



        {/* nav buttons */}
        <div className="mx-2 flex h-full  items-center justify-end gap-x-2  ">
          {authenticated && <UserData />}

          {(!authenticated || (authenticated && role === 'employer')) && (<Link to="SignUp" className="!no-underline">
            <button className="ltr:font-PoppinsMedium rtl:font-TajawalMedium 
           rounded-md border-[1px] border-solid border-[#3B235D]  text-[#3B235D] 
           !no-underline lg:h-[1.8rem] lg:w-[5.7rem] lg:text-xs  xl:h-[2rem]
            xl:w-[7.8rem]  xl:text-sm"
            >
              {t("Sign Up")}
            </button>{" "}
          </Link>)}

          {(!authenticated || (authenticated && role === 'employer')) && (<Link to="LogIn" className=" cursor-pointer !no-underline">
            <button
              className="  ltr:font-PoppinsMedium rtl:font-TajawalMedium
               rounded-md border-[1px] border-solid border-[#3B235D]  text-[#3B235D] 
               !no-underline lg:h-[1.8rem] lg:w-[5.7rem] lg:text-xs  xl:h-[2rem] 
               xl:w-[7.8rem]  xl:text-sm"
            >
              {t("Log in")}
            </button>
          </Link>)}




          {authenticated && (<button onClick={() => dispatch(logout())}
            className="  ltr:font-PoppinsMedium rtl:font-TajawalMedium
               rounded-md border-[1px] border-solid border-[#3B235D]  text-[#3B235D] 
               !no-underline lg:h-[1.8rem] lg:w-[5.7rem] lg:text-xs  xl:h-[2rem] 
               xl:w-[7.8rem]  xl:text-sm"
          >
            {t("logOut")}
          </button>)}





          {(!authenticated || (authenticated && role === 'candidate')) && (<Link to="/employers/SignUp" className=" cursor-pointer !no-underline">
            <button className=" ltr:font-PoppinsMedium rtl:font-TajawalMedium 
     rounded-md border-[1px] border-solid border-[#3B235D]  text-[#3B235D] lg:h-[1.8rem] 
     lg:w-[6.5rem] lg:text-xs  xl:h-[2rem] xl:w-[8.2rem] xl:text-sm"
            >
              {t("For Employers")}
            </button>
          </Link>
          )}


          <LangButton />
        </div>

      </div>
    </div>
  );
}
