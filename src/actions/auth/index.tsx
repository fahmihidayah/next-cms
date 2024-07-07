'use server';

import { FormActionState } from '@/types/form-state';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

export const registerAction = async (form: {
  name: string;
  email: string;
  password: string;
}): Promise<FormActionState<User | undefined | null>> => {
  try {
    const user = await prisma?.user.create({
      data: {
        name: form.name,
        email: form.email,
        password: await bcrypt.hash(form.password, 10),
      },
    });
    return {
      data: user,
      state: 'success',
      message: '',
    };
  } catch (e) {
    return {
      data: null,
      state: 'error',
      message: String(e),
    };
  }
};
