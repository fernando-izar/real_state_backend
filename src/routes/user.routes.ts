import { Router } from "express";
import {
  createUserController,
  listUsersController,
  softDeleteUserController,
  updateUserController,
} from "../controllers/users.controlles";
import ensureAdmPermissionsMiddleware from "../middlewares/ensureAdmPermissions.middleware";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";
import ensureValidIdToSoftDeleteMiddleware from "../middlewares/ensureValidIdToSoftDelete.middleware";

const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.get(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  listUsersController
);
userRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureAdmPermissionsMiddleware,
  updateUserController
);
userRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  ensureValidIdToSoftDeleteMiddleware,
  softDeleteUserController
);

export default userRoutes;
