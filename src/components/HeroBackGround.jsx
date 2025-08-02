import React from "react";
import Nav from "./nav/Nav";

export default function HeroBackGround({ children }) {
  return (
    <div className="w-full">
      {/*     <Nav/> */}
      <div className="overlay h-[21rem] w-full bg-Hero bg-cover bg-no-repeat xs:bg-left">
        {" "}
        {/*  h-[calc(100vw/45*22)] */}
        <div className="h-full w-full bg-overlay">{children}</div>
      </div>
    </div>
  );
}
