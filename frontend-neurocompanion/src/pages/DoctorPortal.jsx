import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

function DoctorPortal() {
    const [prediction, setPrediction] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewURL, setPreviewURL] = useState(null);

    const { docid } = JSON.parse(localStorage.getItem("doctorSession"));
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/*": []
        },
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            if (file) {
                setPreviewURL(URL.createObjectURL(file));
                setSelectedImage(file)
            }
        }
    });

    const handleAnalyze = async () => {
        if (!selectedImage) {
            alert("Please select an image first!");
            return;
        }

        const formData = new FormData();
        formData.append("image", selectedImage);

        try {
            const res = await fetch("http://148.100.79.188:5002/predict-image", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                alert(`Error: ${data.error || "Unknown error"}`);
            } else {
                setPrediction(data.predicted_class);
            }
        } catch (err) {
            console.error("Error sending image:", err);
            alert("Something went wrong! Check console for details.");
        }
    };


    return (
        <div className="flex flex-col justify-center items-center mt-24">
            <h1 className="text-3xl font-bold text-gray-700 mb-6">
                {`Welcome Doctor ${docid}`}
            </h1>
            <div className="w-1/2 bg-white/50 p-10 flex flex-col gap-6 items-center justify-center">
                <div
                    {...getRootProps()}
                    className="w-full h-64 border-2 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center cursor-pointer bg-gray-50/50 hover:bg-gray-100/50"
                >
                    <input {...getInputProps()} />
                    {previewURL ? (
                        <img
                            src={previewURL}
                            alt="Preview"
                            className="w-40 h-40 object-cover rounded-lg"
                        />
                    ) : (
                        <>
                            <p className="text-gray-500">Drag & Drop your image here</p>
                            <p className="text-gray-400 text-sm mt-2">or click to select</p>
                        </>
                    )}
                </div>
                <button onClick={handleAnalyze} className="bg-gradient-to-r w-full from-blue-500 to-purple-500 p-4 text-center text-white font-bold rounded-3xl">Analyze</button>

                {prediction && (
                    <div className="mt-4 p-4 bg-blue-100 border border-blue-500 rounded-lg text-center font-semibold">
                        Predicted Class: {prediction}
                    </div>
                )}
            </div>
        </div>
    );
}

export default DoctorPortal;