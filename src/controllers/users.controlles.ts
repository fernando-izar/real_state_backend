import { Request, Response } from "express";
import { IUserRequest, IUserUpdate } from "../interfaces/users";
import createUserService from "../services/users/createUser.service";
import listUsersService from "../services/users/listUsers.service";
import softDeleteUserService from "../services/users/softDeleteUser.service";
import updateUserService from "../services/users/updateUser.service";

const createUserController = async (req: Request, res: Response) => {
  try {
    const user: IUserRequest = req.body;
    const createdUser = await createUserService(user);
    return res.status(201).json(createdUser);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
};

const listUsersController = async (req: Request, res: Response) => {
  const users = await listUsersService();
  return res.json(users);
};

const updateUserController = async (req: Request, res: Response) => {
  const dataToUpdate: IUserUpdate = req.body;
  const { id } = req.params;
  const userUpdated = await updateUserService(id, dataToUpdate);
  return res.json(userUpdated);
};

const softDeleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userSoftDeleted = await softDeleteUserService(id);
  return res.status(204).json(userSoftDeleted);
};

export {
  createUserController,
  listUsersController,
  updateUserController,
  softDeleteUserController,
};
