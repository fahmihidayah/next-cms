import { FormActionState } from "@/types/form-state";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { CategoryFormSchema, categoryFormSchema } from "../type";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCategory } from "../action";
import { useToast } from "@/components/ui/use-toast";

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
            name: '',
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
            const category = await createCategory(form);
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