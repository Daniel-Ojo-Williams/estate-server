import { UserInput } from "./users/user.validator";
import type { User } from "@prisma/client";

export interface IUserService {
  addUser: (user: UserInput) => Promise<void>;
  findUserByEmail: (email: string) => Promise<User | null>;
  findUserById: (id: string) => Promise<User | null>;
  findUserByUsername: (username: string) => Promise<User | null>;
  updateUserProfile: (
    id: string,
    data: Partial<User>
  ) => Promise<User | null>;
}


declare global {
  namespace Express {
    interface Locals {
      user: { id: string };
    }
  }
}