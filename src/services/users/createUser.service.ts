import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUser } from "../../interfaces/users";
import { IUserRequest } from "../../interfaces/users";
import { hash } from "bcrypt";

const createUserService = async ({
  name,
  email,
  isAdm,
  password,
}: IUserRequest): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);

  const hashedPassword = await hash(password, 10);

  const user = userRepository.create({
    name,
    email,
    isAdm,
    password: hashedPassword,
    isActive: true,
  });
  await userRepository.save(user);

  return {
    name: user.name,
    email: user.email,
    isAdm: user.isAdm,
    isActive: true,
    id: user.id,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export default createUserService;
