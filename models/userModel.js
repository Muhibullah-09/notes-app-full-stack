const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        //A timestamp is a sequence of characters or encoded information identifying when a certain event occurred,
        // usually giving date and time of day, sometimes accurate to a small fraction of a second.
        timestamps: true,
    }
);

module.exports = mongoose.model("Users", userSchema);
