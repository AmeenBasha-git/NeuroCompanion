import React, { useState } from "react";
import { questionaries } from "../services/UserForm";

function UserPortal() {
    const questions = questionaries;

    // store all answers initially empty
    const [answers, setAnswers] = useState({
        1: "", 2: "", 3: "", 4: "", 5: "", 6: "", 7: "", 8: "", 9: "", 10: "", 11: ""
    });

    const handleAnswerChange = (questionNumber, value) => {
        setAnswers((prev) => ({
            ...prev,
            [questionNumber]: value,
        }));
    };

    const [analyzed, setAnalyzed] = useState(false);
    const [resultVal, setResultVal] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // check if all questions answered
        const unanswered = Object.values(answers).some((ans) => ans === "");
        if (unanswered) {
            alert("Please answer all questions!");
            return;
        }

        // ✅ prepare payload (Yes = 0, No = 1)
        const payload = {};
        for (let i = 1; i <= 11; i++) {
            payload[`q${i}`] = parseInt(answers[i]); // send 0/1 as numbers
        }

        try {
            const res = await fetch("http://148.100.79.188:5002/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(`Error: ${data.error}`);
            } else {
                setAnalyzed(true);
                setResultVal(data.result);
                console.log("Features used:", data.features);
            }
        } catch (err) {
            console.error("Error connecting to Flask:", err);
            alert("Something went wrong connecting to the backend!");
        }
    };

    return (
        <div className="flex justify-center items-center mt-20">
            <div className="bg-white/50 backdrop-blur-sm flex flex-col gap-3 p-10 m-6 w-1/2 rounded-3xl shadow-lg">
                {/* Header */}
                <div className="flex flex-col justify-center items-center gap-3">
                    <div className="text-4xl font-bold text-gray-700">
                        Welcome to NeuroCompanion!
                    </div>
                    <div className="text-lg text-gray-500">
                        Let's begin your quick self-check for early signs of dementia.
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {questions.map((val, ind) => (
                        <div key={ind}>
                            <div className="border border-slate-300 rounded-xl font-semibold text-gray-800 px-6 py-4">
                                {`${ind + 1}. ${val}`}
                                <div className="flex mt-4">
                                    {/* ✅ Yes = 0, No = 1 */}
                                    <div className="flex gap-3 px-4">
                                        <input
                                            type="radio"
                                            name={`q${ind + 1}`}
                                            value="0"
                                            checked={answers[ind + 1] === "0"}
                                            onChange={(e) =>
                                                handleAnswerChange(ind + 1, e.target.value)
                                            }
                                            className="accent-blue-500 border-blue-500 scale-125"
                                        />
                                        <span>Yes</span>
                                    </div>
                                    <div className="flex gap-3 px-4">
                                        <input
                                            type="radio"
                                            name={`q${ind + 1}`}
                                            value="1"
                                            checked={answers[ind + 1] === "1"}
                                            onChange={(e) =>
                                                handleAnswerChange(ind + 1, e.target.value)
                                            }
                                            className="accent-blue-500 border-blue-500 scale-125"
                                        />
                                        <span>No</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 p-4 text-center text-white font-bold rounded-3xl hover:opacity-90 transition"
                    >
                        Analyze
                    </button>
                </form>

                {/* ✅ Result message */}
                {analyzed && (
                    <div
                        className={`mt-4 text-center px-6 py-4 rounded-3xl font-semibold ${resultVal === "Dementia"
                                ? "bg-red-100 border border-red-800 text-red-800"
                                : "bg-green-200 border border-green-800 text-green-800"
                            }`}
                    >
                        {resultVal === "Dementia"
                            ? "Our responses indicate mild signs that may require attention. Consider discussing them with a medical professional."
                            : "No significant dementia signs detected. Continue with healthy lifestyle habits and regular checkups."}
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserPortal;
