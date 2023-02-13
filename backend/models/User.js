const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 25,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            unique: true,
        },
        admin: {
            type: Boolean,
            default: false,
        }
    }, {timestamps: true}
);

module.exports = mongoose.model("User", userSchema)