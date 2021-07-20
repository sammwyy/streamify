import Player from "./player";
import styles from "./channel-view.module.css";

export default function ChannelView ({channel}) {
    return (
        <div>
            <Player channel={channel} />

            <div className={styles["page-info"]}>
                <div className={styles["pp-container"]}>
                    <img className={styles["profile-pic"]} src="http://localhost:3000/pp.png"/>
                </div>
                <div className={styles["inline-module"]}>
                    <h3 className={styles["channel-name"]}>{channel.username}</h3>
                    <p className={styles["stream-title"]}>{channel.streamTitle}</p>
                </div>
            </div>
        </div>
    )
}