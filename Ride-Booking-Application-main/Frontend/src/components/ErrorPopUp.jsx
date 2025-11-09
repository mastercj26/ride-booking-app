import React from "react";

const ErrorPopUp = (props) => {
    return (
        <div className="rounded-2xl shadow-xl space-y-4 border w-70% p-5 border-gray-200 bg-white">
            <h1 className="text-lg font-medium">{props.error}</h1>

            {/* Action Buttons */}
            <div className="flex justify-end">
                <button
                    onClick={() => props.setErrorPopUpPanel(false)}
                    className="px-5 py-1 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-xl transition"
                >
                    Okay
                </button>
            </div>
        </div>  
    );
}


export default ErrorPopUp;