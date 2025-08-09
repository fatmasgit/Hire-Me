import React from "react";
import { useField } from "formik";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { BsExclamationCircle } from "react-icons/bs";

function YearsDate({ label, name, ...props }) {
  const [field, meta, helpers] = useField(name);

  const handleChange = (date, dateString) => {
    helpers.setValue(dateString);
  };

  const handleBlur = () => {
    helpers.setTouched(true);
  };

  return (
    <div className="flex w-full flex-col">
      {label && (
        <label
          htmlFor={name}
          className="ms-1 flex items-center text-[0.8rem] text-[#707070] ltr:font-PoppinsRegular rtl:font-TajawalMedium"
        >
          {label}
          {meta.touched && meta.error && (
            <BsExclamationCircle size={16} className="mx-1 mb-1 text-red-500" />
          )}
        </label>
      )}

      <DatePicker
        id={name}
        name={name}
        picker="year"
        format="YYYY"
        onChange={handleChange}
        onBlur={handleBlur}
        minDate={dayjs("1970")}
        maxDate={dayjs("2024")}
        value={field.value ? dayjs(field.value, "YYYY") : null}
        className="h-[2.4rem] w-full !border px-2 font-PoppinsRegular text-sm outline-none placeholder:text-[#dcd9d9]"
        // Remove highlight from current year (AntD v5)
        cellRender={(current, info) => {
          if (info.type === "year") {
            return (
              <div className="ant-picker-cell-inner">{current.year()}</div>
            );
          }
          return info.originNode;
        }}
        {...props}
      />

      {meta.touched && meta.error && (
        <div className="mt-1 text-xs text-red-500">{meta.error}</div>
      )}
    </div>
  );
}

export default YearsDate;
