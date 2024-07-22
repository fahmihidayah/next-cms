'use client'
import { Category } from "@prisma/client";
import { Button, Card, Heading } from "@radix-ui/themes";
import { useCategoryForm } from "../../hook";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ErrorMessage } from "@hookform/error-message";

export const CategoryForm = ({ category }: { category?: Category }) => {
    const { form, formActionState, onSubmit } = useCategoryForm({
        category,
    });
    return (
        <Card>
            <Heading size={"3"} className="content-center">Category</Heading>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
                    {formActionState.state === 'idle' && (
                        <div className="text-destructive">{formActionState.message}</div>
                    )}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <>
                                        <FormLabel>Name</FormLabel>
                                        <Input
                                            className={
                                                form.formState.errors.name && 'border-destructive'
                                            }
                                            {...field}
                                        />
                                        <ErrorMessage
                                            errors={form.formState.errors}
                                            name="name"
                                            render={({ message }) => (
                                                <p className="text-destructive">{message}</p>
                                            )}
                                        />
                                    </>
                                </FormControl>
                            </FormItem>
                        )}>
                    </FormField>
                    <Button type="submit" className="w-min">
                        {formActionState.state === 'loading' ? 'Loading...' : 'Save'}
                    </Button>
                </form>

            </Form>


        </Card>
    );
}