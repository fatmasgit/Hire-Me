import React from "react";
import { useField } from "formik";
import { Select } from "antd";
import { BsExclamationCircle } from "react-icons/bs";
import { useTranslation } from "react-i18next";

const { Option } = Select;

const SelectDegreeField = ({ label, name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const { t } = useTranslation();

  const handleChange = (value) => {
    helpers.setValue(value);
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
      <Select
        {...field}
        {...props}
        id={name}
        value={field.value}
        onChange={handleChange}
        className="h-[2.4rem] w-full rounded-md !border-[#dcd9d9] text-[#dcd9d9] !outline-0 placeholder:text-[#dcd9d9]"
        placeholder={t("selectEducationLevel")}
      >
        <Option value="high_school">{t("highSchool")}</Option>
        <Option value="associate">{t("associateDegree")}</Option>
        <Option value="bachelor">{t("bachelorDegree")}</Option>
        <Option value="master">{t("masterDegree")}</Option>
        <Option value="doctorate">{t("doctorate")}</Option>
        <Option value="other">{t("other")}</Option>
      </Select>
      {meta.touched && meta.error && (
        <div className="mt-1 text-xs text-red-500">{meta.error}</div>
      )}
    </div>
  );
};

export default SelectDegreeField;
