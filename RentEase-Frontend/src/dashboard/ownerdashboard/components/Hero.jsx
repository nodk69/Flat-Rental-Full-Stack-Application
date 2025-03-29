import { useContext } from "react";
import { UserContext } from "../../../signup/UserContext";


const Hero = () => {
  const { user } = useContext(UserContext); //Get user data from context
  const userName = user?.email?.split("@")[0] || "there"; //Extracting name

  return (
    <section className="bg-purple-100 p-6 rounded-lg text-center">
      <h1 className="text-2xl font-bold text-gray-800">Hi {userName}! 👋</h1>
      <p className="text-gray-600">Manage your property listings efficiently!</p>
    </section>
  );
};

export default Hero;
