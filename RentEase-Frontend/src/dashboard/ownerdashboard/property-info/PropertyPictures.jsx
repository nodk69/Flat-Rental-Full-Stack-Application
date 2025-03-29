import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CloudArrowUpIcon, XCircleIcon } from "@heroicons/react/24/solid";
import SidebarProgress from "../components/SidebarProgress";
import Navbar from "../components/Navbar";

export default function PropertyPictures() {
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState([]);

  //Load saved images from localStorage
  useEffect(() => {
    localStorage.setItem("progress", "Property Pictures");
    const storedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
    setUploadedFiles(storedFiles);
  }, []);

  //Handle File Upload (Store only URLs as strings)
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
  
    const newFiles = files.map((file) => ({
      name: file.name,
      type: file.type,
      size: file.size,
      blob: URL.createObjectURL(file), // Temporary preview
      file, // Store actual File object in state
    }));
  
    setUploadedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles, ...newFiles];
  
      //Store only metadata in localStorage (exclude the file object)
      localStorage.setItem(
        "uploadedFiles",
        JSON.stringify(updatedFiles.map(({ file, ...rest }) => rest)) // Exclude File object
      );
  
      return updatedFiles;
    });
  };
  
  
  //Remove an uploaded file
  const removeFile = (index) => {
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(updatedFiles);
    localStorage.setItem("uploadedFiles", JSON.stringify(updatedFiles));
  };

  //Handle Next Button Click
  const handleNext = () => {
    localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles));
    navigate("/owner/details");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        <SidebarProgress step={3} />
        <main className="flex-1 p-10">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">✔ Upload Property Images</h2>

            {/* Upload Photos Section */}
            <div className="border-2 border-dashed border-gray-400 p-6 rounded-lg text-center">
              <CloudArrowUpIcon className="w-16 h-16 text-gray-500 mx-auto mb-3" />
              <p className="text-gray-600">Drag and drop here</p>
              <p className="text-gray-400">or</p>
              <label className="cursor-pointer mt-2 inline-block bg-purple-500 text-white px-4 py-2 rounded-md">
                Browse Files
                <input type="file" multiple className="hidden" onChange={handleFileUpload} accept="image/*" />
              </label>
            </div>

            {/*Image Preview */}
            {uploadedFiles.length > 0 && (
              <div className="mt-6 grid grid-cols-4 gap-4">
                {uploadedFiles.map((url, index) => (
                  <div key={index} className="relative w-24 h-24 border rounded-lg overflow-hidden">
                    <img src={url} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                    <button
                      className="absolute top-1 right-1 bg-white rounded-full p-1 text-red-500"
                      onClick={() => removeFile(index)}
                    >
                      <XCircleIcon className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="mt-6 w-full bg-green-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-600"
            >
              Next, Add Advanced Details
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
