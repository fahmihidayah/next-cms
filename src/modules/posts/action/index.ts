import { Post } from "@prisma/client";
import { PostFormSchema } from "../type";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const savePost = async (post: PostFormSchema) : Promise<Post> => {
    const session = await getServerSession();
    const userEmail = session?.user?.email
    if(!userEmail) {
        throw new Error('Unauthorized');
    }
    const author = await prisma.user.findUnique({
        where: {
            email: userEmail,
        }
    });

    return await prisma.post.create({
        data: {
            title: post.title,
            content: post.content,
            author: {
                connect: {
                    id: author?.id,
                }
            },
        },
    });
}