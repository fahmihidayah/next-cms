'use server'
import { Post } from "@prisma/client";
import { PostFormSchema } from "../type";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { FormActionState } from "@/types/form-state";
import { UserRepository } from "@/data/user/repository";
import { PostRepository } from "@/data/post/repository";

export const savePost = async (post: PostFormSchema) : Promise<Post> => {
    const session = await getServerSession();
    const userEmail = session?.user?.email
    if(!userEmail) {
        throw new Error('Unauthorized');
    }
    const author = await UserRepository.findByEmail(userEmail);

    if(!author) {
        throw new Error('User not found');
    }

    if(post.id) {
        return await PostRepository.update(post, author.id);
    }
    else {
        return await PostRepository.create(post, author.id);
    }
}

export const deletePost = async (formState : FormActionState<string>, formData : FormData) : Promise<FormActionState<string>> => {
    const id = +(formData.get('id') ?? "");
    try {
        await prisma.post.delete({
            where: {
                id
            }
        });
        revalidatePath('/new-admin/posts');
        return {
            data : 'Post deleted successfully',
            state : 'success'
        }
    }
    catch(error) {
        console.error(error);
        return {
            data : 'Error deleting post',
            state : 'error'
        }
    }
}