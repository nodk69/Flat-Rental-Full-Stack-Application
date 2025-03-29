import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarProgress from "../components/SidebarProgress";
import Navbar from "../components/Navbar";
import { CheckCircleIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";

export default function Preview() {
  const navigate = useNavigate();
  const [propertyData, setPropertyData] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    const data = {
      basicDetails: JSON.parse(localStorage.getItem("basicDetails") || "{}"),
      propertyDetails: JSON.parse(localStorage.getItem("propertyDetails") || "{}"),
      priceDetails: JSON.parse(localStorage.getItem("priceDetails") || "{}"),
      advancedDetails: JSON.parse(localStorage.getItem("advancedDetails") || "{}"),
      selectedFlatFurnishings: JSON.parse(localStorage.getItem("selectedFlatFurnishings") || "[]"),
      selectedAmenities: JSON.parse(localStorage.getItem("selectedAmenities") || "[]"),
      verification: JSON.parse(localStorage.getItem("verification") || "{}"),
      uploadedFiles: JSON.parse(localStorage.getItem("uploadedFiles") || "[]"),
    };
  
    //File objects are properly restored
    //File objec can nt be stored in the local storage 
    //so when retrieving uploadedFiles, file is null, causing issues during submission.
    const restoredFiles = data.uploadedFiles.map((fileMeta) => ({
      ...fileMeta,
      file: null, // Placeholder for File object
    }));
  
    setPropertyData(data);
    setUploadedFiles(restoredFiles);
  }, []);
  

  if (!propertyData) {
    return <p className="text-center mt-10 text-gray-600">Loading preview...</p>;
  }

  //Final Submit Function
  const handleFinalSubmit = async () => {
    const formData = new FormData();
  
    // Append property details (excluding uploadedFiles)
    const cleanPropertyData = { 
      ...propertyData, 
      priceDetails: { 
        ...propertyData.priceDetails, 
        monthlyRent: propertyData.priceDetails.monthlyRent?.toString() || "0" // Default rent to "0" if empty
      }
    };
    // const propertyJson = { ...propertyData, uploadedFiles: undefined };
    // formData.append("propertyData", new Blob([JSON.stringify(propertyJson)], { type: "application/json" }));
    formData.append("propertyData", new Blob([JSON.stringify(cleanPropertyData)], { type: "application/json" }));
  

    //Check if all uploaded files have their `File` object
    const missingFiles = uploadedFiles.some((fileObj) => !fileObj.file);
  
    if (missingFiles) {
      alert("Some uploaded images are missing. Please re-upload them before submitting.");
  
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.multiple = true;
      fileInput.accept = "image/*";
  
      fileInput.onchange = (event) => {
        const selectedFiles = Array.from(event.target.files);
  
        if (selectedFiles.length !== uploadedFiles.length) {
          alert("Please select all images again before submitting.");
          return;
        }
  
        // Restore `File` objects in state
        const updatedFiles = uploadedFiles.map((fileObj, index) => ({
          ...fileObj,
          file: selectedFiles[index], // Attach the selected `File` object
        }));
  
        setUploadedFiles(updatedFiles);
  
        // Proceed with submission after restoring files
        submitForm(formData, updatedFiles);
      };
  
      fileInput.click();
      return;
    }
  
    // Append actual image files
    uploadedFiles.forEach((fileObj) => {
      formData.append("images", fileObj.file, fileObj.file.name);
    });
  
    submitForm(formData);
  };
  
  
  
  //Helper function to submit form after file selection
  const submitForm = async (formData) => {
    try {
      const response = await fetch("http://localhost:8080/flats", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
  
      if (response.ok) {
        localStorage.clear();
        navigate("/owner/success");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || "Failed to submit property."}`);
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Network error. Please check your connection.");
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        <SidebarProgress step={8} />
        <main className="flex-1 p-10">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Preview Your Listing</h2>

            {/* Render Property Data */}
            {Object.entries(propertyData).map(([section, details]) => (
              section !== "uploadedFiles" && (
                <div key={section} className="mb-6 border-b pb-4">
                  <h3 className="text-lg font-semibold text-gray-800 capitalize mb-2">
                    {section.replace(/([A-Z])/g, " $1")}
                  </h3>
                  {typeof details === "object" && details !== null ? (
                    <ul className="text-gray-600">
                      {Object.entries(details).map(([key, value]) => (
                        <li key={key} className="flex justify-between border-b py-2">
                          <span className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                          <span className="text-gray-700">
                            {Array.isArray(value) ? (value.length > 0 ? value.join(", ") : "N/A") : value || "N/A"}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">{details || "N/A"}</p>
                  )}
                </div>
              )
            ))}

            {/*Render Uploaded Images */}
            {uploadedFiles.length > 0 && (
              <div className="mt-6 grid grid-cols-4 gap-4">
                {uploadedFiles.map((fileObj, index) => (
                  <div key={index} className="relative w-24 h-24 border rounded-lg overflow-hidden">
                    <img
                      src={fileObj.blob || fileObj.url}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => navigate("/verify")}
                className="flex items-center gap-2 px-6 py-2 bg-gray-500 text-white rounded-md"
              >
                <ArrowLeftIcon className="w-5 h-5" /> Back
              </button>
              <button
                onClick={handleFinalSubmit}
                className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-md"
              >
                <CheckCircleIcon className="w-5 h-5" /> Confirm & Submit
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
