import { Router } from "express";
import { login, logout } from "./auth.controller";
import { useBodyDto } from "../middlewares/dto.middleware";
import { UserLoginDto } from "../modules/users/user.dto";

const router = Router();

router.post("/login", useBodyDto(UserLoginDto), login);
router.get("/logout", logout);

export default router;