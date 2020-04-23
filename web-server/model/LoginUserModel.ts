import mongoose, { Mongoose } from "mongoose";
import { ChatBody } from "./ChatRoomModel";
import jwt from "jsonwebtoken";
import config from "config";

const Schema = mongoose.Schema;

const loginUserSchema = new Schema(
  {
    userId: { type: String, required: false },
    userName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    numberType: { type: String, required: false },
    country: { type: String, required: false },
  },
  { timestamps: true }
);

loginUserSchema.methods.generateAuthToken = function (userId: String) {
  return jwt.sign({ id: userId ? userId : this._id }, config.get("privateKey"));
};

export const LoginUserModel = mongoose.model("loginUser", loginUserSchema);
