import { z } from "zod";

export const userFormSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
});

export type UserForm = z.infer<typeof userFormSchema>