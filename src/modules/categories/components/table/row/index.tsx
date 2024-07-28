'use client'
import { deleteCategory } from "@/modules/categories/action";
import { Category } from "@prisma/client";
import { Button, Table } from "@radix-ui/themes";
import { LucidePen, LucideTrash } from "lucide-react";
import { useFormState } from "react-dom";

export const CategoryRow = ({ category }: { category: Category }) => {
    const [state, action ] = useFormState(deleteCategory, {}); 

    return <Table.Row key={category.id}>
        <Table.Cell>{category.id}</Table.Cell>
        <Table.Cell>{category.name}</Table.Cell>
        <Table.Cell >
            <div className="flex flex-row gap-3">
                <Button color="blue">
                    <LucidePen className="size-3"></LucidePen>
                    Edit
                </Button>
                <form action={action}>
                    <input type="hidden" name="id" value={category.id} />
                    <Button type="submit" color="red" className="hover:cursor-pointer">
                        <LucideTrash className="size-3"></LucideTrash>
                        Delete
                    </Button>
                </form>
            </div>
        </Table.Cell>
    </Table.Row>;
}