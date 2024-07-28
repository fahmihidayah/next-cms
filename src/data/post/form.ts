import { z } from "zod";

export const postFormSchema = z.object({  
    id : z.number().optional(),  
    title: z.string().min(3).max(255),
    content: z.string().min(3),
    categories : z.array(z.string()).optional(),
});

export type PostForm = z.infer<typeof postFormSchema>;