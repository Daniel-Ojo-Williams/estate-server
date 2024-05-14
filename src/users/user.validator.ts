import { z } from "zod";

export const CreateUserInput = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string().email(),
  avatar: z.string().url().optional()
})

export type User = z.infer<typeof CreateUserInput>