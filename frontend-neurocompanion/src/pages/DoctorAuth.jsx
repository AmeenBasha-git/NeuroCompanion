import React, { useState } from "react";
import Sthethescope from "../icons/Sthethescope";
import { Link, useNavigate } from "react-router-dom";

function DoctorAuth() {
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const setChange = (e) => {
    setLoginDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const loginSubmission = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/login-doctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetails)
      });
      const data = await res.json();

      if (!res.ok) {
        alert(`Login failed: ${data.error}`);
      } else {

        localStorage.setItem("doctorSession", JSON.stringify({
          token: data.session.access_token,
          docid: data.docid,
          email: data.user.email,
        }));

        navigate("/doctor-portal");
      }
    } catch (err) {
      console.error("Error during login:", err);
      alert("Something went wrong during login!");
    }
  }
  return (
    <div className="flex justify-center items-center w-full mt-24">
      <div className="bg-white flex flex-col gap-4 py-5 px-10 w-1/3">
        <div className="flex justify-center items-center">
          <div className="bg-blue-200 p-3 rounded-full">
            <Sthethescope doctorLogin={true} />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <h1 className="text-3xl text-gray-600 font-bold">Doctor Portal</h1>
          <p className="text-lg text-gray-500">
            Sign in to access your dashboard
          </p>
        </div>
        <form onSubmit={loginSubmission}>
          <div className="w-full flex flex-col gap-3">
            <label htmlFor="email" className="text-gray-800 font-semibold">
              Email ID
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={loginDetails.email}
              onChange={(e) => setChange(e)}
              className="rounded-lg border-2 border-slate-300 bg-slate-50 px-4 py-1"
            />
          </div>
          <div className="mt-3 w-full flex flex-col gap-3">
            <label htmlFor="email" className="text-gray-800 font-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={loginDetails.password}
              onChange={(e) => setChange(e)}
              className="rounded-lg border-2 border-slate-300 bg-slate-50 px-4 py-1"
            />
          </div>
          <div className="mt-3">
            <button
              type="submit"
              className="font-semibold bg-gradient-to-r p-3 from-blue-500 to-purple-500 w-full text-white rounded-xl hover:scale-110 duration-300"
            >
              Login
            </button>
          </div>
        </form>
        <div className="w-full flex justify-center font-semibold">
          <p>New Here ? </p>
          <Link to={"/doctor-signup"} className="ml-3 text-blue-500">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DoctorAuth;
