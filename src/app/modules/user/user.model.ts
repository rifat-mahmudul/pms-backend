import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import { USER_ROLE } from "./user.constant";

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: 0,
    },

    role: {
      type: String,
      enum: Object.values(USER_ROLE),
      default: USER_ROLE.MEMBER,
    },

    department: {
      type: String,
    },

    skills: {
      type: [String],
      default: [],
    },

    avatar: {
      type: String,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const User = model<TUser>("User", userSchema);

export default User;
