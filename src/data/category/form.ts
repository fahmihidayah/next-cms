import { z } from "zod";

export const categoryFormSchema = z.object({
    name: z.string().min(3).max(255),
});

export type CategoryForm = z.infer<typeof categoryFormSchema>;