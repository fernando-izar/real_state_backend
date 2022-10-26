import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUser } from "../../interfaces/users";

const listUsersService = async (): Promise<IUser[]> => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();
  const userResp = users.map((element) => {
    const { password, ...rest } = element;
    return rest;
  });
  return userResp;
};

export default listUsersService;
