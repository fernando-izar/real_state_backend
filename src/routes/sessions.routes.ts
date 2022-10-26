import { Router } from "express";
import { createSessionController } from "../controllers/sessions.controllers";

const sesssionRoutes = Router();

sesssionRoutes.post("", createSessionController);

export default sesssionRoutes;
