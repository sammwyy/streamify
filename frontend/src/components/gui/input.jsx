import styles from "./input.module.css";

export default function Input (props) {
    return (
        <div className={styles["wrapper"]}>
            <span className={styles["label"]}>{props.label}</span>
            <input {...props} className={styles["input"]} />
        </div>
    )
}