import React, { useState } from "react";
import Sthethescope from "../icons/Sthethescope";
import { Link } from "react-router-dom";

function DoctorSignup() {
  const [signupDetails, setSignupDetails] = useState({
    docid: "",
    email: "",
    password: "",
  });
  const setChange = (e) => {
    setSignupDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const signupFunc = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/signup-doctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          docid: signupDetails.docid,
          email: signupDetails.email,
          password: signupDetails.password,
        }),
      }); const data = await res.json();
      if (!res.ok) {
        alert(`Signup failed: ${data.error}`);
      } else {
        alert("Signup successful!");
        console.log("User:", data.user);
      }
    } catch (err) {
      console.error("Error during signup:", err);
      alert("Something went wrong!");
    }
  }

  return (
    <div className="flex justify-center items-center w-full mt-40 mb-6">
      <div className="bg-white flex flex-col gap-4 py-5 px-10 w-1/3">
        <div className="flex justify-center items-center">
          <div className="bg-blue-200 p-3 rounded-full">
            <Sthethescope doctorLogin={true} />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <h1 className="text-3xl text-gray-600 font-bold">
            Create Doctor Account
          </h1>
          <p className="text-base text-gray-500">
            Join NeuroCompanion as a medical professional
          </p>
        </div>
        <form onSubmit={signupFunc}>
          <div className="w-full flex flex-col gap-3">
            <label htmlFor="docid" className="text-gray-800 font-semibold">
              Doctor ID
            </label>
            <input
              type="text"
              name="docid"
              id="docid"
              value={signupDetails.docid}
              onChange={(e) => setChange(e)}
              className="rounded-lg border-2 border-slate-300 bg-slate-50 px-4 py-1"
            />
          </div>
          <div className="w-full flex flex-col gap-3 mt-3">
            <label htmlFor="email" className="text-gray-800 font-semibold">
              Email ID
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={signupDetails.email}
              onChange={(e) => setChange(e)}
              className="rounded-lg border-2 border-slate-300 bg-slate-50 px-4 py-1"
            />
          </div>
          <div className="mt-3 w-full flex flex-col gap-3">
            <label htmlFor="password" className="text-gray-800 font-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={signupDetails.password}
              onChange={(e) => setChange(e)}
              className="rounded-lg border-2 border-slate-300 bg-slate-50 px-4 py-1"
            />
          </div>
          <div className="mt-3">
            <button
              type="submit"
              className="font-semibold bg-gradient-to-r p-3 from-blue-500 to-purple-500 w-full text-white rounded-xl hover:scale-110 duration-300"
            >
              Signup
            </button>
          </div>
        </form>
        <div className="w-full flex justify-center font-semibold">
          <p>Already have an account?</p>
          <Link to={"/doctor-login"} className="ml-3 text-blue-500">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
export default DoctorSignup;
