import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";
import OTPInput from './otpInputs'
import { Link } from "react-router-dom";


export default function OtpVerify() {


  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#b2afaf]">
      <div className="flex w-[20rem] flex-col items-start justify-start gap-y-3 rounded-sm bg-white px-3 py-1">
        <div className="flex w-full flex-row items-start justify-between">
          <p className="mt-2 text-[#444444]">
            {" "}
            <Link to ="/sendOtp"  className='no-underline'>
            <IoMdArrowRoundBack size={20} />
            </Link>
          </p>
          <p className="mx-auto self-center pt-2 font-PoppinsMedium text-[1.3rem] text-[#444444]">
            Verify Email
          </p>
          <p className="text-[#444444] mt-2">
            {" "}
            <IoClose size={22} />{" "}
          </p>
        </div>

        <span className="font-PoppinsRegular text-[0.8rem] text-[#444444]">
          Please enter the code which sent to your email
       
        </span>

        <OTPInput length={6} />

     

        <button
          className="mb-3 mt-1 w-full rounded-sm bg-[#3B235D] p-2 font-PoppinsRegular text-white"
      
        >
          Verify
        </button>


      </div>
    </div>
  );
}
