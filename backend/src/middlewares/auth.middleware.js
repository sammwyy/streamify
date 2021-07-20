import { resolveUser } from "../auth/sessions";

export default function () {
    return async (req, res, next) => {
        const token = req.headers.authorization;
        if (!token) {
            res.status(401).json({
                success: false,
                message: "Authorization token isn't provided."
            })
        } else {
            try {
                const user = await resolveUser(token);
                req.user = user;
                next();
            } catch (e) {
                console.error(e);
                res.status(401).json({
                    success: false,
                    message: e.message
                })
            }
        }
    }
}