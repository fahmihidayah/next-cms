'use server'
import { Category } from '@prisma/client';
import prisma from '../../../lib/prisma';
import { CategoryFormSchema } from '../type';

export const createCategory = async (category: CategoryFormSchema) : Promise<Category> => {
    return await prisma.category.create({
        data: {
            name: category.name,
        }
    });
}