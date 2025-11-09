import React, { useContext, useEffect, useRef, useState } from "react";
import uberLogo from "../assets/Uber_black.webp";
import mapImg from "../assets/map.png";
import { Link, useLocation } from "react-router-dom";
import RideDetail from "../components/RideDetail"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { toast } from "react-toastify";
import { SocketContext } from "../context/socketContext";
import MapView from "../components/MapView";
import { CaptionDataContext } from "../context/captionContext";


const CaptionRideing = (props) => {
    const [rideDetailPanel, setRideDetailPanel] = useState(false);
    const rideDetailPanelRef = useRef(null);
    const loc = useLocation();
    const rideData = loc.state?.ride;
    const [location, setlocation] = useState(null);

    const { caption } = useContext(CaptionDataContext);


    const { socket } = useContext(SocketContext);
    useEffect(() => {
        socket.on("ride-ended", (data) => {
            toast.success("Ride End")
        })


        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    const location = {
                        ltd: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    setlocation(location);
                    socket.emit('update-loction-caption', {
                        userId: caption._id,
                        location
                    });
                });
            }
        };

        const locationInterval = setInterval(updateLocation, 3000);
        updateLocation();

        return () => clearInterval(locationInterval);

    }, [socket])

    useGSAP(function () {
        if (rideDetailPanel) {
            gsap.to(rideDetailPanelRef.current, {
                transform: "translateY(0)"
            })
        } else {
            gsap.to(rideDetailPanelRef.current, {
                transform: "translateY(100%)"
            })
        }
    }, [rideDetailPanel])
    return (
        <div className="relative h-screen w-full max-w-sm mx-auto overflow-hidden shadow-2xl">
            {/* Map Background */}
            {/* <img src={mapImg} className="h-screen w-full object-cover absolute" alt="Map" /> */}
            <div className="absolute h-screen w-full z-0">
                <MapView location={location} />
            </div>


            {/* Uber Logo */}
            <img src={uberLogo} className="absolute w-24 top-5 left-5" alt="Uber Logo" />
            {/* Top Nav */}

            {/* Caption Details Panel */}
            <div
                onClick={() => {
                    setRideDetailPanel(true)
                }}
                className="z-10 fixed bottom-0 bg-yellow-300 px-5 w-screen max-w-sm mx-auto"
            >
                <div className="flex justify-around items-center w-full py-5">
                    <h1 className="text-xl font-semibold">{rideData.distance} KM Away</h1>
                    <button
                        className="px-5 py-2 font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg transition"
                    >
                        Ride Complete
                    </button>
                </div>
            </div>


            <div
                ref={rideDetailPanelRef}
                className="z-20 fixed bottom-0 bg-white translate-y-full"
            >
                <RideDetail
                    setRideDetailPanel={setRideDetailPanel}
                    rideData={rideData}
                />
            </div>
        </div>
    );
}

export default CaptionRideing