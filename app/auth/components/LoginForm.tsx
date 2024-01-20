import Link from 'next/link';
import styles from '../styles/auth.module.scss';

const LoginForm = () => {
  return (
    <div className={styles['authentication-container']}>
      <div className={styles.header}>
        <img
          className={styles['header-logo']}
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Pro Tasker"
        />
        <h2 className={styles['header-title']}>Sign in to your account</h2>
      </div>

      <div className={styles['form']}>
        <form className="space-y-6">
          <div className="form-field">
            <label htmlFor="email" className={styles['form-label']}>
              Email address
            </label>
            <div className="mt-2">
              <input id="email" name="email" type="email" className={styles['form-input']} />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="password" className={styles['form-label']}>
              Password
            </label>
            <div className="mt-2">
              <input id="password" name="password" type="password" className={styles['form-input']} />
            </div>
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
        <Link href="/auth/register" className={styles['footer-action']}>
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
