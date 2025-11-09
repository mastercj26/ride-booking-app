import React from "react";
import carImg from "../assets/car.png";
import bikeImg from "../assets/Bike.webp";
import autoImg from "../assets/Auto.png";

const VehiclePanel = ({ setVehiclePanel, setPanel, setConfirmRidePanel, setVehicleType, fare }) => {

    const vehicleOptions = [
        {
            type: 'car',
            title: 'UberGo',
            capacity: 4,
            image: carImg,
            desc: 'Affordable, compact ride',
        },
        {
            type: 'bike',
            title: 'Bike',
            capacity: 1,
            image: bikeImg,
            desc: 'Affordable, Bike ride',
        },
        {
            type: 'auto',
            title: 'Auto',
            capacity: 3,
            image: autoImg,
            desc: 'Affordable, Auto ride',
        }
    ];

    const renderVehicleOption = (vehicle) => (
        <div
            key={vehicle.type}
            onClick={() => {
                setConfirmRidePanel(true);
                setVehiclePanel(false);
                setVehicleType(vehicle.type);
            }}
            className="flex items-center border-2 w-full border-gray-100 hover:border-black active:border-black transition-all duration-150 cursor-pointer justify-between py-2 rounded-lg shadow-md"
        >
            <img className="h-16" src={vehicle.image} alt={vehicle.type} />
            <div className="">
                <h2 className="text-base font-medium">
                    {vehicle.title}
                    <span className="ml-2 text-sm text-gray-600">
                        <i className="ri-group-line mr-1"></i>{vehicle.capacity}
                    </span>
                </h2>
                <h4 className="text-sm text-green-600">2 min away</h4>
                <h5 className="text-sm text-gray-700">{vehicle.desc}</h5>
            </div>
            <h2 className="font-medium text-xl p-4">₹{fare[vehicle.type]}</h2>
        </div>
    );

    return (
        <div className="flex flex-col gap-5 h-screen py-5 px-4 bg-white w-screen max-w-sm mx-auto">
            <div
                onClick={() => {
                    setVehiclePanel(false);
                    setPanel(true);
                }}
                className="flex items-center justify-center p-2 cursor-pointer"
            >
                <div className="w-16 h-1 mb-2 bg-gray-300 rounded-full"></div>
            </div>

            <h1 className="text-2xl font-semibold px-2">Choose Vehicle</h1>

            <div className="flex flex-col gap-4">
                {vehicleOptions.map(renderVehicleOption)}
            </div>
        </div>
    );
};

export default VehiclePanel;
