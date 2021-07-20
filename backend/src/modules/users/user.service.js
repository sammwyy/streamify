import User from "./user.model";
import mongoose from "mongoose";
import { generateToken } from "../../utils/tokens";

export async function getUserByID (id) {
    const _id =  mongoose.Types.ObjectId(id);
    return await User.findById(_id);
}

export async function getUserByEmail (email) {
    return await User.findOne({email});
}

export async function getUserByName (username) {
    return await User.findOne({username});
}

export async function isEmailTaken (email) {
    const user = await getUserByEmail(email);
    return user != null;
}

export async function isUsernameTaken (username) {
    const user = await getUserByName(username);
    return user != null;
}

export async function createUser ({username, email, password}) {
    if (await isEmailTaken(email)) {
        throw new Error("Email is already taken.");
    } else if (await isUsernameTaken(username)) {
        throw new Error("Username is already taken.");
    } else {
        const key = generateToken(64);
        const user = new User({username, email, password, key});

        await user.save();
        return user;
    }
}

export async function modifyUser (user, fields) {
    const { username, email, password, streamTitle } = fields;

    if (username && await isUsernameTaken(username)) {
        throw new Error("Username is already taken.");
    } else if (email && await isEmailTaken(email)) {
        throw new Error("Email is already taken.");
    } else {
        if (username) 
            user.username = username;
        if (email) 
            user.email = email;
        if (password) 
            user.password = password;
        if (streamTitle)
            user.streamTitle = streamTitle;

        await user.save();
        return user;
    }
}