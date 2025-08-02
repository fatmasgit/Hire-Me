import React from "react";
import { DatePicker } from "antd";
import { useField } from "formik";
import dayjs from "dayjs";
import { BsExclamationCircle } from "react-icons/bs"; // Import the exclamation circle icon

function Date({ label, name, ...props }) {
  const dateFormat = "YYYY-MM-DD";
  const [field, meta, helpers] = useField(name);

  // Handle date change and update Formik state
  const onChange = (date, dateString) => {
    helpers.setValue(dateString);  // Update Formik field value
  };

  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor={name}
        className="ms-1 ltr:font-PoppinsRegular rtl:font-TajawalMedium  text-[0.8rem] text-[#707070] flex items-center"
      >
        {label}
        {meta.touched && meta.error && (
          <BsExclamationCircle size={16} className="text-red-500 mx-1 mb-1" /> // Exclamation icon beside the label
        )}
      </label>
      <DatePicker
        id={name}
        {...field}
        {...props}
        onChange={onChange}
        value={field.value ? dayjs(field.value, dateFormat) : null}
        placeholder="YYYY-MM-DD"
        minDate={dayjs("1970-06-01", dateFormat)}
        maxDate={dayjs("2010-12-31", dateFormat)}
        className='  h-[2.4rem] w-full !border-[1px] !border-[#dcd9d9]   text-gray-700 !ring-0 placeholder:text-[#dcd9d9] '
        popupClassName="xs:w-[5rem]"
        needConfirm
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm">{meta.error}</div>
      ) : null}
    </div>
  );
}

export default Date;
