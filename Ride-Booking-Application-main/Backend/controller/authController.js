// const jwt = require("jsonwebtoken");

// exports.googleCallback = async (req, res) => {
//     try {
//         const user = req.user;

//         if (!user) {
//             return res.redirect("http://localhost:5173/login?error=UserNotFound");
//         }

//         const role = user.role;

//         let token;

//         if (role === "caption") {
//             token = jwt.sign({ _id: user._id }, process.env.JWT_CAPTION_SECRET, { expiresIn: "7d" });
//         } else {
//             token = jwt.sign({ _id: user._id }, process.env.JWT_USER_SECRET, { expiresIn: "7d" });
//         }

//         res.redirect(`http://localhost:5173/google-auth-success?token=${token}&role=${role}`);
//     } catch (err) {
//         console.error("Google Callback Error:", err);
//         res.redirect("http://localhost:5173/login?error=OAuthFailed");
//     }
// };


const jwt = require("jsonwebtoken");

exports.userGoogleCallback = async (req, res) => {
    try {
        const user = req.user;
        const token = jwt.sign({ _id: user._id }, process.env.JWT_USER_SECRET, { expiresIn: "7d" });
        return res.redirect(`http://localhost:5173/google-auth-success?token=${token}&role=user`);
    } catch (err) {
        console.error("User OAuth Error:", err);
        return res.redirect("http://localhost:5173/user-login?error=OAuthFailed");
    }
};

exports.captionGoogleCallback = async (req, res) => {
    try {
        const caption = req.user; // still comes as req.user
        const token = jwt.sign({ _id: caption._id }, process.env.JWT_CAPTION_SECRET, { expiresIn: "7d" });
        return res.redirect(`http://localhost:5173/google-auth-success?token=${token}&role=caption`);
    } catch (err) {
        console.error("Caption OAuth Error:", err);
        return res.redirect("http://localhost:5173/caption-login?error=OAuthFailed");
    }
};
