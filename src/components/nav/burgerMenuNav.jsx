import React from "react";
import BurgerMenu from "./Burgermenu";
import LangButton from "./arEnButton";
import { Link } from "react-router-dom";

export default function BurgerNav() {
  return (
    <div className="xs:block lg:hidden">
      <div className="relative flex w-full items-center justify-end xs:h-[3.5rem]">
        <div className="flex h-full w-[95%] items-center justify-between">
        <Link to="/" className="!no-underline z-[3000]">
               <img
                 className=" xs:w-[8rem] object-contain me-3"
                 src="/assets/Logo/logo.png"
               />
             </Link>

          <div className="flex items-center justify-center">
            <LangButton />
            <BurgerMenu />
          </div>
        </div>

        {/* nav buttons */}
      </div>
    </div>
  );
}


