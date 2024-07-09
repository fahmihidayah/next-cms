import authOptions from "@/app/api/auth/[...nextauth]/auth-options";
import { FormActionState } from "@/types/form-state";
import { Post } from "@prisma/client";
import { getSession } from "next-auth/react";

export const createPostAction = async (form: {title : string, content : string}): Promise<FormActionState<Post | undefined | null>> => {

    const session = await getSession(authOptions);

    console.log(session);

    // try {
    //     const post = await prisma?.post.create({
    //         data: {
    //             title: form.title,
    //             content: form.content,
    //             authorId: "a",
    //         }
    //     });
    //     return {
    //         data: post,
    //         state: 'success',
    //         message: '',
    //     };
    // } catch (e) {
    //     return {
    //         data: null,
    //         state: 'error',
    //         message: String(e),
    //     };
    // }
    return {
        data: null,
        state: 'error',
        message: 'Not implemented yet',

    }
}