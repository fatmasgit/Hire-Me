import React, { useState } from "react";
import LoginForm from '../components/forEmployers/logIn'
import { Link } from "react-router-dom";
import LangButton from "../components/nav/arEnButton";
import { useTranslation } from "react-i18next";



const EmployersLogInForm = () => {
    const { i18n, t } = useTranslation();

    return (
        <div className="w-full pt-5 min-h-screen  flex flex-col  "  >



{/**nav + logo */}
            <div className="w-full flex  px-4 justify-between  items-start ">
                <Link to="/" className="!no-underline">
                    <img
                        className="  w-[8rem] lg:w-[9rem] object-contain  mb-3"
                        src="/assets/Logo/logo.png"
                    />
                </Link>

                <div className="flex gap-x-1">
                    <Link to="/employers/SignUp" className="!no-underline">
                        <button className="ltr:font-PoppinsMedium rtl:font-TajawalMedium  
                         rounded-md border-[1px] border-solid border-[#3B235D]  text-[#3B235D] 
                         !no-underline
                     h-[1.8rem] w-[5rem] text-xs ">
                            {t("signUp")}
                        </button>{" "}
                    </Link>
                    <LangButton />
                </div>
            </div>




            {/*img + from */}
            <div className=" flex-1 mb-3  flex   flex-col-reverse gap-y-5  md:flex-row  w-full   items-center 
            ">
                <div className=" flex-1  sm:w-4/5  xs:w-full  md:w-full  xs:mb-10  md:mb-0  ">
                    <LoginForm />
                </div>


                <div className="bg-employers  xs:h-[20rem]  xs:w-full   md:w-1/2 lg:w-3/5  md:h-[25rem]  lg:h-[30rem]
                my-auto  bg-contain  bg-no-repeat bg-center">
                </div>

            </div>
        </div>

    );
};

export default EmployersLogInForm;


