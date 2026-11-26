export {};
import express from "express";
import rateLimit from "express-rate-limit";
import {
  getAuthenticatedUser,
  searchUserByPhone,
  syncAuthenticatedUser,
} from "../controller/authController";
import authUser from "../middleware/auth";

const router = express.Router();
const contactSearchLimit = rateLimit({
  windowMs: 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/session", authUser, syncAuthenticatedUser);
router.get("/me", authUser, getAuthenticatedUser);
router.get("/search", authUser, contactSearchLimit, searchUserByPhone);

export default router;
