import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaptionDataContext } from "../context/captionContext";
import axios from "axios";

const CaptionProtectedWrapper = ({ children }) => {
    const navigate = useNavigate();
    const captionToken = localStorage.getItem("captionToken");
    const { caption, setCaption } = useContext(CaptionDataContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Redirect immediately if token is missing
        if (!captionToken) {
            navigate("/caption-login");
            return;
        }

        // Delay token verification by 2 seconds
        const timer = setTimeout(() => {
            axios
                .get(`${import.meta.env.VITE_BASE_URL}/captions/profile`, {
                    headers: {
                        Authorization: `Bearer ${captionToken}`,
                    },
                })
                .then((response) => {
                    if (response.status === 200) {
                        setCaption(response.data.caption);
                        setIsLoading(false);
                    }
                })
                .catch((err) => {
                    console.error("Error fetching caption profile:", err);
                    localStorage.removeItem("captionToken");
                    navigate("/caption-login");
                });
        }, 500); 

        // Cleanup the timer on unmount
        return () => clearTimeout(timer);
    }, [captionToken, navigate, setCaption]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return <>{children}</>;
};

export default CaptionProtectedWrapper;
