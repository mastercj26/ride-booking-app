import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const UserLogout = () => {

    const userToken = localStorage.getItem("userToken");
    const navigate = useNavigate();

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`,{
        headers:{
            Authorization: `bearer ${userToken}`
        }
    }).then((response) =>{
        if(response.status === 200){
            localStorage.removeItem("userToken");
            navigate("/user-login");
        }
    })
    return (
        <div>User Logout</div>
    );
}

export default UserLogout;
