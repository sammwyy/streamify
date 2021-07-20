import React, { useState } from "react";
import { ReactFlvPlayer } from 'react-flv-player'
import styles from "./player.module.css";

import { useEffect } from "react";
import { isStream } from "../../services/stream.service";

export default function Player ({channel}) {

    const username = channel.username;
    const [ isInStream, setIsInStream ] = useState(false);

    useEffect(() => {
        setInterval(async () => {
            const result = await isStream(username);
            if (result != isInStream) {
                setIsInStream(result);
            }
        }, 1000);
    }, []);

    return (
        <div className={styles["player"]}>
            {
                isInStream && (
                    <ReactFlvPlayer
                        controls={true}
                        isLive={true}
                        url={`http://localhost:5000/getstream/${username}`}
                        height = "640px"
                        width = "1080px"
                        isMuted={true}
                        hasAudio={true}
                        hasVideo={true}
                        isAutoplay={true}
                    />
                )
            }
        </div>
    )
}