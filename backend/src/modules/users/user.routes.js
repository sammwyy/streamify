import { Router } from "express";
import { UserRegisterDto, UserEditDto } from "./user.dto";
import { useBodyDto } from "../../middlewares/dto.middleware";
import { registerUser, editUser, getCurrentUser, findUser } from "./user.controller";
import requireAuth from "../../middlewares/auth.middleware";

const router = Router();

router.get("/find", findUser);
router.get("/me", requireAuth(), getCurrentUser);
router.post("/register", useBodyDto(UserRegisterDto), registerUser);
router.post("/edit", useBodyDto(UserEditDto), requireAuth(), editUser);

export default router;