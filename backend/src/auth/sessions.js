import { generateToken } from "../utils/tokens";
import { getUserByID } from "../modules/users/user.service";

import storage from "./storage";

export async function generateSession (userID) {
    const token = generateToken(64);
    await storage.set(token, userID);
    return token;
}

export async function resolveSession (token) {
    const id = await storage.get(token);
    return id;
}

export async function resolveUser (token) {
    const id = await resolveSession(token);
    if (!id) {
        throw new Error("Invalid session or has expired.");
    }

    const user = await getUserByID(id);
    if (!user) {
        throw new Error("User isn't exist.");
    }

    return user;
}

export async function deleteSession (token) {
    await storage.del(token);
}