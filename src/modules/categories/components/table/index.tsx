
import { Category } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table"
import { Button, Card, Heading, Table } from "@radix-ui/themes"
import { LucidePen, LucidePlus, LucideTrash } from "lucide-react";
import Link from "next/link";

export const CategoriesTable = ({ data }: { data: Category[] }) => {

    return (
        <Card>
            <div className="flex flex-row justify-between mb-4 ">
                <Heading size={"3"} className="content-center">Categories</Heading>
            <Link href={'categories/create'}>
            <Button color="green" className="hover:cursor-pointer">
                <LucidePlus className="size-3"></LucidePlus>
                Add Category
            </Button>
            </Link>
            </div>
            <Table.Root  variant="surface">
                <Table.Header>
                    <Table.Row>
                        <Table.Cell>ID</Table.Cell>
                        <Table.Cell>Name</Table.Cell>
                        <Table.Cell>Actions</Table.Cell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {data.map((category) => (
                        <Table.Row key={category.id}>
                            <Table.Cell>{category.id}</Table.Cell>
                            <Table.Cell>{category.name}</Table.Cell>
                            <Table.Cell >
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
        </Card>
    );
}