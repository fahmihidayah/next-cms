import { Post } from "@prisma/client";
import prisma from "@/lib/prisma";
import { PostForm } from "./form";
import { Paginated, Query } from "@/types/query";
export const PostRepository = {

    findAll: async () : Promise<Post[]> => {
        return await prisma.post.findMany();
    },

    findByQuery : async (query: Query) : Promise<Paginated<Post>> => {
        const posts = await prisma.post.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: query.q
                        }
                    },
                    {
                        content: {
                            contains: query.q
                        }
                    }
                ]
            },
            skip: query.limit * (query.page - 1),
            take: query.limit
        });

        const total = await prisma.post.count({
            where: {
                OR: [
                    {
                        title: {
                            contains: query.q
                        }
                    },
                    {
                        content: {
                            contains: query.q
                        }
                    }
                ]
            }
        });

        return {
            data: posts,
            page: query.page,
            total: total
        }
    },


    findById : async (id: number) : Promise<Post | null> => {
        return await prisma.post.findUnique({
            where: {
                id
            }
        });
    },

    create : async (post: PostForm, authorId : string) : Promise<Post> => {
        return await prisma.post.create({
            data: {
                title: post.title,
                content: post.content,
                authorId: authorId,
            }
        });
    },

    update : async (post: PostForm, authorId : string) : Promise<Post> => {   
        return await prisma.post.update({
            where: {
                id: post.id
            },
            data: {
                title: post.title,
                content: post.content,
                authorId: authorId
            }
        });
    }



}