import React, { useState, useRef } from "react";

const OTPInput = ({ length = 6 }) => {
  const [otp, setOtp] = useState(new Array(length).fill("")); 
  const inputRefs = useRef([]);


  const handleChange = (element, index) => {
    const value = element.value;
    if (isNaN(value)) return; 

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

  
    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }


    if (newOtp.every((digit) => digit !== "")) {
   
    }
  };


  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };


  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").slice(0, length);
    const pasteArray = paste.split("").filter((char) => !isNaN(char));

    if (pasteArray.length === length) {
      setOtp(pasteArray);
      alert(`OTP entered: ${pasteArray.join("")}`);
      inputRefs.current[length - 1].focus();
    }
  };

  return (
    <div className="flex space-x-2 mx-auto">
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputRefs.current[index] = el)}
          onPaste={handlePaste}
          className="h-12 w-10 rounded border text-center font-PoppinsRegular ring-1 ring-[#c5b9d5] focus:outline-none"
        />
      ))}
    </div>
  );
};

export default OTPInput;
