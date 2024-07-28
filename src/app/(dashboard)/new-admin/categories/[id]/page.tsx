import { CategoryForm } from "@/modules/categories/components/form";
import prisma from "../../../../../lib/prisma";
import { notFound } from "next/navigation";
type Props = {
    searchParams: {

    };
    params: {
        id: string;
    }
}

const EditCategoryPage = async ({ searchParams, params }: Props) => {
    const category = await prisma.category.findUnique({
        where: {
            id: Number(params.id)
        }
    });
    if(!category) {
        notFound();
    }
    return <div className="flex flex-col">
        <CategoryForm category={category} />
    </div>
}

export default EditCategoryPage;