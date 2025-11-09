import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/userContext";
import axios from "axios";

const UserSignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const { setUser } = useContext(UserDataContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            fullName: {
                firstName,
                lastName,
            },
            email,
            password,
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

            if (response.status === 201) {
                const data = response.data;
                setUser(data.user);
                localStorage.setItem("userToken", data.token);
                navigate("/home");
            }

            setEmail("");
            setPassword("");
            setFirstName("");
            setLastName("");
            setErrorMessage("");
        } catch (err) {
            if (err.response?.status === 401) {
                setErrorMessage("User already exists.");
            } else if (err.response?.status === 400) {
                setErrorMessage("Password must be at least 6 characters.");
            } else {
                setErrorMessage("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <div className="bg-cover bg-center w-full max-w-sm mx-auto bg-[url(https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] min-h-screen flex items-center justify-center px-4">
            <div className="relative z-10 bg-white/20 backdrop-blur-sm p-8 rounded-2xl shadow-lg w-full max-w-md text-black">
                <div className="flex justify-center mb-6">
                    <img
                        className="w-40"
                        src="https://static.vecteezy.com/system/resources/previews/027/127/451/non_2x/uber-logo-uber-icon-transparent-free-png.png"
                        alt="Uber Logo"
                    />
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-black-700 text-lg font-medium mb-2">What's your name</label>
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                required
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="First Name"
                                className="w-1/2 px-4 py-2 border border-gray-300 rounded-xl placeholder:text-base font-medium focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Last Name"
                                className="w-1/2 px-4 py-2 border border-gray-300 rounded-xl placeholder:text-base font-medium focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-black-700 text-lg font-medium mb-1">What is your email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@gmail.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl placeholder:text-base font-medium focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <div>
                        <label className="block text-black-700 text-lg font-medium mb-1">Enter Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl placeholder:text-base font-medium focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    {errorMessage && (
                        <p className="text-red-500 text-sm font-bold text-center -mt-4">{errorMessage}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 hover:bg-gray-800 transition duration-200"
                    >
                        Create Account
                    </button>
                </form>

                <p className="pt-4 text-center text-lg">
                    Already have an account?{" "}
                    <Link to="/user-login" className="text-blue-600 font-medium hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default UserSignUp;
