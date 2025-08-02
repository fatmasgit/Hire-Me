import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Navigate, useNavigate } from "react-router-dom";

const OTPRequestComponent = () => {
  const [account, setAccount] = useState("");
  const [error, setError] = useState("");
  const navigate =useNavigate()

  const handleSendOTP = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(account)) {
      setError("Please enter a valid email address.");
    } else {
      setError(""); 
      navigate('/verifyOtp')
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#b2afaf]">
      <div className="flex w-[20rem] flex-col items-center justify-start gap-y-3 rounded-sm bg-white px-3 py-1">
        <div className="flex w-full flex-row items-center justify-between">
          <p className="mx-auto pt-3 font-PoppinsMedium text-[1.3rem] text-[#444444]">
            Forget Password
          </p>
          <p className="!self-start text-[#444444] mt-2">
            <IoClose size={22} />
          </p>
        </div>

        <span className="font-PoppinsRegular text-[0.8rem] text-[#444444] text-center">
          We will send a code to your email to verify your email to set the new
          password
        </span>

        <input
          className="w-full rounded-md border-[1px] border-[#B6B6B6] p-2 font-PoppinsRegular outline-none placeholder:font-PoppinsRegular"
          type="email"
          placeholder="Enter your email"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleSendOTP}
          className={`mb-3 mt-1 w-full rounded-sm p-2 font-PoppinsRegular text-white ${
            account
              ? "bg-[#3B235D] cursor-pointer"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Send OTP
        </button>
      </div>
    </div>
  );
};

export default OTPRequestComponent;
