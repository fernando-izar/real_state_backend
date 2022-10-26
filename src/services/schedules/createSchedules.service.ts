import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";
import { Schedules } from "../../entities/schedules.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";
import { IScheduleRequest } from "../../interfaces/schedules";

const createSchedulesService = async (
  id: string,
  date: Date,
  hour: Date,
  propertyId: string
): Promise<Schedules> => {
  const schedulesRepository = AppDataSource.getRepository(Schedules);
  const usersRepository = AppDataSource.getRepository(User);
  const propertiesRepository = AppDataSource.getRepository(Properties);

  const user = await usersRepository.findOneBy({ id });
  const property = await propertiesRepository.findOneBy({ id: propertyId });

  const hourValidator = hour.toString().split(":")[0];
  const minuteValidator = hour.toString().split(":")[1];

  if (+hourValidator < 8) {
    throw new AppError("Schedule before 8:00h is not allowed", 400);
  }

  if (+hourValidator >= 18 && +minuteValidator != 0) {
    throw new AppError("Schedule after 18:00h is not allowed", 400);
  }

  const dateValidator = new Date(date);
  const day = dateValidator.getDay();
  if (day === 0 || day === 6) {
    throw new AppError("Day not permited to be scheduled");
  }

  if (!property) {
    throw new AppError("Invalid property", 404);
  }

  const scheduleAlreadyExists = await schedulesRepository.findOneBy({
    date,
    hour,
  });
  const userAlreadyScheduled = await schedulesRepository.find({
    where: {
      user: {
        id: user!.id,
      },
    },
  });
  const propertyAlreadyScheduled = await schedulesRepository.find({
    where: {
      property: {
        id: property.id,
      },
    },
  });

  if (scheduleAlreadyExists && propertyAlreadyScheduled) {
    if (userAlreadyScheduled) {
      throw new AppError("Already scheduled", 400);
    }
    throw new AppError("Property already schedule for this date", 400);
  }

  const schedule = schedulesRepository.create({
    date,
    hour,
    user: user!,
    property,
  });

  await schedulesRepository.save(schedule);

  return schedule;
};

export default createSchedulesService;
