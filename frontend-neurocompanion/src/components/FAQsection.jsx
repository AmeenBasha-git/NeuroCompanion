import React from "react";
import AccordionFAQs from "./AccordionFAQs";

function FAQsection() {
  return (
    <div className="mt-40">
      <h2 className="text-4xl text-gray-700 font-bold text-center">
        Frequently Asked Questions (FAQs)
      </h2>
      <div className="flex w-full justify-center">
        <div className="h-1 w-40 mt-7 bg-gradient-to-r from-blue-500 to-purple-500" />
      </div>
      <div className="flex w-full justify-center mt-7">
        <AccordionFAQs />
      </div>
    </div>
  );
}

export default FAQsection;
