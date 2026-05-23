import User from "./user.model";

import httpStatus from "../../constants/httpStatus";
import AppError from "../../errors/appError";
import QueryBuilder from "../../builder/queryBuilder";

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const searchableFields = ["name", "email"];

  const userQuery = new QueryBuilder(
    User.find({
      isDeleted: false,
    }),

    query,
  )
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const data = await userQuery.modelQuery;

  const meta = await userQuery.countTotal();

  return {
    meta,
    data,
  };
};

const getSingleUserFromDB = async (id: string) => {
  const user = await User.findById(id);

  if (!user || user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  return user;
};

const updateUserIntoDB = async (
  id: string,
  payload: Record<string, unknown>,
) => {
  const user = await User.findById(id);

  if (!user || user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const updatedUser = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return updatedUser;
};

const deleteUserFromDB = async (id: string) => {
  const user = await User.findById(id);

  if (!user || user.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const result = await User.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  );

  return result;
};

export const UserServices = {
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserIntoDB,
  deleteUserFromDB,
};
