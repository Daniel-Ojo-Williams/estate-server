import { UserInput } from "./user.validator";

export interface IUserService {
  addUser: (user: UserInput) => Promise<void>;
}
export type User = UserInput & { id: string, createdAt: Date };
