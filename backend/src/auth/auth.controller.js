import { getUserByName } from "../modules/users/user.service";
import { generateSession, deleteSession } from "./sessions";
import { sanitizeUserPrivate } from "../utils/user.utils";

export async function logout (req, res) {
    const token = req.headers.authorization;
    if (token) {
        deleteSession(token);
    }

    res.status(202).json({success: true});
}

export async function login (req, res) {
    const { username, password } = req.body;

    const user = await getUserByName(username);
    if (user == null) {
        return res.status(404).json({
            success: false,
            message: "This username isn't registered."
        });
    } else {
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid password."
            });
        } else {
            const token = await generateSession(user._id);
            res.status(201).json({
                success: true,
                token,
                user: sanitizeUserPrivate(user)
            })
        }
    }
}