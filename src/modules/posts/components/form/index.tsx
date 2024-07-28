'use client'
import { Button } from "@radix-ui/themes";
import EditorForm from "../editor";
import { usePostForm } from "../../hook";
import { Post } from "@prisma/client";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ErrorMessage } from "@hookform/error-message";
import { useEffect } from "react";

{/* <div className="flex flex-row justify-between items-center">
                <h2 className="text-lg font-bold">Create Post</h2>
                <Button>Save</Button>
            </div>
            
            <EditorForm name="content" onChange={e => {
                console.log(e.target.value);
            }} /> */}


export const PostForm = ({ post }: { post: Post | null }) => {

    const { form, formActionState, onSubmit } = usePostForm({
        post
    });


    return (
        <div className="flex flex-col h-screen">
            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
                    <div className="flex flex-row justify-between">
                        <h3 className="text-lg">Post</h3>
                        <Button type="submit" className="w-min">
                            {formActionState.state === 'loading' ? 'Loading...' : 'Save'}
                        </Button>
                    </div>
                    {formActionState.state === 'idle' && (
                        <div className="text-destructive">{formActionState.message}</div>
                    )}
                    <FormField control={form.control} name="title"
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormControl>
                                        <>
                                            <FormLabel>Title</FormLabel>
                                            <Input
                                                className={
                                                    form.formState.errors.title && 'border-destructive'
                                                }
                                                {...field}
                                            />
                                            <ErrorMessage
                                                errors={form.formState.errors}
                                                name="title"
                                                render={({ message }) => (
                                                    <p className="text-destructive">{message}</p>
                                                )}
                                            />
                                        </>
                                    </FormControl>
                                </FormItem>
                            )
                        }}></FormField>
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormControl>
                                <EditorForm name={field.name}  onChange={(e) => {
                                    field.onChange(e);
                                    // field.onChange(e);
                                }} value={field.value} />
                            </FormControl>
                        )} />

                </form>

            </Form>
        </div>
    );
}
