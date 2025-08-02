import React from "react";
import { useField } from "formik";
import { DatePicker } from "antd"; // Assuming you're using Ant Design
import dayjs from "dayjs";
import { BsExclamationCircle } from "react-icons/bs"; // Import the exclamation icon

function YearsDate({ label, name, ...props }) {
  const [field, meta, helpers] = useField(name);

  const handleChange = (date, dateString) => {
  //  console.log(dateString); 
    helpers.setValue(dateString); 
  };




  return (
    <div className="flex flex-col w-full">
      {label && (
        <label
          htmlFor={name}
          className="ms-1 ltr:font-PoppinsRegular rtl:font-TajawalMedium  text-[0.8rem] text-[#707070] flex items-center"
        >
          {label}
          {meta.touched && meta.error && (
            <BsExclamationCircle size={16} className="text-red-500 mx-1 mb-1" />
          )}
        </label>
      )}
      <DatePicker
        {...field}
        {...props}
        id={name}
        name ={name}
        onChange={handleChange}
        picker="year"
        format="YYYY"
        className="h-[2.4rem] w-full !border px-2 font-PoppinsRegular text-[0.8rem] placeholder:text-[#dcd9d9] outline-none"
        minDate={dayjs("1970")}
        maxDate={dayjs("2024")}
        value={field.value ? dayjs(field.value, "YYYY") : null} // Ensure proper value format
      />
      {meta.touched && meta.error && (
        <div className="text-red-500 text-xs mt-1">{meta.error}</div>
      )}
    </div>
  );
}

export default YearsDate;
