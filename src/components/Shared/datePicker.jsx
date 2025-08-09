import React from "react";
import { DatePicker } from "antd";
import { useField } from "formik";
import dayjs from "dayjs";
import { BsExclamationCircle } from "react-icons/bs";

function Date({ label, name, ...props }) {
  const dateFormat = "YYYY-MM-DD";
  const [field, meta, helpers] = useField(name);

  const onChange = (date, dateString) => {
    helpers.setValue(dateString);
  };

  const onBlur = () => {
    helpers.setTouched(true);
  };

  return (
    <div className="flex w-full flex-col">
      <label
        htmlFor={name}
        className="ms-1 flex items-center text-[0.8rem] text-[#707070] ltr:font-PoppinsRegular rtl:font-TajawalMedium"
      >
        {label}
        {meta.touched && meta.error && (
          <BsExclamationCircle size={16} className="mx-1 mb-1 text-red-500" />
        )}
      </label>

      <DatePicker
        id={name}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={field.value ? dayjs(field.value, dateFormat) : null}
        placeholder="YYYY-MM-DD"
        minDate={dayjs("1970-06-01", dateFormat)}
        maxDate={dayjs("2010-12-31", dateFormat)}
        className="h-10 w-full !border-[1px] !border-[#dcd9d9] text-gray-700 !ring-0 placeholder:text-[#dcd9d9]"
        // Remove today highlight in AntD v5
        cellRender={(current, info) => {
          if (info.type === "date") {
            return (
              <div className="ant-picker-cell-inner">{current.date()}</div>
            );
          }
          return info.originNode;
        }}
        {...props}
      />

      {meta.touched && meta.error && (
        <div className="text-sm text-red-500">{meta.error}</div>
      )}
    </div>
  );
}

export default Date;
