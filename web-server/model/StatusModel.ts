import mongoose, { Mongoose } from "mongoose";
const Schema = mongoose.Schema;

const UserModel = {
  userId: { type: String, required: true },
};
const StatusItemModel = {
  image: { type: String, required: true },
  message: { type: String, required: true },
  seenUsers: { type: [String], required: true },
  time: { type: String, required: true },
};

const statusSchema = new Schema(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    lastStatusTime: { type: String, required: true },
    status: { type: [StatusItemModel], required: true },
  },
  { timestamps: true }
);

export const StatusModel = mongoose.model("userStatus", statusSchema); 
