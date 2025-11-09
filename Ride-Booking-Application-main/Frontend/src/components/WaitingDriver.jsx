import React from "react";
import carImg from "../assets/car.png";
import autoImg from "../assets/Auto.png";
import bikeImg from "../assets/Bike.webp";
import userImg from "../assets/user.png";

const WaitingDriver = (props) => {
    if (!props.ride) {
        return (
            <div className="h-screen flex items-center justify-center text-lg text-gray-500">
                Loading ride details...
            </div>
        );
    }

    const vehicleType = props.vehicleType;
    const vehicleImg =
        vehicleType === "bike" ? bikeImg :
        vehicleType === "auto" ? autoImg :
        carImg;

    const { caption, otp, pickup, destination } = props.ride;

    return (
        <div className="pt-5 px-4 pb-3 flex flex-col h-screen gap-3 max-w-sm mx-auto bg-gray-50">

            {/* Heading */}
            <div className="flex justify-between items-center border-b pb-3">
                <h1 className="text-xl font-semibold text-gray-800">
                    Meet at pickup point
                </h1>
                {/* <span className="px-3 py-1 bg-black text-white text-sm font-bold rounded-lg">2 Min</span> */}
            </div>

            {/* Driver Info */}
            <div className="flex items-center bg-white shadow-md p-4 rounded-lg">
                <img
                    className="h-16 w-18 rounded-full object-cover border"
                    src={userImg}
                    alt="Driver"
                />
                <img
                    className="h-16 object-contain"
                    src={vehicleImg}
                    alt={vehicleType}
                />
                <div className="ml-auto text-right">
                    <h3 className="text-lg font-medium text-gray-800 capitalize">
                        {caption.fullName.firstName}
                    </h3>
                    <p className="text-sm text-gray-600">
                        White Suzuki S-Presso LXI
                    </p>
                    <h1 className="text-xl font-bold text-black tracking-wide">
                        {caption.vehicle.vehicleNumber}
                    </h1>
                    <p className="text-green-600 font-semibold">OTP - {otp}</p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-around items-center bg-white shadow-sm py-4 rounded-lg">
                <div className="flex flex-col items-center text-sm text-gray-700">
                    <i className="bg-gray-100 rounded-full p-3 text-2xl ri-shield-fill"></i>
                    <span className="mt-1">Safety</span>
                </div>
                <div className="flex flex-col items-center text-sm text-gray-700">
                    <i className="bg-gray-100 rounded-full p-3 text-2xl ri-phone-fill"></i>
                    <span className="mt-1">Call Driver</span>
                </div>
            </div>

            {/* Pickup & Destination */}
            <div className="space-y-3">
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg shadow-md bg-white">
                    <div className="text-xl text-green-600">
                        <i className="ri-user-location-line"></i>
                    </div>
                    <div>
                        <h2 className="text-md font-medium text-gray-800">Pickup</h2>
                        <p className="text-sm text-gray-600">{pickup}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg shadow-md bg-white">
                    <div className="text-xl text-red-600">
                        <i className="ri-user-location-line"></i>
                    </div>
                    <div>
                        <h2 className="text-md font-medium text-gray-800">Destination</h2>
                        <p className="text-sm text-gray-600">{destination}</p>
                    </div>
                </div>
            </div>

            {/* Cancel Ride Button */}
            <button
                onClick={() => {
                    props.setWaitingDriverPanel(false);
                    props.setVehiclePanel(true);
                    props.cancelRide();
                }}
                className="mt-auto bg-red-500 hover:bg-red-600 transition duration-200 text-white text-lg font-semibold py-3 rounded-lg shadow-lg"
            >
                Cancel Ride
            </button>
        </div>
    );
};

export default WaitingDriver;
