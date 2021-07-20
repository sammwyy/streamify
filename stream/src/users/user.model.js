import { model, Schema } from "mongoose";

const schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },

    key: {
        type: String,
        required: true,
        unique: true
    }
});

export default model("User", schema);