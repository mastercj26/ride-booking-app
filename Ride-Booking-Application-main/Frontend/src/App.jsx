import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import Home from "./pages/Home"
import UserLogin from "./pages/UserLogin"
import UserSignUp from "./pages/UserSignUp"
import CaptionLogin from "./pages/CaptionLogin"
import CaptionSignUp from "./pages/CaptionSignUp"
import UserProtectedWrapper from "./pages/UserProtectedWrapper";
import UserLogout from "./pages/UserLogout";
import CaptionHome from "./pages/CaptionHome";
import CaptionProtectedWrapper from "./pages/CaptionProtectedWrapper";
import CaptionLogout from "./pages/CaptionLogout";
import Rideing from "./pages/Rideing";
import CaptionRideing from "./pages/CaptionRideing";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Importing the necessary components for routing;
import GoogleAuthSuccess from './pages/GoogleAuthSuccess';

const App = () => {
  return (
    <div>

      {/* your routes/components */}
      <ToastContainer position="top-center" autoClose={2000} />

      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/user-signup" element={<UserSignUp />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/home" element={
          <UserProtectedWrapper>
            <Home />
          </UserProtectedWrapper>
        } />
        <Route path="/google-auth-success" element={<GoogleAuthSuccess />} />

        <Route path='/user-logout' element={
          <UserProtectedWrapper>
            <UserLogout />
          </UserProtectedWrapper>
        } />
        <Route path='/user-rideing' element={
          <UserProtectedWrapper>
            <Rideing />
          </UserProtectedWrapper>
        } />

        <Route path="/caption-signup" element={<CaptionSignUp />} />
        <Route path="/caption-login" element={<CaptionLogin />} />
        <Route path="/caption-home" element={
          <CaptionProtectedWrapper>
            <CaptionHome />
          </CaptionProtectedWrapper>
        } />

        <Route path='/caption-logout' element={
          <CaptionProtectedWrapper>
            <CaptionLogout />
          </CaptionProtectedWrapper>
        } />

        <Route path='/caption-rideing' element={
          <CaptionProtectedWrapper>
            <CaptionRideing />
          </CaptionProtectedWrapper>
        } />



      </Routes>
    </div>
  );
}

export default App;