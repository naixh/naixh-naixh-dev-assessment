const { Schema, model } = require("mongoose");

const UserSchema = new Schema (
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        address1: {
            type: String,
            required: false,
        },
        address2: {
            type: String,
            required: false,
        },
        city: {
            type: String,
            required: false,
        },
        state: {
            type: String,
            required: false,
        },
        country: {
            type: String,
            required: false,
        },
        password: {
            type: String,
            required: true,
        }
    },

    { timestamps: true }
);

module.exports = model("User", UserSchema);