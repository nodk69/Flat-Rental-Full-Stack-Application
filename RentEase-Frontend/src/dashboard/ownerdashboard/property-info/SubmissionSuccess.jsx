import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function SubmissionSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex flex-1 justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-lg">
          <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700">Your Property Deatils have been submitted!</h2>
          <p className="text-gray-600 mt-2">
            Your property listing is now under review. Our team will verify the details and approve it shortly.
          </p>
          <button
            onClick={() => navigate("/owner/dashboard")}
            className="mt-6 px-6 py-2 bg-green-500 text-white rounded-md font-medium hover:bg-green-600 transition"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
