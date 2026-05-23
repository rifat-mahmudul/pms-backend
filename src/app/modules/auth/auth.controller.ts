import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "../../constants/httpStatus";
import { AuthServices } from "./auth.service";
import { envVars } from "../../config/env";

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.register(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.login(req.body);

  res.cookie("refreshToken", result.refreshToken, {
    secure: envVars.node_env === "production",
    httpOnly: true,
    sameSite: "none",
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: {
      accessToken: result.accessToken,
    },
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  const result = await AuthServices.getNewAccessToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,

    success: true,

    message: "Access token retrieved successfully",

    data: result,
  });
});

const logout = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie("refreshToken", {
    secure: envVars.node_env === "production",

    httpOnly: true,

    sameSite: "none",
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,

    success: true,

    message: "Logged out successfully",

    data: null,
  });
});

export const AuthControllers = {
  register,
  login,
  refreshToken,
  logout,
};
