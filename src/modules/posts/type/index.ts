import { z } from "zod";

export const postFormSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(3),
    categories: z.array(z.string()).optional(),
});

export type PostFormSchema = z.infer<typeof postFormSchema>;