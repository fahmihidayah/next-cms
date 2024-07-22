'use client'
import { FormActionState } from "@/types/form-state";
import { Post } from "@prisma/client";
import { UseFormReturn, useForm } from "react-hook-form";
import { PostFormSchema } from "../type";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { savePost } from "../action";
import { useState } from "react";

export type UsePostFormProps = {
    post? : Post;
}

export type UseCategoryHook = {
    onSubmit: (form: { title : string, 
        content: string, 
        categories: string[],
     }) => void;
    formActionState: FormActionState<Post | undefined | null>;
    form: UseFormReturn<PostFormSchema>;
}


export const usePostForm = () => {
    const router = useRouter();
    const {toast} = useToast();

    const form = useForm<PostFormSchema>({
        defaultValues: {
            title: '',
            content: '',
            categories: [],
        },
    });

    const [formActionState, setFormActionState] = useState<FormActionState<Post | undefined | null>>({
        data: null,
        message: '',
        state: 'idle',
    });

    const onSubmit = async (form: {
        title : string,
        content: string,
        categories: string[],
    }) => {
        try {
            const post = await savePost(form);
            toast({
                description: 'Post created successfully',
            });
            router.push(`/posts/${post.id}`);
        } catch (error) {
            toast({
                description: `${error}`,
                title: 'Error',
            });
        }
    }


    return {
        
    }
}