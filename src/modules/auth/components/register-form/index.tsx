'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { z } from 'zod';

import { useForm } from 'react-hook-form';
import { registerAction } from '@/actions/auth';
import { useRouter } from 'next/navigation';
import { FormActionState } from '@/types/form-state';

import { ErrorMessage } from '@hookform/error-message';
import { useState } from 'react';
import { User } from '@prisma/client';

const formSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

type FormSchema = z.infer<typeof formSchema>;

export const RegisterForm = () => {
  const router = useRouter();

  const [formActionState, setFormActionState] = useState<
    FormActionState<User | undefined | null>
  >({
    data: null,
    message: '',
    state: 'idle',
  });

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (form: {
    name: string;
    email: string;
    password: string;
  }) => {
    setFormActionState({
      ...formActionState,
      state: 'loading',
    });
    const formActionResult = await registerAction(form);
    if (formActionResult.state === 'success') {
      router.push('/auth/login?s=1');
    } else {
      setFormActionState(formActionResult);
    }
  };

  return (
    <div className="w-1/2 sm:w-1/4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex flex-col gap-5"
        >
          {formActionState.state === 'idle' && (
            <div className="text-destructive">{formActionState.message}</div>
          )}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <>
                    <FormLabel>Name</FormLabel>
                    <Input
                      className={
                        form.formState.errors.name && 'border-destructive'
                      }
                      {...field}
                    />
                    <ErrorMessage
                      errors={form.formState.errors}
                      name="name"
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      className={
                        form.formState.errors.email && 'border-destructive'
                      }
                      {...field}
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
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      className={
                        form.formState.errors.password && 'border-destructive'
                      }
                      {...field}
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
            {formActionState.state === 'loading' ? 'Loading...' : 'Register'}
          </Button>
        </form>
      </Form>
    </div>
  );
};
