'use client';

import { z } from 'zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import styles from '../_styles/auth.module.scss';
import { RegisterFormData } from '../_types/form';
import { RegisterSchema } from '../_schema/register.schema';
import { registerWithEmailAndPassword } from '../_actions';

type Inputs = z.infer<typeof RegisterSchema>;

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(RegisterSchema),
  });

  const submitData = async (data: RegisterFormData) => {
    const result = await registerWithEmailAndPassword(data);

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
        <h2 className={styles['header-title']}>Create your Free Account</h2>
      </div>

      <div className={styles['form']}>
        <form className="space-y-6" onSubmit={handleSubmit(submitData)}>
          <div className="form-field">
            <label htmlFor="email" className={styles['form-label']}>
              Email address
            </label>
            <div className="mt-2">
              <input id="email" className={styles['form-input']} {...register('email')} />
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

          <div className="form-field">
            <label htmlFor="confirm-password" className={styles['form-label']}>
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                id="confirm-password"
                type="password"
                className={styles['form-input']}
                {...register('confirmPassword')}
              />
            </div>
            {errors?.confirmPassword?.message && (
              <p className="pt-1.5 text-sm text-red-400">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className={styles['form-submit-button']}>
              Register
            </button>
          </div>
        </form>

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
