import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AnimatedBackground from "./components/AnimatedBackground";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import { Route, Routes } from "react-router-dom";
import AboutSection from "./components/AboutSection";
import DoctorAuth from "./pages/DoctorAuth";
import DoctorSignup from "./pages/DoctorSignup";
import UserPortal from "./pages/UserPortal";
import DoctorPortal from "./pages/DoctorPortal";
import PrivateDoctorRoute from "./routes/PrivateDoctorRoute";

function App() {
  return (
    <div>
      <AnimatedBackground />
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutSection />} />
        <Route path="/doctor-login" element={<DoctorAuth />} />
        <Route path="/doctor-signup" element={<DoctorSignup />} />
        <Route path="/user-portal" element={<UserPortal />} />
        <Route path="/doctor-portal" element={
          <PrivateDoctorRoute>
            <DoctorPortal />
          </PrivateDoctorRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
