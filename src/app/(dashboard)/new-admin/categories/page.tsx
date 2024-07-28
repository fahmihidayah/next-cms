import { CategoriesTable } from "@/modules/categories/components/table";
import prisma from "../../../../lib/prisma";
import { CategoryRepository } from "@/data/category/repository";
type Props = {
    params: {
        slug: string;
    }
    searchParams: {
        q: string;
        page: string;
    }
}

const ListCategories = async (props : Props) => {
    const { params, searchParams } = props;
    const categories = await CategoryRepository.findbyQuery({
        q: (searchParams.q ?? ''),
        page: +(searchParams.page ?? "1"),
        limit: 10
    })
    return (
        <CategoriesTable paginatedData={categories}></CategoriesTable>
    );   
}

export default ListCategories;