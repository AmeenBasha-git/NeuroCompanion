import React from "react";
import Navbar from "../components/Navbar";
import { Route, Routes } from "react-router-dom";
import HomeSection from "../components/HomeSection";
import AboutSection from "../components/AboutSection";

function LandingPage() {
  return (
    <div>
      <HomeSection />
    </div>
  );
}

export default LandingPage;
