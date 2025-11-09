import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptionLogout = () => {
    const captionToken = localStorage.getItem("captionToken");
    const navigate = useNavigate();

    axios.get(`${import.meta.env.VITE_BASE_URL}/captions/logout`, {
        headers: {
            Authorization: `bearer ${captionToken}`
        }
    }).then((response) => {
        if (response.status === 200) {
            localStorage.removeItem("captionToken");
            navigate("/caption-login");
        }
    });
}

export default CaptionLogout;