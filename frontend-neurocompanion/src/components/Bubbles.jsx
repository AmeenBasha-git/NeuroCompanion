import React from "react";

function Bubbles() {
  return (
    <>
      <div className="absolute bg-blue-300/50 h-40 w-40 top-20 left-5 rounded-full blur-xl overflow-hidden delay-0"></div>
      <div className="absolute bg-purple-300/50 h-40 w-40 right-60 top-80 rounded-full blur-lg overflow-hidden delay-400 sm:block hidden"></div>
    </>
  );
}

export default Bubbles;
