import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";

const ensureValidIdToSoftDeleteMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const userRepository = AppDataSource.getRepository(User);
  const userToSoftDelete = await userRepository.findOneBy({ id: id });

  if (!userToSoftDelete) {
    return res.status(404).json({ message: "User not found" });
  }

  next();
};

export default ensureValidIdToSoftDeleteMiddleware;
