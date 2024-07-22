import { Post } from "@prisma/client"
import { Button, Heading, Table } from "@radix-ui/themes";
import { LucidePen, LucidePlus, LucideTrash } from "lucide-react";
import Link from "next/link";

export const PostTable = ({ data }: { data: Post[] }) => {
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
                    {data.map((post) => (
                        <Table.Row key={post.id}>
                            <Table.Cell>{post.id}</Table.Cell>
                            <Table.Cell>{post.title}</Table.Cell>
                            <Table.Cell>
                                <div className="flex flex-row gap-3">
                                    <Button color="blue">
                                        <LucidePen className="size-3"></LucidePen>
                                        Edit
                                    </Button>
                                    <Button color="red" className="hover:cursor-pointer">
                                        <LucideTrash className="size-3"></LucideTrash>
                                        Delete
                                    </Button>
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>

        </>
    );
};