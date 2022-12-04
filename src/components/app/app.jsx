import React, { useEffect } from 'react';
import { AppHeader } from './app-header/app-header';
import styles from './app.module.css';
import { ErrorBoundary } from '../misc/error-boundary/error-boundary';
import { Route, Switch, useLocation } from 'react-router-dom';
import { MainPage } from '../../pages/main-page';
import { NotFoundPage } from '../../pages/not-found-page';
import { LoginPage } from '../../pages/login-page';
import { RegisterPage } from '../../pages/register-page';
import { ForgotPage } from '../../pages/forgot-page';
import { ResetPage } from '../../pages/reset-page';
import { PersonalPage } from '../../pages/personal-page';
import { useDispatch } from 'react-redux';
import { getCatalog } from '../../services/actions/catalog';
import { ProtectedRoute } from '../misc/protected-route/protected-route';
import { IngredientPage } from '../../pages/ingredient-page';


function App() {
  
  const dispatch = useDispatch();
  const location = useLocation();

  const fromIngredients = location && location['state'] && location.state['from'] && location.state.from === 'ingredients';

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
            <ProtectedRoute path="/login" exact role={'unauthorized'}>
              <LoginPage />
            </ProtectedRoute>
            <ProtectedRoute path="/register" exact role={'unauthorized'}>
              <RegisterPage />
            </ProtectedRoute>
            <ProtectedRoute path="/forgot-password" exact role={'unauthorized'}>
              <ForgotPage />
            </ProtectedRoute>
            <ProtectedRoute path="/reset-password" exact role={'unauthorized'}>
              <ResetPage />
            </ProtectedRoute>
            <ProtectedRoute path="/profile" role={'authorized'}>
              <PersonalPage />
            </ProtectedRoute>
            <Route path="/ingredients/:id" exact>
              {fromIngredients ? (
                <MainPage />
              ):(
                <IngredientPage />
              )}
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
