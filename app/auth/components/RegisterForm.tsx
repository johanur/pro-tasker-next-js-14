import Link from 'next/link';
import styles from '../styles/auth.module.scss';

const RegisterForm = () => {
  return (
    <div className={styles['authentication-container']}>
      <div className={styles.header}>
        <img
          className={styles['header-logo']}
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className={styles['header-title']}>Create your Free Account</h2>
      </div>

      <div className={styles['form']}>
        <form className="space-y-6">
          <div className="form-field">
            <label htmlFor="email" className={styles['form-label']}>
              Email address
            </label>
            <div className="mt-2">
              <input id="email" className={styles['form-input']} />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="password" className={styles['form-label']}>
              Password
            </label>
            <div className="mt-2">
              <input id="password" type="password" className={styles['form-input']} />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="confirm-password" className={styles['form-label']}>
              Confirm Password
            </label>
            <div className="mt-2">
              <input id="confirm-password" type="password" className={styles['form-input']} />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className={styles['form-submit-button']}>
              Register
            </button>
          </div>
        </form>

        <div className={styles.footer}>
          <span className={styles['footer-text']}>Already a member? </span>
          <Link href="/auth/login" className={styles['footer-action']}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
