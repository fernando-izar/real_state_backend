import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUser, IUserUpdate } from "../../interfaces/users";
import { hash } from "bcrypt";
import { AppError } from "../../errors/appError";

const updateUserService = async (
  id: string,
  dataToUpdate: IUserUpdate
): Promise<IUser> => {
  const isValidParameters = Object.keys(dataToUpdate).map((elem) => {
    return elem !== "email" && elem !== "name" && elem !== "password" ? 0 : 1;
  });

  if (isValidParameters.includes(0)) {
    throw new AppError("Invalid parameters", 401);
  }

  const userRepository = AppDataSource.getRepository(User);
  const userToUpdate = await userRepository.findOneBy({ id: id });

  if (!userToUpdate) {
    throw new AppError("User not found", 401);
  }

  if (dataToUpdate.password) {
    dataToUpdate.password = await hash(dataToUpdate.password, 10);
  }

  await userRepository
    .createQueryBuilder()
    .update({ ...dataToUpdate })
    .where({ id: id })
    .execute();

  const userUpdated = await userRepository.findOneBy({ id: id });

  return userUpdated!;
};

export default updateUserService;
