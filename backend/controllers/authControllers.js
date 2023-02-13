const bcrypt = require("bcrypt")
const User = require("../models/User")
const jwt = require("jsonwebtoken")

// không có database nên lưu tạm refreshtoken vào mảng
let refreshTokens = [];

const authControllers = {
    // register
    registerUser: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(req.body.password, salt)
            
            // create new user
            const newUser = await new User({
                userName: req.body.userName,
                email: req.body.email,
                password: hashed,
            })
            
            // Save to user
            const user = await newUser.save();
            res.status(200).json(user)
        } catch(err) {
            console.log('loi roi');
            res.status(500).json(err)
        }
    },

    // generateAccessToken
    generateAccessToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin
            },
            process.env.JWT_ACCESS_KEY,
            {expiresIn: "45s"}
        )
    },

    // generateRefreshToken
    generateRefreshToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                admin: user.admin
            },
            process.env.JWT_REFRESH_TOKEN,
            {expiresIn: "365d"}
        )
    },

    // login
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({userName: req.body.userName})
            const validPassword = await bcrypt.compareSync(req.body.password, user.password)

            if(!user) {
                res.status(404).json("Incorrect userName or password")
            }

            if(!validPassword) {
                res.status(404).json("Incorrect password")
            }

            if(user && validPassword) {
                const accessToken = authControllers.generateAccessToken(user);
                const refreshToken = authControllers.generateRefreshToken(user);

                refreshTokens.push(refreshToken)

                // lưu refresh token vào cookie
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict"
                })
                const {password, ...other} = user._doc
                res.status(200).json({...other, accessToken})
            }
        }catch (err) {
            console.log(err);
        }
    },

    requestRefreshToken: async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.status(401).json("you're not authenticated")
        if(!refreshTokens.includes(refreshToken)) {
            return res.status(403).json("Refresh token is not valid");
        }

        jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, user) => {
            if(err) {
                console.log(err);
            }
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken)
            // create new access token and new refresh token
            const newAccessToken = authControllers.generateAccessToken(user);
            const newRefreshToken = authControllers.generateRefreshToken(user);

            refreshTokens.push(newRefreshToken)
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict"
            })
            res.status(200).json({accessToken: newAccessToken})
        })
    },

    // logout
    userLogout: async (req, res) => {
        res.clearCookie("refreshToken")
        refreshTokens = refreshTokens.filter((token) => token !== req.cookies.refreshToken);
        res.status(200).json("logger out!")
    }
}

module.exports = authControllers;