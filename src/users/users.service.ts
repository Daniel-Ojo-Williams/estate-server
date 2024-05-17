import { UserInput } from "./user.validator";
import { prisma } from "../config/client";
import CustomError from "../helpers/customError";
import { HttpCode } from "../constants";
import { IUserService } from "./users.types";

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
}


// export const userService = new UserService();
