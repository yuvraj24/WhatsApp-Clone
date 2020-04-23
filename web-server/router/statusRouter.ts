export {};
import express from "express";
import {
  getAllUserStatus,
  createUserStatus,
  setUserStatusViewed,
} from "../controller/statusController";
import authUser from "../middleware/auth";

const router = express.Router();

router.get("/getAllStatus", authUser, getAllUserStatus);
router.post("/createStatus", authUser, createUserStatus);
router.post("/statusViewed", authUser, setUserStatusViewed);

export default router;
