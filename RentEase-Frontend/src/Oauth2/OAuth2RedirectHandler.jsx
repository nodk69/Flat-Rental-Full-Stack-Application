import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { saveRole } from "../utils/authUtils";

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const role = params.get("role");

    if (!role) {
      navigate("/login"); //Redirect to login if role is missing
      return;
    }

    saveRole(role); // Save role in local storage

    switch (role) {
      case "OWNER":
        navigate("/owner/dashboard");
        break;
      case "TENANT":
        navigate("/");
        break;
      case "ADMIN":
        navigate("/admin/dashboard");
        break;
      default:
        navigate("/login");
    }
  }, [navigate, location]);

  return <p className="text-center text-lg font-semibold py-10">Logging you in...</p>;
};

export default OAuth2RedirectHandler;
