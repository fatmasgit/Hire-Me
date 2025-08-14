import React, { useState } from "react";
import profile from "./profile.svg";
import { useTranslation } from "react-i18next";

const ProfilePhotoUpload = ({ onChange, value, name }) => {
  const [profilePhoto, setProfilePhoto] = useState(value || null);
  const { t } = useTranslation();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
        onChange(name, file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfilePhoto(null);
    onChange(name, null);
  };

  // displaying the image: either profilePhoto, candidate imageUrl, or default profile
  const displayImage = profilePhoto || profile;

  return (
    <div className="max-max-h-36 mx-auto flex w-1/2 flex-col items-center justify-end">
      <div className="relative">
        <img
          src={profilePhoto || profile}
          alt="Profile"
          className="h-28 w-28 rounded-full object-cover"
        />
        {profilePhoto && (
          <button
            onClick={handleRemoveImage}
            className="absolute right-0 top-0 mr-2 mt-2 rounded-full bg-[#3B235D] p-1 shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-4 w-4 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
      <label
        htmlFor="file"
        className="mt-1 h-6 w-full cursor-pointer text-center text-sm text-[#3B235D] ltr:font-PoppinsMedium rtl:font-TajawalMedium"
      >
        {t("uploadImage")}
      </label>
      <input
        type="file"
        id="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ProfilePhotoUpload;
