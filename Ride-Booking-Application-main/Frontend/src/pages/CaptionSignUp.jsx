import React, { use, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptionDataContext } from "../context/captionContext";
import axios from "axios";

const CaptionSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const { caption, setCaption } = useContext(CaptionDataContext);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const captionData = {
      fullName: { firstName, lastName },
      email,
      password,
      vehicle: { vehicleNumber: vehicleNumber, vehicleType: vehicleType }
    };

    try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captions/register`, captionData);

    if (response.status === 201) {
      const data = response.data;
      setCaption(data.caption);
      localStorage.setItem("captionToken", data.token);
      console.log("Caption registered successfully:", data);
      navigate("/caption-home");
    }

    setEmail(""); setPassword(""); setFirstName(""); setLastName("");
    setVehicleNumber(""); setVehicleType("");

    } catch (err) {
      console.error("Signup failed:", err.response?.data || err.message);
      // optionally set error state if needed
    }
  };


  return (
    <div className="bg-cover bg-center w-full max-w-sm mx-auto bg-[url('https://images.unsplash.com/photo-1678964101682-26a0906972ad?q=80&w=1171&auto=format&fit=crop')] min-h-screen flex items-center justify-center px-4">
      <div className="relative z-10 bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md text-black">
        <div className="flex justify-center mb-6">
          <img
            className="w-40"
            src="https://static.vecteezy.com/system/resources/previews/027/127/451/non_2x/uber-logo-uber-icon-transparent-free-png.png"
            alt="Uber Logo"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-lg font-medium mb-2">What's your name</label>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-1/2 px-4 py-2 border border-gray-300 rounded-xl placeholder:text-base focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-1/2 px-4 py-2 border border-gray-300 rounded-xl placeholder:text-base focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-lg font-medium mb-1">Caption email</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl placeholder:text-base focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-lg font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl placeholder:text-base focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Vehicle Info */}
          <div className="flex space-x-2">
            <div className="w-1/2">
              <label className="block text-lg font-medium mb-1">Vehicle Number</label>
              <input
                type="text"
                placeholder="MH12AB1234"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl placeholder:text-base focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-lg font-medium mb-1">Vehicle Type</label>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl text-base font-medium focus:outline-none focus:ring-2 focus:ring-black bg-white"
                required
              >
                <option value="" disabled>Select Type</option>
                <option value="car">Car</option>
                <option value="bike">Bike</option>
                <option value="auto">Auto</option>
              </select>
            </div>
          </div>


          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition duration-200 font-medium"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="pt-4 text-center text-lg">
          Already have an account?{" "}
          <Link to="/caption-login" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CaptionSignUp;
