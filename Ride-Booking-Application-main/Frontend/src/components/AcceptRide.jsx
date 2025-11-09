import React, { useState } from "react";
import userImg from "../assets/user.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RideInvitation = (props) => {
    const confirmRideHandler = async (e) => {
        e.preventDefault();
        props.startRide();
    }

    return (
        <div className="bg-white space-y-4 w-screen max-w-sm mx-auto flex flex-col justify-center px-5 h-screen">
            {/* Rider Info */}
            <h1 className="text-2xl font-semibold">Client is waiting for the pickup location</h1>
            <div className="bg-violet-100 p-4 rounded-xl flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <img className="h-14 w-14 object-cover rounded-full border border-white shadow-sm" src={userImg} alt="User" />
                    <div>
                        <h2 className="font-semibold text-gray-800 text-lg capitalize">{props.ride?.user.fullName.firstName}</h2>
                        {/* <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">10% Discount</span> */}
                    </div>
                </div>
                <div className="text-right">
                    <h3 className="text-lg font-semibold text-violet-600">{props.ride?.fare}</h3>
                    <p className="text-sm text-gray-600">{props.ride?.distance} Km</p>
                </div>
            </div>

            {/* Pickup and Drop Info */}
            <div className="space-y-3">
                {/* Pickup */}
                <div className="flex items-start gap-3 bg-gray-50 px-4 py-3 rounded-xl shadow-sm">
                    <i className="ri-user-location-line text-xl text-blue-500 mt-1"></i>
                    <div>
                        <p className="text-xs text-gray-500 font-medium">PICKUP</p>
                        <p className="text-base font-semibold text-gray-800">{props.ride?.pickup}</p>
                    </div>
                </div>

                {/* Drop */}
                <div className="flex items-start gap-3 bg-gray-50 px-4 py-3 rounded-xl shadow-sm">
                    <i className="ri-map-pin-2-fill text-xl text-red-500 mt-1"></i>
                    <div>
                        <p className="text-xs text-gray-500 font-medium">DROP OFF</p>
                        <p className="text-base font-semibold text-gray-800">{props.ride?.destination}</p>
                    </div>
                </div>
            </div>

            {/* OTP Section */}
            <div className="bg-white p-4 rounded-xl shadow space-y-2">
                <form onSubmit={confirmRideHandler} action="/caption-rideing">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="otp-input">
                        Enter OTP to start ride
                    </label>
                    <input
                        id="otp-input"
                        type="number"
                        className="w-full px-3 py-2 border font-mono border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-400"
                        placeholder="Enter 6-digit OTP"
                        value={props.otp}
                        onChange={(e) => {
                            const val = e.target.value.slice(0, 6);
                            props.setOtp(val);
                        }}
                        autoComplete="one-time-code"
                    />

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-2">
                        <div
                            onClick={() => {
                                props.cancelRide()
                            }}
                            className="px-5 py-2 font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
                        >
                            Cancle
                        </div>
                        <button
                            className="px-5 py-2 font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg transition"
                        >
                            Start Ride
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RideInvitation;
