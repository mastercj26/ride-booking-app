import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const role = urlParams.get("role");

    if (token && role) {
      if (role === "user") {
        localStorage.setItem("userToken", token);
        navigate("/home");
      } else if (role === "caption") {
        localStorage.setItem("captionToken", token);
        navigate("/caption-home");
      }
    } else {
      navigate("/user-login"); // fallback
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg text-center">
        <h1 className="text-xl font-bold mb-4">Logging you in...</h1>
        <p className="text-sm text-gray-500">Please wait while we redirect you.</p>
      </div>
    </div>
  );
};

export default GoogleAuthSuccess;
