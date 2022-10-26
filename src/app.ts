import "reflect-metadata";
import express from "express";
import "express-async-errors";
import userRoutes from "./routes/user.routes";
import categoryRoutes from "./routes/categories.routes";
import sesssionRoutes from "./routes/sessions.routes";
import handleErrorMiddleware from "./middlewares/handleError.middleware";
import propertyRoutes from "./routes/properties.routes";
import scheduleRoutes from "./routes/schedules.routes";

const app = express();

app.use(express.json());
app.use("/users", userRoutes);
app.use("/login", sesssionRoutes);
app.use("/categories", categoryRoutes);
app.use("/properties", propertyRoutes);
app.use("/schedules", scheduleRoutes);

app.use(handleErrorMiddleware);

export default app;
