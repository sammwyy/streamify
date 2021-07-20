import { useEffect } from "react";
import { logout } from "../services/auth.service";

export default function Logout ({session}) {

    useEffect(async () => {
        await logout();
        session.set(null);
    }, []);

    return (
        <div className="centered">
            <h2>Destroying session...</h2>
        </div>
    )
}