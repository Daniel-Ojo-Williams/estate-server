import { UserInput } from "./user.validator";
import type { User } from "@prisma/client";

export interface IUserService {
  addUser: (user: UserInput) => Promise<void>;
  findUserByEmail: (email: string) => Promise<User | null>;
  findUserById: (id: string) => Promise<User | null>;
}
