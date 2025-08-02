import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { MdKeyboardArrowDown } from "react-icons/md";
import { logout } from "../../redux/slices/authSlice";

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { authenticated, role } = useSelector((state) => state.auth);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Disable body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent scroll
    } else {
      document.body.style.overflow = "auto"; // Re-enable scroll
    }
    return () => {
      document.body.style.overflow = "auto"; // Clean up when component is unmounted
    };
  }, [isOpen]);

  return (
    <nav>
      <div
        className={`${
          isOpen ? "overflow-hidden" : "overflow-auto"
        } relative mx-auto flex h-16 items-center justify-between px-4 select-none`}
      >
        {/* Hamburger Icon */}
        <div
          onClick={toggleMenu}
          className="z-[2000] mr-1 mt-1 flex h-7 w-8 cursor-pointer flex-col space-y-1"
          aria-expanded={isOpen}
          aria-controls="burger-menu"
        >
          <span
            className={`h-[4px] w-full transform rounded bg-[#3B235D] transition-transform duration-300 ease-in-out ${
              isOpen ? "origin-top-left rotate-45" : ""
            }`}
          ></span>
          <span
            className={`h-[4px] w-full rounded bg-[#3B235D] transition-transform duration-200 ease-in-out ${
              isOpen ? "scale-y-0" : ""
            }`}
          ></span>
          <span
            className={`h-[4px] w-full transform rounded bg-[#3B235D] transition-transform duration-300 ease-in-out ${
              isOpen ? "origin-bottom-left -rotate-45" : ""
            }`}
          ></span>
        </div>

        {/* Menu Items */}
        <ul
          id="burger-menu"
          className={`${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } fixed left-0 top-0 z-[200] flex h-full w-full flex-col items-center justify-start bg-white pt-[3.5rem] text-base text-gray-800 shadow-inner transition-transform duration-500 ease-in-out`}
        >
          <li className="w-full border-b-[1px] border-[#9fa6b2] py-2 ps-3 ltr:font-PoppinsSemiBold rtl:font-TajawalBold text-[#444444]">
            <Link to="Jobs" className="!no-underline" onClick={toggleMenu}>
              {t("jobs")}
            </Link>
          </li>

          <li className="w-full border-b-[1px] border-[#9fa6b2] py-2 ps-3 ltr:font-PoppinsSemiBold rtl:font-TajawalBold">
            <Link
              to="Companies"
              className="!no-underline"
              onClick={toggleMenu}
            >
              {t("companies")}
            </Link>
          </li>

          {/* Options with Dropdown */}
          <li className="w-full border-b-[1px] border-[#9fa6b2] py-2 ps-3 ltr:font-PoppinsSemiBold rtl:font-TajawalBold">
            <div
              onClick={toggleDropdown}
              className="cursor-pointer flex items-center justify-start"
              aria-expanded={isDropdownOpen}
              aria-controls="dropdown-menu"
            >
              {t("options")}
              <MdKeyboardArrowDown
                className={`text-xl transform transition-transform ${
                  isDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <ul
                id="dropdown-menu"
                className="ms-10 w-max ltr:font-PoppinsSemiBold rtl:font-TajawalBold border-gray-300"
              >
                <li className="px-3 py-2 text-sm border-b border-gray-300">
                  <Link
                    to="/Search"
                    onClick={toggleMenu}
                    className="!no-underline"
                  >
                    {t("Search")}
                  </Link>
                </li>
                <li className="px-3 py-2 text-sm border-b border-gray-300">
                  <Link
                    to="/Blog"
                    onClick={toggleMenu}
                    className="!no-underline"
                  >
                    {t("Blog")}
                  </Link>
                </li>
                <li className="px-3 py-2 text-sm border-b border-gray-300">
                  <Link
                    to="/AboutUsPage"
                    onClick={toggleMenu}
                    className="!no-underline"
                  >
                    {t("AboutUs")}
                  </Link>
                </li>
                <li className="px-3 py-2 text-sm">
                  <Link
                    to="/settings"
                    onClick={toggleMenu}
                    className="!no-underline"
                  >
                    {t("ContactUs")}
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <div className="mt-2 flex w-full items-center justify-center gap-x-[0.5rem]">
            {/* Log In Button */}
            {(!authenticated || (authenticated && role === "employer")) && (
              <Link to="LogIn" className="!no-underline" onClick={toggleMenu}>
                <button className="w-[6.5rem] ltr:font-PoppinsMedium h-[2rem] rtl:font-TajawalMedium text-sm rounded-md border-[1px] border-solid border-[#3B235D] text-[#3B235D]">
                  {t("logIn")}
                </button>
              </Link>
            )}

            {/* Log Out Button */}
            {authenticated && (
              <button
                onClick={() => dispatch(logout())}
                className="w-[5.8rem] rounded-md border-[1px] border-solid border-[#3B235D] ltr:font-PoppinsMedium h-[2rem] rtl:font-TajawalMedium text-sm text-[#3B235D]"
              >
                {t("logOut")}
              </button>
            )}

            {/* Sign Up Button */}
            {(!authenticated || (authenticated && role === "employer")) && (
              <Link to="SignUp" className="!no-underline" onClick={toggleMenu}>
                <button className="w-[5.8rem] rounded-md border-[1px] border-solid border-[#3B235D] h-[2rem] ltr:font-PoppinsMedium rtl:font-TajawalMedium text-sm text-[#3B235D]">
                  {t("signUp")}
                </button>
              </Link>
            )}

            {(!authenticated || (authenticated && role === "candidate")) && (
              <Link
                to="/employers/SignUp"
                className="cursor-pointer !no-underline"
              >
                <button className="w-[8.5rem] rounded-md border-[1px] border-solid border-[#3B235D] ltr:font-PoppinsMedium h-[2rem] rtl:font-TajawalMedium text-sm text-[#3B235D]">
                  {t("For Employers")}
                </button>
              </Link>
            )}
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default BurgerMenu;
