export {};
import express from "express";
import { loginUser, getLoggedInUserList } from "../controller/authController";
import authUser from "../middleware/auth";

const router = express.Router();

router.get("/userList", authUser, getLoggedInUserList);
router.post("/loginUser", loginUser);

export default router;
