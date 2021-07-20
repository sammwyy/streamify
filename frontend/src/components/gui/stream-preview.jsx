import styles from "./stream-preview.module.css";
import { Link } from "react-router-dom";

export default function StreamPreview ({channel}) {
    return (
        <Link to={`/c/${channel}`}>
            <div className={styles["wrapper"]}>
                <div className={styles["thumb"]}>
                    <span className={styles["viewers"]}>86.391 Viewers</span>
                </div>

                <div className={styles["stream-info"]}>
                    <div className={styles["pp-container"]}>
                        <img className={styles["profile-pic"]} src="http://localhost:3000/pp.png"/>
                    </div>
                    <div className={styles["inline-module"]}>
                        <span className={styles["channel-name"]}>{channel}</span>
                        <p className={styles["stream-title"]}>Write a sort stream description here.</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}