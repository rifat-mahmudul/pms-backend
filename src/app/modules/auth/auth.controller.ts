import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from '../../constants/httpStatus';
import { AuthServices } from './auth.service';

const register = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await AuthServices.register(req.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  },
);

const login = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AuthServices.login(
      req.body,
    );

    res.cookie('refreshToken', result.refreshToken, {
      secure: false,
      httpOnly: true,
    });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User logged in successfully',
      data: {
        accessToken: result.accessToken,
      },
    });
  },
);

export const AuthControllers = {
  register,
  login,
};