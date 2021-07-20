import User from "./user.model";

export async function getUserByID (id) {
    return await User.findById(id);
}

export async function getUserByEmail (email) {
    return await User.findOne({email});
}

export async function getUserByName (username) {
    return await User.findOne({username});
}

export async function getUserByKey (key) {
    return await User.findOne({key});
}