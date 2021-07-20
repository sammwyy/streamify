import React from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

export default function Navbar ({ session }) {
    return (
        <div className={styles["navbar"]}>
            <div className={styles["content"]}>
                <div className={styles["brand"]}>
                    <h1>NotTwitch.tv</h1>
                </div>

                <div className={styles["items"]}>
                    <Link to="/" className={styles["item"]}>Explore</Link>
                    {
                        !session.get() && (
                            <React.Fragment>
                                <Link to="/login" className={styles["item"]}>Login</Link>
                                <Link to="/register" className={styles["item"]}>Register</Link>
                            </React.Fragment>
                        )
                    }

                    {
                        session.get() && (
                            <React.Fragment>
                                <Link to={`/c/${session.get().username}`} className={styles["item"]}>{session.get().username}</Link>
                                <Link to="/account" className={styles["item"]}>Account</Link>
                                <Link to="/logout" className={styles["item"]}>Logout</Link>
                            </React.Fragment>
                        )
                    }
                </div>
            </div>
        </div>
    )
}