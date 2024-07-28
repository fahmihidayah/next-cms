import { z } from "zod";

export const categoryFormSchema = z.object({
    id : z.number().optional(),
    name: z.string().min(3),
});


export type CategoryFormSchema = z.infer<typeof categoryFormSchema>;