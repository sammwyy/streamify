import chat from "./chat/chat";
import cors from "cors";
import express from "express";
import morgan from "morgan";

import authRoutes from "./auth/auth.routes";
import userRoutes from "./modules/users/user.routes";

const app = express();

app.use(cors({
    methods: ["GET", "POST", "DELETE", "PATCH"],
}))
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan("dev"));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

export default chat(app);