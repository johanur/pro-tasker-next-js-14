'use client';

import { z } from 'zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import styles from '../_styles/auth.module.scss';
import { LoginFormData } from '../_types/form';
import { LoginSchema } from '../_schema';
import { loginWithEmailAndPassword } from '../_actions';

type Inputs = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(LoginSchema),
  });

  const submitData = async (data: LoginFormData) => {
    const result = await loginWithEmailAndPassword(data);

    // TODO: While Submitting - Disable Input fields and submit button. If possible add spinner to submit button
    // TODO: Handle Error & Success - Show Toastr
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

      <div className={styles['form']} onSubmit={handleSubmit(submitData)}>
        <form className="space-y-6">
          <div className="form-field">
            <label htmlFor="email" className={styles['form-label']}>
              Email address
            </label>
            <div className="mt-2">
              <input id="email" type="text" className={styles['form-input']} {...register('email')} />
            </div>
            {errors?.email?.message && <p className="pt-1.5 text-sm text-red-400">{errors.email.message}</p>}
          </div>

          <div className="form-field">
            <label htmlFor="password" className={styles['form-label']}>
              Password
            </label>
            <div className="mt-2">
              <input id="password" type="password" className={styles['form-input']} {...register('password')} />
            </div>
            {errors?.password?.message && <p className="pt-1.5 text-sm text-red-400">{errors.password.message}</p>}
          </div>

          <div className="form-actions">
            <button type="submit" className={styles['form-submit-button']}>
              Login
            </button>
          </div>
        </form>
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
