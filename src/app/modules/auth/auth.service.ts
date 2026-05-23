import bcrypt from "bcrypt";
import User from "../user/user.model";
import httpStatus from "../../constants/httpStatus";
import { createToken } from "../../utils/jwt";
import AppError from "../../errors/appError";
import { envVars } from "../../config/env";

const register = async (payload: any) => {
  const existingUser = await User.findOne({
    email: payload.email,
  });

  if (existingUser) {
    throw new AppError(httpStatus.CONFLICT, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(envVars.bcrypt_salt_rounds),
  );

  payload.password = hashedPassword;

  const result = await User.create(payload);

  return result;
};

const login = async (payload: { email: string; password: string }) => {
  const user = await User.findOne({
    email: payload.email,
  }).select("+password");

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Password does not match");
  }

  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    envVars.jwt_access_secret,
    envVars.jwt_access_expires_in,
  );

  const refreshToken = createToken(
    jwtPayload,
    envVars.jwt_refresh_secret,
    envVars.jwt_refresh_expires_in,
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthServices = {
  register,
  login,
};
