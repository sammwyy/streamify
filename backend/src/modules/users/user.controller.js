import { createUser, modifyUser, getUserByID, getUserByName } from "./user.service";
import { sanitizeUserPublic, sanitizeUserPrivate } from "../../utils/user.utils";

export async function findUser (req, res) {
    const { username, id } = req.query;
    if (username == null && id == null) {
        res.status(400).json({
            success: false,
            message: "Please specify an ID or an Username."
        });
    } else {
        const user = username ? await getUserByName(username) : await getUserByID(id);
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found."
            });
        } else {
            res.status(200).json({
                success: true,
                user: sanitizeUserPublic(user)
            });
        }
    }
}

export async function getCurrentUser (req, res) {
    const user = req.user;
    res.status(200).json({
        success: true,
        user: sanitizeUserPrivate(user)
    })
}

export async function registerUser (req, res) {
    try {
        const user = await createUser(req.body);
        res.status(201).json({
            success: true,
            user: sanitizeUserPrivate(user)
        })
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message
        })
    }
}

export async function editUser (req, res) {
    try {
        const user = await modifyUser(req.user, req.body);
        res.status(201).json({
            success: true,
            user: sanitizeUserPrivate(user)
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            message: e.message
        })
    }
}