import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
    return (
        <div>
            <div className="bg-cover mx-auto max-w-sm w-screen bg-center bg-[url(https://plus.unsplash.com/premium_photo-1682834983265-27a10ba5232c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] flex flex-col h-screen justify-between bg-gray-100">
                <img className="w-60 mt-6 ml-6" src="https://static.vecteezy.com/system/resources/previews/027/127/451/non_2x/uber-logo-uber-icon-transparent-free-png.png" alt="" />
                
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 text-black px-5 w-full max-w-md mx-auto mt-10 shadow-lg">
                    <h1 className="text-4xl font-bold py-3">Welcome to Uber</h1>
                    <Link
                        to='/user-login'
                        className="flex items-center justify-center text-2xl w-full bg-black text-white  py-3 mb-7 mt-2 hover:bg-gray-800 transition duration-200"
                    >
                        Continue
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Start;
