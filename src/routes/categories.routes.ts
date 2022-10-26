import { Router } from "express";
import {
  createCategoryController,
  listCategoriesController,
  listPropertiesCategoryController,
} from "../controllers/categories.controllers";
import ensureAdmPermissionsMiddleware from "../middlewares/ensureAdmPermissions.middleware";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const categoryRoutes = Router();

categoryRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  createCategoryController
);
categoryRoutes.get("", listCategoriesController);
categoryRoutes.get("/:id/properties", listPropertiesCategoryController);

export default categoryRoutes;
