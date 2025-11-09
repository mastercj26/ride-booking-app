const mongoose = require("mongoose");

function connectToDB(){
    mongoose.connect(process.env.DB_CONNECT).then(
        () => {console.log("MongoDB_Connected")}
    ).catch(err => {console.log(err)});
}


module.exports = connectToDB;