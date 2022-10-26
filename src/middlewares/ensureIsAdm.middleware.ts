import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { User } from "../entities/user.entity";
import jwt_decode, { JwtPayload } from "jwt-decode";

const ensureIsAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  const decodedToken = <JwtPayload>jwt_decode(token);

  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: decodedToken.sub });

  if (!user?.isAdm) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }
  next();
};

export default ensureIsAdmMiddleware;
