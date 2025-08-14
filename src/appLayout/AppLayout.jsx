import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../components/nav/Nav";
import BurgerNav from "../components/nav/BurgerMenuNav";
import Footer from "../components/footer/Footer";

export default function AppLayout() {
    return (
        <div>
            <Nav />
            <BurgerNav />
            <Outlet />
            <Footer />
        </div>
    );
}
