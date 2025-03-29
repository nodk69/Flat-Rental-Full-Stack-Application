import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileDropdown from "../../../signup/ProfileDropDown";
import NotificationIcon from "../../../notifications/NotificationIcon";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  //Fetch logged-in user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8080/auth/me", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data.");
        }

        const data = await response.json();
        setUser(data); // Set user data
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <header className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-500 hover:from-yellow-400 hover:to-orange-600 transition duration-500 ease-in-out transform hover:scale-105 ml-4"
        >
          RentEase
        </Link>

        {/* Navigation Menu */}
        <nav className="flex-grow text-center">
          <ul className="flex justify-center space-x-8 text-lg font-semibold">
            <li>
              <Link
                to="/about"
                className="hover:text-yellow-300 transition duration-300 ease-in-out relative group"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-yellow-300 transition duration-300 ease-in-out relative group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link
                to="/faq"
                className="hover:text-yellow-300 transition duration-300 ease-in-out relative group"
              >
                FAQ
                <span className="absolute -bottom-1 left-0 w-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right Section: Notifications & Profile */}
        <div className="flex items-center space-x-6">
          {/*Show Notifications for Logged-in Users */}
          {user && <NotificationIcon />} 

          {/*Show ProfileDropdown if user is logged in */}
          {user ? (
            <ProfileDropdown user={user} />
          ) : (
            <>
              <button
                className="hidden md:inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold px-6 py-2 rounded-full shadow-md hover:from-yellow-500 hover:to-orange-600 transition duration-300 ease-in-out transform hover:scale-105 mr-4 cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                SignUp
              </button>
              <button
                className="hidden md:inline-block bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold px-6 py-2 rounded-full shadow-md hover:from-blue-500 hover:to-purple-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
