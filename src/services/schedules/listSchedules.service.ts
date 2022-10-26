import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";
import { Schedules } from "../../entities/schedules.entity";
import { AppError } from "../../errors/appError";

const listSchedulesService = async (id: string): Promise<Schedules[]> => {
  const schedulesRepository = AppDataSource.getRepository(Schedules);
  const propertiesReposiroty = AppDataSource.getRepository(Properties);

  const property = await propertiesReposiroty.findOneBy({ id });

  if (!property) {
    throw new AppError("Invalid property", 404);
  }

  const schedules = await schedulesRepository.find({
    where: {
      property: {
        id: property.id,
      },
    },
    relations: {
      property: true,
      user: true,
    },
  });

  return schedules;
};

export default listSchedulesService;
