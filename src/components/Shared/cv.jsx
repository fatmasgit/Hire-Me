import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MdOutlineFileUpload, MdOutlineFileDownload } from "react-icons/md";

function FileUpload({ name, onChange, value }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const { t } = useTranslation();
  // console.log(value)

  useEffect(() => {
    if (value instanceof File) {
      const url = URL.createObjectURL(value);
      setPreviewUrl(url);

      return () => URL.revokeObjectURL(url); // Cleanup on unmount or when file changes
    } else if (typeof value === "string") {
      setPreviewUrl(value); // For pre-existing URL in case of profile edit
    } else {
      setPreviewUrl(null);
    }
  }, [value]);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      onChange(name, selectedFile); // Update Formik state
    }
  };

  return (
    <div className="flex h-fit py-3 items-center justify-center rounded-lg gap-y-3 bg-[#EAE8ED]">
      {/* Download CV */}
      {previewUrl && (
        <a
          href={previewUrl}
          download
          target="_blank"
          className="w-[45%] cursor-pointer object-contain flex flex-col items-center justify-start gap-y-1 !no-underline"
        >
          <p className="cursor-pointer ltr:font-PoppinsRegular rtl:font-TajawalMedium text-base">
            {t("downloadCV")}
          </p>
          <MdOutlineFileDownload size={30} color="#3B235D" />
        </a>
      )}

      {/* Upload CV */}
      <div className="w-[45%] flex flex-col justify-start items-center gap-y-1">
        <label
          htmlFor="cv"
          className="cursor-pointer ltr:font-PoppinsRegular rtl:font-TajawalMedium text-base"
        >
          {previewUrl ? t("changeCV") : t("uploadCV")}
        </label>
        <input
          type="file"
          id="cv"
          className="hidden"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          ref={fileInputRef}
        />

        <div onClick={handleClick} className="cursor-pointer object-contain">
          <MdOutlineFileUpload size={30} color="#3B235D" />
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
