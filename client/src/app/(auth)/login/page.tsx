import styles from './styles.module.css';

import { LoginForm } from '@/forms/LoginForm';

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
