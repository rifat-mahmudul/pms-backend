import { Request, Response } from "express";

import catchAsync from "../../utils/catchAsync";

import sendResponse from "../../utils/sendResponse";

import httpStatus from "../../constants/httpStatus";
import { UserServices } from "./user.service";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getAllUsersFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,

    success: true,

    message: "Users retrieved successfully",

    meta: result.meta,

    data: result.data,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getSingleUserFromDB(
    req.params.id as string,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,

    success: true,

    message: "User retrieved successfully",

    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.updateUserIntoDB(
    req.params.id as string,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,

    success: true,

    message: "User updated successfully",

    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.deleteUserFromDB(req.params.id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,

    success: true,

    message: "User deleted successfully",

    data: result,
  });
});

export const UserControllers = {
  getAllUsers,

  getSingleUser,

  updateUser,

  deleteUser,
};
