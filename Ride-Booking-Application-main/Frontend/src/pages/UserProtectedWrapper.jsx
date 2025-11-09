import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/userContext";
import axios from "axios";

const UserProtectedWrapper = ({ children }) => {
    const navigate = useNavigate();
    const userToken = localStorage.getItem("userToken");
    const { user, setUser } = useContext(UserDataContext);
    const [isLoading, setIsLoading] = useState(true);
    // console.log("User Token:", userToken);

    useEffect(() => {
        if (!userToken) {
            // console.log("User not logged in, redirecting to login page.");
            navigate("/user-login");
        }

        const timer = setTimeout(() => {
            axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
                headers: {
                    Authorization: `bearer ${userToken}`
                },
            }).then(response => {
                if (response.status === 200) {
                    // console.log(response);
                    // console.log(response.data);
                    setUser(response.data.user);
                    setIsLoading(false);
                }
            }).catch(err => {
                localStorage.removeItem("userToken");
                navigate("/user-login");
            })
        }, 500)
        return () => clearTimeout(timer);
    }, [userToken, navigate]);

    // Only render children if token exists
    if(isLoading){
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return <>{children}</>;
};

export default UserProtectedWrapper;
