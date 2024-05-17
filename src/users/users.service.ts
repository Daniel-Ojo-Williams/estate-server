import { UserInput } from "./user.validator";
import { prisma } from "../config/client";
import CustomError from "../helpers/customError";
import { HttpCode } from "../constants";
import { IUserService } from "./users.types";
import type { User } from "@prisma/client";

export class UserService implements IUserService{
  async addUser(user: UserInput) {
    // --| Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (existingUser)
      throw new CustomError(
        HttpCode.CONFLICT,
        "User already exists, please login"
      );

    await prisma.user.create({
      data: user,
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    return user;
  }

  async findUserById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id }
    })

    return user;
  }
}


// export const userService = new UserService();
