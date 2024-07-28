'use server'
import { Category } from '@prisma/client';
import prisma from '../../../lib/prisma';
import { CategoryFormSchema } from '../type';
import { revalidatePath } from 'next/cache';
import { FormActionState } from '@/types/form-state';

export const saveCategory = async (category: CategoryFormSchema) : Promise<Category> => {
    if(category.id) {
        return await prisma.category.update({
            where: {
                id: category.id,
            },
            data: {
                name: category.name,
            }
        });
    }
    return await prisma.category.create({
        data: {
            name: category.name,
        }
    });
}

export const deleteCategory = async (formState : FormActionState<string>, formData : FormData) : Promise<FormActionState<string>>=> {
    
    try {
        const id = formData.get('id') ?? "";
        console.log(id);
        await prisma.category.delete({
            where: {
                id : +id
            }
        });
        revalidatePath('/new-admin/categories');
        return {
            data : 'Category deleted successfully',
            state : 'success'

        }
    }
    catch(error) {
        console.error(error);
        return {
            data : 'Error deleting category',
            state : 'error'
        }

    }
}