import styles from "./player-controls.module.css";

export default function PlayerControls ({ setPause, setFullscreen, fullscreen, paused}) {

    return (
        <div className={styles["controls"]}>
            <div className={styles["content"]}>
                <button onClick={() => { setPause(!paused) }}>{ paused ? "Play" : "Pause" }</button>
                <span>Volume</span>
                <input type="range" name="" id="" />
                <button onClick={() => { setFullscreen(!fullscreen) }}>{ fullscreen ? "Exit Fullscreen" : "Fullscreen" }</button>
            </div>
        </div>
    )
}