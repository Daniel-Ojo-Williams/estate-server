import { z } from "zod";

export const CreateUserInput = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string().email(),
  avatar: z.string().url().optional()
})

export const loginInput = CreateUserInput.pick({ email: true, password: true });

export type UserInput = z.infer<typeof CreateUserInput>

