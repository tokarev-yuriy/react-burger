import React, { ReactElement } from 'react';
import { LoginForm } from '../components/auth/login-form/login-form';

function LoginPage(): ReactElement<any, any> {

  return (
      <LoginForm />
  );
}

export { LoginPage };
