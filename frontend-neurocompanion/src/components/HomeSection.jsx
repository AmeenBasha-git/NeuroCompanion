import React from "react";
import { Link } from "react-router-dom";
import Sthethescope from "../icons/Sthethescope";
import UserLogo from "../icons/UserLogo";
import Bubbles from "./Bubbles";
import UnderstandDementia from "./UnderstandDementia";
import FAQsection from "./FAQsection";

function HomeSection() {
  return (
    <>
      <div className="px-6 py-4 mt-32">
        <h1 className="text-6xl text-gray-600 font-bold text-center">
          AI companion for doctors and users
        </h1>
        <h3 className="text-2xl mt-10 text-gray-500 text-center">
          Where AI meets neuroscience — detecting cognitive decline with
          precision
        </h3>
        <h5 className="text-xl mt-14 text-gray-600 font-semibold text-center">
          Are you a?
        </h5>
        <div className="mt-10 flex justify-center gap-10">
          <Link
            to={"/doctor-login"}
            className="px-14 py-3 bg-gradient-to-br group hover:scale-110 transition-transform from-blue-500 to-purple-500 text-white font-semibold flex gap-2 justify-center items-center rounded-xl"
          >
            <Sthethescope />
            Doctor
          </Link>
          <Link
            to={"/user-portal"}
            className="px-14 py-3 group hover:scale-110 transition-transform hover:text-white flex gap-2 justify-center items-center rounded-xl border-2 border-blue-600 hover:bg-blue-600"
          >
            <UserLogo />
            User
          </Link>
        </div>
        <UnderstandDementia />
        <FAQsection />
      </div>
    </>
  );
}

export default HomeSection;
