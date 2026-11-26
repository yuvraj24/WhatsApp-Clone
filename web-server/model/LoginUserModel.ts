import mongoose, { Mongoose } from "mongoose";

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

loginUserSchema.index({ userId: 1 }, { unique: true, sparse: true });
loginUserSchema.index({ phoneNumber: 1 }, { unique: true });

export const LoginUserModel = mongoose.model("loginUser", loginUserSchema);
