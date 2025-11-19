import React from "react";
import { aboutTopic } from "../services/AboutTopics";
import { Bold } from "lucide-react";

function AboutSection() {
  const aboutContent = aboutTopic;
  return (
    <div className="mt-28">
      <h1 className="text-5xl text-gray-600 font-bold text-center">
        About our Mission
      </h1>
      <div className="flex w-full justify-center">
        <div className="h-1 w-40 mt-7 bg-gradient-to-r from-blue-500 to-purple-500" />
      </div>
      <div>
        <h1 className="text-gray-500 font-semibold mt-5 text-center text-xl">
          Transforming dementia care through artificial intelligence
        </h1>
      </div>
      <div className="flex justify-center items-center mb-6">
        <div className="flex flex-col gap-6 mt-5 w-3/4 justify-center">
          {aboutContent.map((val) => {
            const Logo = val.logoName;
            return (
              <div className="bg-white px-10 py-5 flex gap-4 rounded-xl hover:scale-110 duration-300">
                <div>
                  <div className="bg-gradient-to-br p-3 rounded-xl from-blue-500 to-purple-500">
                    <Logo />
                  </div>
                </div>
                <div className="flex flex-col gap-3 px-2">
                  <h3 className="text-2xl text-gray-600 font-bold">
                    {val.head}
                  </h3>
                  <p className="text-gray-500">{val.content}</p>
                  {val.head === "Who We Serve" ? (
                    <ul className="list-disc list-inside text-gray-500">
                      <li className="flex ">
                        <b>Healthcare Professionals: </b>
                        <p className="text-gray-500">
                          Access advanced diagnostic tools and patient
                          management resources
                        </p>
                      </li>
                      <li className="flex ">
                        <b>Individuals & Families: </b>
                        <p className="text-gray-500">
                          Take proactive steps with easy-to-use screening
                          assessments and educational resources
                        </p>
                      </li>
                    </ul>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
