import React, { useState, useEffect } from "react";
import JobsCarousel from "../components/Home/JobsCarousel";
import HeroSection from "../components/Home/HeroSection";
import Categories from "../components/Home/Categories";
import HeroCards from "../components/Home/HeroCards";
import CampaniesCarousel from "../components/Home/companiesCarousel";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300); // show after scrolling 300px
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full relative">
      <HeroSection />
      <HeroCards />
      <JobsCarousel />
      <Categories />
      <CampaniesCarousel />

      {/* Floating Scroll to Top Button */}
      {showButton && (
        <Fab
          onClick={scrollToTop}
          sx={{
            position: "absolute",
            bottom: -40,
            [isRTL ? "left" : "right"]: 40, // respect RTL
            zIndex: 1000,
            backgroundColor: "#3B235D", // dark purple
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#4D2B7C", // slightly lighter on hover
            },
          }}
          aria-label="scroll back to top"
        >
          <KeyboardArrowUpIcon />
        </Fab>
      )}
    </div>
  );
}
