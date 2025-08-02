import React from "react";
import { useField } from "formik";
import { Select } from "antd"; // Assuming you are using Ant Design
import { BsExclamationCircle } from "react-icons/bs"; // Import the exclamation icon

const { Option } = Select;

const SelectDegreeField = ({ label, name, ...props }) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (value ,) => {
    helpers.setValue(value); // Set the selected value to Formik state
  };

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label
          htmlFor={name}
          className="ms-1  ltr:font-PoppinsRegular rtl:font-TajawalMedium  text-[0.8rem] text-[#707070] flex items-center"
        >
          {label}
          {meta.touched && meta.error && (
            <BsExclamationCircle size={16} className="text-red-500 mx-1 mb-1" />
          )}
        </label>
      )}
      <Select
        {...field}
        {...props}
        id={name}
        value={field.value}
        onChange={handleChange}
        className='h-[2.4rem] w-full rounded-md !border-[#dcd9d9] text-[#dcd9d9] 
          !outline-0 placeholder:text-[#dcd9d9] '
        placeholder="Select Education Level"
      >
        <Option value="high_school">High School</Option>
        <Option value="associate">Associate's Degree</Option>
        <Option value="bachelor">Bachelor's Degree</Option>
        <Option value="master">Master's Degree</Option>
        <Option value="doctorate">Doctorate</Option>
        <Option value="other">Other</Option>
      </Select>
      {meta.touched && meta.error && (
        <div className="text-red-500 text-xs mt-1">{meta.error}</div>
      )}
    </div>
  );
};

export default SelectDegreeField;
