'use client'
import { Category } from "@prisma/client";
import { createColumnHelper } from "@tanstack/react-table"
import { Button, Card, Heading, Table } from "@radix-ui/themes"
import { LucidePen, LucidePlus, LucideTrash } from "lucide-react";
import Link from "next/link";
import { deleteCategory } from "../../action";
import { CategoryRow } from "./row";
import { PaginateComponent } from "@/components/admin-ui/paginate";
import { Paginated } from "@/types/query";

export const CategoriesTable = ({ paginatedData }: { paginatedData: Paginated<Category> }) => {

    return (
        <>
            <div className="flex flex-row justify-between mb-4 ">
                <Heading size={"3"} className="content-center">Categories</Heading>
                <Link href={'categories/create'}>
                    <Button color="green" className="hover:cursor-pointer">
                        <LucidePlus className="size-3"></LucidePlus>
                        Add Category
                    </Button>
                </Link>
            </div>
            <Table.Root variant="surface">
                <Table.Header>
                    <Table.Row>
                        <Table.Cell>ID</Table.Cell>
                        <Table.Cell>Name</Table.Cell>
                        <Table.Cell>Actions</Table.Cell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {paginatedData.data.map((category) => (
                        <CategoryRow category={category} key={category.id} />
                    ))}
                </Table.Body>
            </Table.Root>
            <PaginateComponent total={paginatedData.total} page={paginatedData.page}></PaginateComponent>
        </>
    );
}