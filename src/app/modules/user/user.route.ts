import { Router } from "express";

import auth from "../../middlewares/auth";

import { USER_ROLE } from "./user.constant";

import { UserControllers } from "./user.controller";

const router = Router();

router.get(
  "/",

  auth(USER_ROLE.ADMIN),

  UserControllers.getAllUsers,
);

router.get(
  "/:id",

  auth(USER_ROLE.ADMIN, USER_ROLE.MANAGER),

  UserControllers.getSingleUser,
);

router.patch(
  "/:id",

  auth(USER_ROLE.ADMIN, USER_ROLE.MANAGER),

  UserControllers.updateUser,
);

router.delete(
  "/:id",

  auth(USER_ROLE.ADMIN),

  UserControllers.deleteUser,
);

export const UserRoutes = router;
