import React, { use, useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/userContext";
import axios from "axios";

const UserLogin = () => {
    const navigate = useNavigate();
    const userToken = localStorage.getItem("userToken");
    useEffect(() => {
        if (userToken) {
            navigate("/home");
        }
    }, [userToken, navigate]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [userData, setUserData] = useState({});
    const { user, setUser } = useContext(UserDataContext);
    const [errorMessage, setErrorMessage] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            email: email,
            password: password
        }
        try {

            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);
            if (response.status === 200) {
                const data = response.data;
                setUser(data.data);
                localStorage.setItem("userToken", data.token);
                console.log("User logged in successfully:", data);
                navigate("/home");
            }
            // Here you would typically handle the login logic, such as sending a request to your backend.

            setEmail("");
            setPassword("");
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setErrorMessage("Invalid Credentials");
            } else if (err.response && err.response.status === 404) {
                setErrorMessage("User Not Found");
            }
            else {
                setErrorMessage("Something went wrong. Please try again.");
            }
        }
    };

    const handleGoogleLogin = (role) => {
        const baseURL = import.meta.env.VITE_BASE_URL;
        const redirectURL =
            role === "user"
                ? `${baseURL}/api/auth/google/user`
                : `${baseURL}/api/auth/google/caption`;

        window.open(redirectURL, "_self");
    };


    return (
        <div className="bg-cover bg-center w-full max-w-sm mx-auto shadow-2xl bg-[url(https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] min-h-screen flex items-center justify-center px-4">
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
                        <label className="block text-black-700 text-lg font-medium mb-1">
                            What is your email
                        </label>
                        <input
                            required
                            value={email}
                            onChange={(e) => {
                                // console.log(e.target.value);
                                setEmail(e.target.value);
                            }
                            }
                            type="email"
                            placeholder="example@gmail.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl placeholder:text-base font-medium focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <div>
                        <label className="block text-black-700 text-lg font-medium mb-1">
                            Enter Password
                        </label>
                        <input
                            required
                            value={password}
                            onChange={(e) => {
                                // console.log(e.target.value);
                                setPassword(e.target.value);
                            }
                            }
                            type="password"
                            placeholder="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl placeholder:text-base font-medium focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 hover:bg-gray-800 transition duration-200"
                    >
                        Login
                    </button>
                    {errorMessage && (
                        <p className="text-red-500 text-sm font-bold">{errorMessage}</p>
                    )}
                </form>
                <button
                    onClick={() => handleGoogleLogin("user")}
                    type="button"
                    className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-black py-2 hover:bg-gray-100 transition duration-200 mt-3 rounded-xl"
                >
                    <img src="https://img.icons8.com/color/16/google-logo.png" alt="Google" />
                    Login with Google
                </button>


                <p className="pt-4 text-lg">New here? <Link to='/user-signup' className="text-blue-600 font-medium">Create new account</Link></p>

                <div className="mt-6 text-center">
                    <Link to='/caption-login' className="flex items-center justify-center bg-amber-400 py-2 text-sm font-medium text-white underline hover:text-gray-700">
                        Sign in as Captain
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserLogin;
