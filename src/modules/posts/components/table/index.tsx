import { PaginateComponent } from "@/components/admin-ui/paginate";
import { Paginated } from "@/types/query";
import { Post } from "@prisma/client"
import { Button, Heading, Table } from "@radix-ui/themes";
import { LucidePen, LucidePlus, LucideTrash } from "lucide-react";
import Link from "next/link";
import { PostRow } from "./row";

export const PostTable = ({ paginatedData }: { paginatedData: Paginated<Post> }) => {
    return (
        <>
            <div className="flex flex-row justify-between mb-4 ">
                <Heading size={"3"} className="content-center">Posts</Heading>
                <Link href={'posts/create'}>
                    <Button color="green" className="hover:cursor-pointer">
                        <LucidePlus className="size-3"></LucidePlus>
                        Add Post
                    </Button>
                </Link>
            </div>
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        <Table.Cell>ID</Table.Cell>
                        <Table.Cell>Title</Table.Cell>
                        <Table.Cell>Actions</Table.Cell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {paginatedData.data.map((post) => (
                        <PostRow key={post.id} post={post}></PostRow>
                    ))}
                </Table.Body>
            </Table.Root>
            <PaginateComponent total={paginatedData.total} page={paginatedData.page}></PaginateComponent>

        </>
    );
};