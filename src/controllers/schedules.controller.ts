import { Request, Response } from "express";
import { IScheduleRequest } from "../interfaces/schedules";
import createSchedulesService from "../services/schedules/createSchedules.service";
import listSchedulesService from "../services/schedules/listSchedules.service";

const createSchedulesController = async (req: Request, res: Response) => {
  const date = req.body.date;
  const hour = req.body.hour;
  const propertyId = req.body.propertyId;
  const id: string = req.user.id;
  const scheduleCreated = await createSchedulesService(
    id,
    date,
    hour,
    propertyId
  );
  return res.status(201).json({ message: "Schedule created" });
};

const listSchedulesController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const schedules = await listSchedulesService(id);
  res.json({ schedules: schedules });
};

export { createSchedulesController, listSchedulesController };
