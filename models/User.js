
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    lastName: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024,
    },
    image: {
        type: String,
        default: "placeholder.jpg",
    },
});

module.exports = mongoose.model("User", userSchema);