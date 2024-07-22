import { CategoriesTable } from "@/modules/categories/components/table";
import prisma from "../../../../lib/prisma";
type Props = {
    params: {
        slug: string;
    }
    searchParams: {
        q: string;
        offset: string;
    }
}

const ListCategories = async (props : Props) => {
    const { params, searchParams } = props;
    const categories = await prisma.category.findMany();
    return (
        <CategoriesTable data={categories}></CategoriesTable>
    );   
}

export default ListCategories;