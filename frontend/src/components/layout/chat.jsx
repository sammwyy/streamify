import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import styles from "./chat.module.css";

var socket;
var history;
var setHistory;

export default function Chat ({session, channel}) {
    let messageInput = "";
    [history, setHistory] = useState([]);

    const addMessage = (user, content) => {
        const newHistory = [...history, { user, content }]
        setHistory(newHistory);
    }

    const trySendMessage = () => {
        socket.emit("message", channel.username, messageInput);
    }

    useEffect(() => {
        socket = socketIOClient("http://localhost:4000");
        socket.emit("auth", localStorage.getItem("token"));
        socket.emit("join", channel.username)
        socket.on("message", (author, content) => {
            addMessage(author, content);
        });
    }, []);

    return (
        <div className={styles["chat"]}>
            <h2>Chat</h2>
            <div className={styles["history"]}>
                {
                    history.map((value) => {
                        return (
                            <p className={styles["message"]}>
                                <span className={styles["author"]}>{value.user}:</span> {value.content}
                            </p> 
                        )
                    })
                }
                
            </div>


            <div className={styles["input"]}>
                <input 
                    onChange={(elem) => { messageInput = elem.target.value; elem.target.value = messageInput; }}
                    className={styles["input-field"]} type="text" name="" id="" placeholder="Type your message..." 
                />

                {
                    session.get() && (
                        <button onClick={() => { trySendMessage(); }} className={styles["send-btn"]}>Send</button>
                    )
                }

                {
                    !session.get() && (
                        <span style={{"marginTop": "20px", "display": "block"}}>Logeate antes de usar el chat.</span>
                    )
                }
            </div>
        </div>
    )
}