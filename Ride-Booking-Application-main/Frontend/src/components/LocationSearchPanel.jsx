import React from "react";

const LocationSearchPanel = ({ suggestions, setDestinationCoords, setPickupCoords, setPickup, setDestination, activeField }) => {

    // console.log(suggestions)

    const handleSuggestionsClick = (suggestion) => {
        const { description, coordinates } = suggestion;

        if (activeField === 'pickup') {
            setPickup(description);
            setPickupCoords(coordinates);
            // console.log("📍 Pickup Coordinates:", coordinates);
        } else if (activeField === 'destination') {
            setDestination(description);
            setDestinationCoords(coordinates);
            // console.log("📍 Destination Coordinates:", coordinates);
        }
    };


    return (

        <div className="flex flex-col gap-3 p-4 border border-gray-300 rounded-lg shadow-lg bg-gray-50 fixed z-30 h-screen max-w-sm w-screen">
            {
                suggestions.length === 0 ? (
                    <p className="text-gray-500 text-center">No suggestions found</p>
                ) : (
                    suggestions.map((e, index) => (
                        <div
                            key={index}
                            onClick={() => handleSuggestionsClick(e)}
                            className="flex items-center active:border-2 justify-start gap-2 px-4 py-3 rounded-lg shadow-md bg-white cursor-pointer"
                        >
                            <h2 className="flex items-center justify-center text-lg rounded-3xl bg-gray-200 h-8 w-10">
                                <i className="ri-map-pin-2-fill"></i>
                            </h2>
                            <h3>{e.description}</h3>
                        </div>
                    ))
                )
            }

        </div>
    )
}

export default LocationSearchPanel;