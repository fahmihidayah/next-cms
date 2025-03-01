'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { helloAction } from '@/actions/hello-action';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import useClientSession, { ClientSession } from '@/hooks/use-client-session';
import { cn } from '@/lib/utils';
import * as m from '@/paraglide/messages';

const formSchema = z.object({
  name: z.string().min(3),
});

type FormSchema = z.infer<typeof formSchema>;

export const HeroForm = () => {
  const clientSession: ClientSession | null = useClientSession();

  console.log('fahmi home page session ', clientSession?.session);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: clientSession?.session?.user?.email ?? '',
    },
  });

  useEffect(() => {
    form.setValue('name', clientSession?.session?.user?.email ?? '');
  }, [clientSession, form]);

  const { toast } = useToast();

  const onSubmit = async ({ name }: FormSchema) => {
    const { message } = await helloAction(name);

    toast({ description: message });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder={m.input_placeholder()}
                  className={cn(
                    'md:w-96',
                    form.formState.errors.name && 'border-destructive'
                  )}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button variant="secondary" type="submit">
          {m.submit_form()}
        </Button>
      </form>
    </Form>
  );
};
