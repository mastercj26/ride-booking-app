import React, { useEffect, useState } from "react";
import userImg from "../assets/user.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RideDetail = (props) => {
    const [ride, setRide] = useState(null);
    const [rideEnd, setRideEnd] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (rideEnd) {
            sendMessage();
            setRideEnd(false);
        }
    }, [rideEnd])

    async function sendMessage() {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/send-message`, {
                ride: ride
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('captionToken')}`
                }
            });
            if (response.status === 200) {
                console.log(response.data);
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    }
    async function endRide() {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/endRide`, {
                rideID: props.rideData._id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("captionToken")}`
                }
            })

            if (response.status === 200) {
                console.log(response.data);
                setRideEnd(true);
                setRide(response.data);
                navigate('/caption-home');
            }
        } catch (err) {
            console.error("Error sending message ", err)
        }
    }

    return (
        <div className="bg-white p-5 space-y-4 w-screen max-w-sm mx-auto">
            <div
                onClick={() => {
                    props.setRideDetailPanel(false)
                }}
                className="flex justify-center">
                <div className="line w-15 h-1  bg-gray-300 rounded-full"></div>
            </div>
            {/* Rider Info */}
            <div className="bg-violet-100 p-4 rounded-xl flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <img className="h-14 w-14 object-cover rounded-full border border-white shadow-sm" src={userImg} alt="User" />
                    <div>
                        <h2 className="font-semibold text-gray-800 text-lg capitalize">{props.rideData?.user.fullName.firstName}</h2>
                        {/* <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">10% Discount</span> */}
                    </div>
                </div>
                <div className="text-right">
                    <h3 className="text-lg font-semibold text-violet-600">{props.rideData?.fare} Rs</h3>
                    <p className="text-sm text-gray-600">{props.rideData?.distance} km</p>
                </div>
            </div>

            {/* Pickup and Drop Info */}
            <div className="space-y-3">
                {/* Pickup */}
                <div className="flex items-start gap-3 bg-gray-50 px-4 py-3 rounded-xl shadow-sm">
                    <i className="ri-user-location-line text-xl text-blue-500 mt-1"></i>
                    <div>
                        <p className="text-xs text-gray-500 font-medium">PICKUP</p>
                        <p className="text-base font-semibold text-gray-800">{props.rideData?.pickup}</p>
                    </div>
                </div>

                {/* Drop */}
                <div className="flex items-start gap-3 bg-gray-50 px-4 py-3 rounded-xl shadow-sm">
                    <i className="ri-map-pin-2-fill text-xl text-red-500 mt-1"></i>
                    <div>
                        <p className="text-xs text-gray-500 font-medium">DROP OFF</p>
                        <p className="text-base font-semibold text-gray-800">{props.rideData?.destination}</p>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-2">
                <button
                    onClick={endRide} // Replace with your logic
                    className="px-5 py-2 font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg transition"
                >
                    Finish
                </button>
            </div>
        </div>
    )
}

export default RideDetail;