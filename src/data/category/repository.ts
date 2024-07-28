import { Category } from '@prisma/client';
import prisma from '../../lib/prisma'
import { CategoryForm } from './form';
import { Paginated, Query } from '@/types/query';

export const CategoryRepository = {

    findAll : async () : Promise<Category[]> => {
        return prisma.category.findMany();
    },

    findbyQuery : async (query: Query) : Promise<Paginated<Category>> => {
        const categories = await prisma.category.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: query.q
                        }
                    }
                ]
            },
            skip: query.limit * (query.page - 1),
            take: query.limit
        });

        const total = await prisma.category.count({
            where: {
                OR: [
                    {
                        name: {
                            contains: query.q
                        }
                    }
                ]
            }
        });

        return {
            data: categories,
            page: query.page,
            total: total
        }
    },

    findById : async (id: number) : Promise<Category | null> => {
        return prisma.category.findUnique({
            where: {
                id
            }
        });
    },

    create : async (category: CategoryForm) : Promise<Category> => {
        return prisma.category.create({
            data: category
        });
    },

    update : async (id: number, category: CategoryForm) : Promise<Category> => {
        return prisma.category.update({
            where: {
                id
            },
            data: category
        });
    },

    delete : async (id: number) : Promise<Category> => {
        return prisma.category.delete({
            where: {
                id
            }
        });
    }

}