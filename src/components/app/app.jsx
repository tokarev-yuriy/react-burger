import React, { useEffect } from 'react';
import { AppHeader } from './app-header/app-header';
import styles from './app.module.css';
import { ErrorBoundary } from '../misc/error-boundary/error-boundary';
import { Route, Switch } from 'react-router-dom';
import { MainPage } from '../../pages/main-page';
import { NotFoundPage } from '../../pages/not-found-page';
import { LoginPage } from '../../pages/login-page';
import { RegisterPage } from '../../pages/register-page';
import { ForgotPage } from '../../pages/forgot-page';
import { ResetPage } from '../../pages/reset-page';
import { PersonalPage } from '../../pages/personal-page';
import { useDispatch } from 'react-redux';
import { getCatalog } from '../../services/actions/catalog';


function App() {
  
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getCatalog());
    // eslint-disable-next-line 
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <ErrorBoundary>
          <Switch>
            <Route path="/" exact>
              <MainPage />
            </Route>
            <Route path="/login" exact>
              <LoginPage />
            </Route>
            <Route path="/register" exact>
              <RegisterPage />
            </Route>
            <Route path="/forgot-password" exact>
              <ForgotPage />
            </Route>
            <Route path="/reset-password" exact>
              <ResetPage />
            </Route>
            <Route path="/profile">
              <PersonalPage />
            </Route>
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </ErrorBoundary>
      </main>
    </div>
  );
}

export { App };
