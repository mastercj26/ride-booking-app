import React, { useActionState, useContext, useEffect, useRef, useState } from "react";
import uberLogo from "../assets/Uber_black.webp";
import mapImg from "../assets/map.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRidePanel from "../components/ConfirmRidePanel";
import SearchingForDriver from "../components/SearchingForDriver";
import WaitingDriver from "../components/WaitingDriver";
import axios from "axios";
import ErrorPopUp from "../components/ErrorPopUp";
import { SocketContext } from "../context/socketContext";
import { UserDataContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import MapView from "../components/MapView";


const Home = () => {
    const [pickup, setPickup] = useState("");
    const [destination, setDestination] = useState("");
    const [panel, setPanel] = useState(false);
    const [vehiclePanel, setVehiclePanel] = useState(false);
    const [confirmRidePanel, setConfirmRidePanel] = useState(false);
    const [searchingDriverPanel, setSearchingDriverPanel] = useState(false);
    const [waitingDriverPanel, setWaitingDriverPanel] = useState(false);
    const [activeField, setActiveField] = useState(null);
    const [pickupSuggestions, setPickupSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([])
    const [fare, setFare] = useState(0);
    const [vehicleType, setVehicleType] = useState(null);
    const [pickupCoords, setPickupCoords] = useState(null);
    const [destinationCoords, setDestinationCoords] = useState(null);
    const [errorPopUpPanel, setErrorPopUpPanel] = useState(false);
    const [error, setError] = useState("");
    const [ride, setRide] = useState(null);
    const [isRideConfirmed, setIsRideConfirmed] = useState(false)
    const [rideCancelled, setRideCancelled] = useState(false);


    const panelRef = useRef(null);
    const panelCloseRef = useRef(null);
    const vehiclePanelRef = useRef(null);
    const confirmRidePanelRef = useRef(null);
    const searchingDriverPanelRef = useRef(null);
    const waitingDriverRef = useRef(null);
    const errorPopUpPanelRef = useRef(null);

    const { socket } = useContext(SocketContext);
    const { user } = useContext(UserDataContext);

    const navigate = useNavigate();
    const [location, setlocation] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const location = {
                        ltd: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setlocation(location);
                    console.log("User location:", location);
                },
                error => {
                    console.error("Geolocation error:", error);
                },
                { enableHighAccuracy: true }
            );
        }
    }, []);


    useEffect(() => {
        // //console(user)
        socket.emit("join", { userType: "user", userId: user._id });

        socket.on("ride-accepted", (data) => {
            toast.success("Ride Accecpt");
            setSearchingDriverPanel(false);
            setWaitingDriverPanel(true);
            setRide(data);
        });

        socket.on("ride-started", (data) => {
            toast.success("Ride Start");
            navigate('/user-rideing', { state: { data } });
        })

        socket.on("ride-cancelled", (data) => {
            toast.success("Ride Cancel")
            setWaitingDriverPanel(false);
        })
    }, [socket]);


    useEffect(() => {
        if (rideCancelled) {
            sendMessage();
            setRideCancelled(false);
        }
    }, [rideCancelled]);

    if (isRideConfirmed) {
        rideConfirmed()
        setIsRideConfirmed(false)
    }
    async function rideConfirmed() {
        //console(ride);
        setRide(ride);
        setSearchingDriverPanel(false)
        setWaitingDriverPanel(true);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setPanel(false);
        setVehiclePanel(true);
    };


    // Function for give the pickup suggestions
    const handlePickupChange = async (e) => {
        const value = e.target.value;
        setPickup(value);
        // setCurrPickup(value);

        if (!value.trim()) {
            setPickupSuggestions([]); // clear suggestions
            return; // ✅ Don't call API
        }
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { query: value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            })
            setPickupSuggestions(response.data);
        } catch (err) {
            // toast.info("Location not found");
            console.error(err);
        }
    }

    // Function for give the destination suggestions
    const handleDestinationChange = async (e) => {
        const value = e.target.value;
        setDestination(value);
        // setCurrDestination(value);

        if (!value.trim()) {
            setDestinationSuggestions([]); // clear suggestions
            return; // ✅ Don't call API
        }
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { query: value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            })

            setDestinationSuggestions(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    const handleSetFare = async () => {
        //console(pickupCoords, " - ", destinationCoords);

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
                pickupCoords,
                destinationCoords
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            });

            setVehiclePanel(true);
            setPanel(false);
            setFare(response.data);

        } catch (err) {
            console.error("🚨 Error fetching fare:", err);

            // Handle error response message from server
            setErrorPopUpPanel(true);
            setError("Location Not Found!");
        }
    }

    async function createRide() {
        let rideFare;
        if (vehicleType == 'car') rideFare = fare.car;
        else if (vehicleType == 'bike') rideFare = fare.bike;
        else if (vehicleType == 'auto') rideFare = fare.auto;

        try {

            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
                pickup,
                pickupCoords,
                destination,
                destinationCoords,
                vehicleType,
                rideFare
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            })
        } catch (err) {
            console.error(err);
        }
    }

    async function sendMessage() {
        if (!ride) return;

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/send-message`, {
                ride: ride
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            });
            //console(response.data);
            if (response.status === 200) {
                //console(ride);
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    }

    async function cancelRide() {
        try {

            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/cancel`, {
                params: {
                    rideID: ride._id
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            })
            if (response.status === 200) {
                setRide(response.data);
                setRideCancelled(true);
            }
        } catch (err) {
            console.error(err);
        }
    }
    // Panel animations
    useGSAP(() => {
        gsap.to(panelRef.current, {
            y: panel ? 0 : "100%",
            // padding: panel ? 20 : 0,
            duration: 0.3,
            ease: "power2.out",
        });
        gsap.to(panelCloseRef.current, {
            opacity: panel ? 1 : 0,
        });
    }, [panel]);

    useGSAP(() => {
        gsap.to(vehiclePanelRef.current, {
            y: vehiclePanel ? 0 : "100%",
            duration: 0.3,
            ease: "power2.out",
        });
    }, [vehiclePanel]);

    useGSAP(() => {
        gsap.to(confirmRidePanelRef.current, {
            y: confirmRidePanel ? 0 : "100%",
            duration: 0.3,
            ease: "power2.out",
        });
    }, [confirmRidePanel]);

    useGSAP(() => {
        gsap.to(searchingDriverPanelRef.current, {
            y: searchingDriverPanel ? 0 : "100%",
            duration: 0.3,
            ease: "power2.out",
        });
    }, [searchingDriverPanel]);

    useGSAP(() => {
        gsap.to(waitingDriverRef.current, {
            y: waitingDriverPanel ? 0 : "100%",
            duration: 0.3,
            ease: "power2.out",
        });
    }, [waitingDriverPanel]);


    useGSAP(() => {
        gsap.to(errorPopUpPanelRef.current, {
            y: errorPopUpPanel ? 0 : "100%",
            duration: 0.3,
            ease: "power2.out",
        });
    }, [errorPopUpPanel]);

    return (
        <div className="h-screen relative overflow-hidden max-w-sm w-full mx-auto shadow-2xl">
            {/* Map Background */}
            {/* <img src={mapImg} className="h-screen w-full object-cover absolute" alt="Map" /> */}
            <div className="absolute h-screen w-full z-0">
                <MapView location={location} />
            </div>


            {/* Uber Logo */}
            {/* <img src={uberLogo} className="absolute w-24 top-5 left-5" alt="Uber Logo" /> */}

            {/* Ride Form */}
            <div ref={panelRef} 
            className="fixed bottom-60 w-screen max-w-sm flex flex-col justify-end z-10">
                <div className="bg-white p-5 relative shadow-lg">
                    <span
                        className="text-xl absolute right-7 top-5 cursor-pointer"
                        onClick={() => setPanel(false)}
                    >
                        <i ref={panelCloseRef} className="ri-arrow-down-wide-line transition-opacity duration-300"></i>
                    </span>

                    <h3 className="text-2xl font-semibold mb-5">Find a trip</h3>
                    <form onSubmit={onSubmit} className="space-y-3">
                        {/* Vertical Line between inputs */}
                        {/* <div className="absolute left-4 top- h-15 w-2 bg-gray-400 rounded-full"></div> */}

                        {/* Pickup Input */}
                        <div className="relative">
                            <i className="ri-circle-fill absolute top-1/2 left-3 -translate-y-1/2 text-sm text-gray-400"></i>
                            <input
                                onClick={() => {
                                    setPanel(true),
                                        setActiveField('pickup')
                                }}
                                value={pickup}
                                onChange={handlePickupChange}
                                type="text"
                                className="bg-gray-100 rounded-lg pl-10 pr-4 w-full py-2 text-base"
                                placeholder="Enter a pick-up location"
                                required
                            />
                        </div>

                        {/* Destination Input */}
                        <div className="relative">
                            <i className="ri-map-pin-2-fill absolute top-1/2 left-3 -translate-y-1/2 text-sm text-gray-400"></i>
                            <input
                                onClick={() => {
                                    setPanel(true)
                                    setActiveField('destination')
                                }}
                                value={destination}
                                onChange={handleDestinationChange}
                                type="text"
                                className="bg-gray-100 rounded-lg pl-10 pr-4 w-full py-2 text-base"
                                placeholder="Enter a destination location"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                    </form>
                    <button
                        onClick={handleSetFare}
                        className="mt-4 w-full bg-black text-white py-2 rounded-lg text-lg font-medium hover:bg-gray-800 transition duration-200"
                    >
                        Request Ride
                    </button>

                </div>

                {/* Error Panel */}
                <div
                    ref={errorPopUpPanelRef}
                    className="z-20 fixed bottom-0 flex items-center justify-center w-full max-w-sm mx-auto h-screen translate-y-full"
                >
                    <ErrorPopUp setErrorPopUpPanel={setErrorPopUpPanel} error={error} />
                </div>

                {/* Location Search Panel */}
                <div ref={panelRef} className="bg-green-300 shadow-2xl">
                    <LocationSearchPanel
                        suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                        setPickupCoords={setPickupCoords}
                        setDestinationCoords={setDestinationCoords}
                        setPickup={setPickup}
                        setDestination={setDestination}
                        activeField={activeField}

                    />
                </div>

                {/* Vehicle Options Panel */}
                <div
                    ref={vehiclePanelRef}
                    className="z-20 fixed translate-y-full bottom-0 shadow-2xl"
                >
                    <VehiclePanel
                        setPanel={setPanel}
                        setVehiclePanel={setVehiclePanel}
                        setConfirmRidePanel={setConfirmRidePanel}
                        fare={fare}
                        setVehicleType={setVehicleType}
                    />
                </div>

                {/* Confirm Ride Panel */}
                <div
                    ref={confirmRidePanelRef}
                    className="z-20 fixed translate-y-full bottom-0 shadow-2xl"
                >
                    <ConfirmRidePanel
                        createRide={createRide}
                        pickup={pickup}
                        destination={destination}
                        fare={fare}
                        vehicleType={vehicleType}
                        setVehiclePanel={setVehiclePanel}
                        setConfirmRidePanel={setConfirmRidePanel}
                        setSearchingDriverPanel={setSearchingDriverPanel}
                    />
                </div>

                {/* Searching for driver ride panel */}
                <div
                    ref={searchingDriverPanelRef}
                    className="z-20 fixed translate-y-full bottom-0 shadow-2xl"
                >
                    <SearchingForDriver
                        createRide={createRide}
                        pickup={pickup}
                        destination={destination}
                        fare={fare}
                        vehicleType={vehicleType}
                        setSearchingDriverPanel={setSearchingDriverPanel}
                    />
                </div>

                {/* Waiting for Driver Panel */}
                <div
                    ref={waitingDriverRef}
                    className="z-20 fixed bg-white translate-y-full bottom-0 shadow-2xl"
                >
                    <WaitingDriver
                        waitingDriverPanel={waitingDriverPanel}
                        setWaitingDriverPanel={setWaitingDriverPanel}
                        setConfirmRidePanel={setConfirmRidePanel}
                        setVehiclePanel={setVehiclePanel}
                        ride={ride}
                        cancelRide={cancelRide}
                        vehicleType={vehicleType}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
