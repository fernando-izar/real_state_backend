import { Router } from "express";
import {
  createPropertyController,
  listPropertiesController,
} from "../controllers/properties.controller";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const propertyRoutes = Router();

propertyRoutes.post("", ensureIsAdmMiddleware, createPropertyController);
propertyRoutes.get("", listPropertiesController);

export default propertyRoutes;
