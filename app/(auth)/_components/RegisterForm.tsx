'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import styles from '../_styles/auth.module.scss';

import { toast } from '@/components/ui/use-toast';

import { RegisterFormData, RegistrationInputs } from '../_types';
import { RegisterSchema } from '../_schema';
import { registerWithEmailAndPassword } from '../_actions';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const RegisterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RegistrationInputs>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    toast({
      duration: 4000,
      title: 'Registering...',
      description: 'Verifying your information and creating your account. Please wait...',
    });

    setIsSubmitting(true);

    const result = await registerWithEmailAndPassword(data);

    if (result.error) {
      toast({
        duration: 4000,
        variant: 'destructive',
        title: 'Registration failed',
        description: result.error.message,
      });
      setIsSubmitting(false);
      return;
    }

    toast({
      duration: 3000,
      title: 'Welcome aboard!',
      description: 'You have successfully registered',
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
        <h2 className={styles['header-title']}>Create your Free Account</h2>
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
                    <Input disabled={isSubmitting} {...field} data-1p-ignore />
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
                    <Input disabled={isSubmitting} type="password" {...field} data-1p-ignore />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input disabled={isSubmitting} type="password" {...field} data-1p-ignore />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isSubmitting} type="submit" className="my-5 w-full bg-indigo-600 hover:bg-indigo-500">
              Register
            </Button>
          </form>
        </Form>

        <div className={styles.footer}>
          <span className={styles['footer-text']}>Already a member? </span>
          <Link href="/login" className={styles['footer-action']}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
