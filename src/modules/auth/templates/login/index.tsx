'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { z } from 'zod';

import { useForm } from 'react-hook-form';
import { FormActionState } from '@/types/form-state';

import { ErrorMessage } from '@hookform/error-message';
import { signIn } from 'next-auth/react';
import { User } from '@prisma/client';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormSchema = z.infer<typeof formSchema>;

export const LoginPage = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [formState, setFormState] = useState<
    FormActionState<User | undefined | null>
  >({
    data: null,
    message: '',
    state: 'idle',
  });

  const onSubmit = async (form: { email: string; password: string }) => {
    try {
      setFormState({
        ...formState,
        state: 'loading',
      });
      const result = await signIn('credentials', {
        email: form.email,
        password: form.password,
        redirect: false,
        callbackUrl: '/',
      });

      console.log('fahmi ', result?.ok, result?.error);
      if (!result?.ok) {
        setFormState({
          state: 'error',
          message:
            result?.error ?? 'An error occurred. Please try again later.',
        });
        return;
      } else {
        setFormState({
          state: 'success',
          message: 'Success',
        });
      }
    } catch (e) {
      console.log('fahmi error ', e);
      setFormState({
        state: 'error',
        message: String(e),
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex flex-col gap-5 w-1/2 sm:w-1/4 py-10"
        >
          {formState.state === 'error' && (
            <div className="text-destructive">{formState.message}</div>
          )}
          {formState.state === 'success' && (
            <div className="text-success">{formState.message}</div>
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      {...field}
                      type="email"
                      id="email"
                      className={
                        form.formState.errors.email && 'border-destructive'
                      }
                    />
                    <ErrorMessage
                      errors={form.formState.errors}
                      name="email"
                      render={({ message }) => (
                        <p className="text-destructive">{message}</p>
                      )}
                    />
                  </>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                      {...field}
                      className={
                        form.formState.errors.password && 'border-destructive'
                      }
                      type="password"
                      id="password"
                    />
                    <ErrorMessage
                      errors={form.formState.errors}
                      name="password"
                      render={({ message }) => (
                        <p className="text-destructive">{message}</p>
                      )}
                    />
                  </>
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">
            {formState.state === 'loading' ? 'Loading...' : 'Login'}
          </Button>
        </form>
      </Form>
    </div>
  );
};
