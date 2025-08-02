import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../components/nav/Nav";
import BurgerNav from "../components/nav/burgerMenuNav";
import Footer from "../components/Footer/Footer";

export default function AppNavigation() {
  return (
    <div>
      <Nav />
       <BurgerNav /> 
      <Outlet />
      <Footer />
    </div>
  );
}
