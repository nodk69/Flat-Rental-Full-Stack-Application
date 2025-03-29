import { CheckCircleIcon } from "@heroicons/react/24/solid";

const SidebarProgress = ({ step }) => {
  const steps = [
    "Basic Details",
    "Property Details",
    "Price Details",
    "Photos",
    "Advanced Details",
    "Amenities",
    "Verify",
    "Preview",
  ];

  // Ensure step does not exceed total steps
  const currentStep = Math.min(step, steps.length - 1);
  const progressPercent = ((currentStep / (steps.length - 1)) * 100).toFixed(0);

  return (
    <aside className="w-1/4 bg-white p-6 shadow-md border-r border-gray-200">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Post Your Property</h2>

      {/* Progress Bar */}
      <div className="relative w-full h-2 bg-gray-200 rounded-full mb-6">
        <div
          className="absolute h-2 bg-green-500 rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      <ul className="mt-4 space-y-4">
        {steps.map((item, index) => (
          <li key={index} className="relative flex items-center space-x-3">
            {/* Step Number / Check Icon */}
            {index < currentStep ? (
              <CheckCircleIcon className="w-6 h-6 text-green-500" />
            ) : (
              <span
                className={`w-6 h-6 flex items-center justify-center rounded-full text-sm font-semibold transition-all ${
                  index === currentStep ? "bg-purple-500 text-white" : "bg-gray-300 text-gray-700"
                }`}
              >
                {index + 1}
              </span>
            )}

            {/* Step Name */}
            <span
              className={`text-lg font-medium transition-all ${
                index < currentStep ? "text-green-600" : index === currentStep ? "text-purple-600" : "text-gray-500"
              }`}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SidebarProgress;
