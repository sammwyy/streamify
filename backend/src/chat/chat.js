import { resolveUser } from "../auth/sessions";
import http from "http";
import socketIO from "socket.io";

export default function (app) {
    const server = http.createServer(app);
    const sockets = new Set();
    const io = socketIO(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log("[CHAT] socket connected");
        sockets.add(socket);

        socket.on("disconnect", () => {
            console.log("[CHAT] socket disconnected");
            sockets.delete(socket);
        })

        socket.on("auth", async (token) => {
            console.log("[CHAT] socket request auth with token " + token);
            const user = await resolveUser(token);
            if (user)
                console.log("[CHAT] socket logged as: " + user.username);
            socket.user = user;
        });

        socket.on("join", (room) => {
            console.log("[CHAT] socket join room " + room);
            socket.room = room;
        });

        socket.on("message", (room, message) => {
            if (socket.user) {
                console.log("[CHAT] socket message " + message + " in room #" + room);
                for (const roomSocket of sockets) {
                    if (roomSocket.room != null && roomSocket.room == room) {
                        console.log("[CHAT] Relay message from " + socket.user.username + " to " + (socket.user ? socket.user.username : "Anonymous client"));
                        roomSocket.emit("message", socket.user.username, message);
                    }
                }
            } else {
                socket.emit("error", "No authenticated")
            }
        })
    });

    return server;
}