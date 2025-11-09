const userModel = require("../models/user-model")
const userServices = require("../services/user-services");
const { validationResult } = require("express-validator");
const blackListModel = require("../models/black-list-token");

async function handleUserRegister(req, res, next) {
    const error = validationResult(req)

    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    const { fullName, email, password } = req.body;
    const isEmailExists = await userModel.findOne({ email });
    if (isEmailExists) {
        return res.status(401).json({ message: "User already exists" });
    }

    try{
        const hashedPassword = await userModel.hashPassword(password);
        const user = await userServices.createUser({
            firstName: fullName.firstName,
            lastName: fullName.lastName,
            email,
            password: hashedPassword
        })
    
        const token = await user.generateAuthToken();
        return res.status(201).json({ token, user })
    }catch (err) {
        // console.error("Error during user registration:", err);
        return res.status(500).json({ message: err.message });
    }

}

async function handleUserLogin(req, res, next) {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
        return res.status(404).json({ message: "User Not Found" });
    }
    const isPasswordValid = await user.compareHashedDetails(password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = await user.generateAuthToken();
    res.cookie('userToken', token)
    return res.status(200).json({msg: "Login successful", token, user });
}

async function handleGetUserProfile(req, res, next) {
    const user = req.user;
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    // console.log("User profile:", user);
    return res.status(200).json({Profile: "User Profile", user });
};

async function handleUserLogout(req, res, next) {
    const user = req.user;
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    res.clearCookie('userToken');
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    // Add the token to the blacklist
    await blackListModel.create({ token });
    await userModel.findByIdAndUpdate({
        _id:user._id
    },{
        socketID: null
    })
    return res.status(200).json({ message: "Logged out successfully" });
}

module.exports = {
    handleUserRegister, handleUserLogin, handleGetUserProfile,handleUserLogout
}
