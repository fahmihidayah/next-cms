'use client'
import { deletePost } from "@/modules/posts/action";
import { Post } from "@prisma/client";
import { Button, Table } from "@radix-ui/themes";
import { LucidePen, LucideTrash } from "lucide-react";
import Link from "next/link";
import { useFormState } from "react-dom";

export const PostRow = ({ post }: { post: Post }) => {
    const [state, action] = useFormState(deletePost, {});

    return <Table.Row key={post.id}>
        <Table.Cell>{post.id}</Table.Cell>
        <Table.Cell>{post.title}</Table.Cell>
        <Table.Cell >
            <div className="flex flex-row gap-3">
                <Link href={`/new-admin/posts/${post.id}`}>
                    <Button color="blue" className="hover:cursor-pointer">
                        <LucidePen className="size-3"></LucidePen>
                        Edit
                    </Button>
                </Link>
                <form action={action}>
                    <input type="hidden" name="id" value={post.id} />
                    <Button type="submit" color="red" className="hover:cursor-pointer">
                        <LucideTrash className="size-3"></LucideTrash>
                        Delete
                    </Button>
                </form>
            </div>
        </Table.Cell>
    </Table.Row>;
}