import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUser, IUserUpdate } from "../../interfaces/users";
import { hash } from "bcrypt";
import { AppError } from "../../errors/appError";

const softDeleteUserService = async (id: string): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);
  const userToSoftDelete = await userRepository.findOneBy({ id: id });

  if (!userToSoftDelete) {
    throw new AppError("User not found", 404);
  }

  if (!userToSoftDelete.isActive) {
    throw new AppError("User is alreary inactive", 400);
  }

  await userRepository
    .createQueryBuilder()
    .update({ isActive: false })
    .where({ id: id })
    .execute();

  const userSoftDeleted = await userRepository.findOneBy({ id: id });

  return userSoftDeleted!;
};

export default softDeleteUserService;
