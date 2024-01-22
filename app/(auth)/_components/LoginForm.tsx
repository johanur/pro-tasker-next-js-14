'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { toast } from '@/components/ui/use-toast';

import { LoginFormData, LoginInputs } from '../_types';
import { LoginSchema } from '../_schema';
import { loginWithEmailAndPassword } from '../_actions';
import { AuthTokenResponsePassword } from '@supabase/gotrue-js';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import styles from '../_styles/auth.module.scss';

const LoginForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoginInputs>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);

    const result = await loginWithEmailAndPassword(data);

    if (result.error) {
      toast({
        duration: 4000,
        variant: 'destructive',
        title: result.error.message,
        description: 'Please ensure your email and password are correct',
      });
      setIsSubmitting(false);
      return;
    }

    toast({
      duration: 4000,
      title: "You're in!",
      description: 'You have successfully logged in',
    });
  };

  return (
    <div className={styles['authentication-container']}>
      <div className={styles.header}>
        <img
          className={styles['header-logo']}
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Pro Tasker"
        />
        <h2 className={styles['header-title']}>Login to your account</h2>
      </div>

      <div className={styles['form']}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      className="focus-visible:ring-2 focus-visible:ring-offset-0"
                      {...field}
                      data-1p-ignore
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      type="password"
                      className="focus-visible:ring-2 focus-visible:ring-offset-0"
                      {...field}
                      data-1p-ignore
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isSubmitting} type="submit" className="my-5 w-full bg-indigo-600 hover:bg-indigo-500">
              Login
            </Button>
          </form>
        </Form>
      </div>

      <div className={styles.footer}>
        <span className={styles['footer-text']}>Not a member? </span>
        <Link href="/register" className={styles['footer-action']}>
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
