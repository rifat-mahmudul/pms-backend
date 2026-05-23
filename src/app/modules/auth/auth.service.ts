import bcrypt from "bcrypt";
import User from "../user/user.model";
import httpStatus from "../../constants/httpStatus";
import AppError from "../../errors/appError";
import config from "../../config/env";

const register = async (payload: any) => {
  const existingUser = await User.findOne({
    email: payload.email,
  });

  if (existingUser) {
    throw new AppError(httpStatus.CONFLICT, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds),
  );

  payload.password = hashedPassword;

  const result = await User.create(payload);

  return result;
};

export const AuthServices = {
  register,
};
