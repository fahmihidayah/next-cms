'use client'
import { FormActionState } from "@/types/form-state";
import { Category } from "@prisma/client";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { CategoryFormSchema, categoryFormSchema } from "../type";
import { zodResolver } from "@hookform/resolvers/zod";
import { saveCategory } from "../action";
import { useToast } from "@/components/ui/use-toast";
import { revalidatePath } from "next/cache";

export type UseCategoryProps = {
    category?: Category;
}

export type UseCategoryHook = {
    onSubmit: (form: { name: string }) => void;
    formActionState: FormActionState<Category | undefined | null>;
    form: UseFormReturn<CategoryFormSchema>;
}

export const useCategoryForm = (props : UseCategoryProps) : UseCategoryHook => {
    const router = useRouter();

    const toast = useToast();

    const [formActionState, setFormActionState] = useState<
        FormActionState<Category | undefined | null>
    >({
        data: null,
        message: '',
        state: 'idle',
    });

    const form = useForm<CategoryFormSchema>({
        resolver: zodResolver(categoryFormSchema),
        defaultValues: {
            id: props.category?.id,
            name: props.category?.name || '',
        },
    });

    const onSubmit = async (form: {
        name: string;
    }) => {
        setFormActionState({
            ...formActionState,
            state: 'loading',
        });

        try {
            const category = await saveCategory(form);
            toast.toast({

                description: 'Category created successfully',
            });
            setFormActionState({
                data: category,
                message: 'Category created successfully',
                state: 'success',
            });
            
        }
        catch (error) {
            toast.toast({
                description: `An error occurred ${error}`,
            });
            setFormActionState({
                data: null,
                message: 'An error occurred',
                state: 'error',
            });
        }

    };
    return {
        onSubmit,
        formActionState,
        form,
    }

}