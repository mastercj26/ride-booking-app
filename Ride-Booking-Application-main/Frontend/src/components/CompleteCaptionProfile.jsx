import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";


const CompleteCaptionProfile = (props) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        vehicleType: "",
        vehicleNumber: ""
    });

    // captionID from props.caption (passed from parent page)
    const captionID = props.caption?._id;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.firstName ||
            !formData.lastName ||
            !formData.vehicleType ||
            !formData.vehicleNumber
        ) {
            toast.error("All fields are required");
            return;
        }

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/captions/completeProfile`,
                {
                    captionID,
                    fullName: {
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                    },
                    vehicle: {
                        vehicleType: formData.vehicleType,
                        vehicleNumber: formData.vehicleNumber,
                    },
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("captionToken")}`,
                    },
                }
            );
            if (res.data.success) {
                props.setCaptionDetailsPanel(true)
                props.setCompleteProfile(false)
                window.location.reload();
                // toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            toast.error("Something went wrong");
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="bg-gray-900 p-8 rounded-lg w-full max-w-md shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Complete Your Profile</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none"
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none"
                    />
                    <input
                        type="text"
                        name="vehicleType"
                        placeholder="Vehicle Type (car/bike)"
                        value={formData.vehicleType}
                        onChange={handleChange}
                        className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none"
                    />
                    <input
                        type="text"
                        name="vehicleNumber"
                        placeholder="Vehicle Number"
                        value={formData.vehicleNumber}
                        onChange={handleChange}
                        className="w-full p-3 rounded bg-gray-800 border border-gray-700 focus:outline-none"
                    />

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 p-3 rounded text-lg font-semibold"
                    >
                        Save Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CompleteCaptionProfile;
