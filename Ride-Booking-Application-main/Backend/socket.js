const socketIo = require("socket.io");
const userModel = require('./models/user-model');
const captionModel = require("./models/caption-model");

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log("A user connected: " + socket.id);

        socket.on(('join'), async (data) => {
            const { userType, userId } = data;
            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, {
                    socketID: socket.id
                })
            } else if (userType === 'caption') {
                await captionModel.findByIdAndUpdate(userId, {
                    socketID: socket.id
                })
            }
        })

        socket.on('update-loction-caption', async (data) => {
            const { userId, location } = data;

            if (!location || !location.ltd || !location.lng) {
                return socket.emit("error", { message: "Invalid Location" });
            }

            await captionModel.findByIdAndUpdate(userId, {
                location: {
                    ltd: location.ltd,
                    lng: location.lng
                }
            })
        })

        socket.on("disconnect", () => {
            console.log("User disconnected: " + socket.id);
        });
    });
}


const sendMessageToSocketId = (socketId, messageObject) => {

console.log("Socket ID : ",socketId);
// console.log("message sent", messageObject);

    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket.io not initialized.');
    }
}


module.exports = {
    initializeSocket,
    sendMessageToSocketId
};

