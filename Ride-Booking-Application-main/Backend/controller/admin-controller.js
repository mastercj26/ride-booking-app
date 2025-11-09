const adminModel = require("../models/admin-model");
const { validationResult } = require('express-validator');
const blackListModel = require('../models/black-list-token');

module.exports.handleAdminLogin = async (req, res, next)=>{ 
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    const {email, password} = req.body;

    try{
        if(email == "aman@gmail.com" && password == "Aman@123#"){
            return res.status(200).json({message : "Admin logged in successfull"});
        }
    }catch(err){
        return res.status(500).json({message : err});
    }
}