import React from 'react';
import { AppHeader } from '../app-header/app-header';
import styles from './app.module.css';
import { useEffect } from 'react';
import { ErrorBoundary } from '../error-boundary/error-boundary';
import { useSelector, useDispatch } from 'react-redux';
import { getCatalog } from '../../services/actions/catalog';
import { Route, Switch } from 'react-router-dom';
import { MainPage } from '../../pages/main-page';
import { NotFoundPage } from '../../pages/not-found-page';

function App() {

  const { isLoading, isFailed } = useSelector(store => ({
    isLoading: store.catalog.catalogRequest && !store.catalog.catalogRequestFail,
    isFailed: !store.catalog.catalogRequest && store.catalog.catalogRequestFail,
  }));
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
          {isFailed ? (
            <p>Не удалось загрузить данные</p>
          ) : 
            isLoading ? (
              <p>Идет загрузка</p>
            ):(
              <Switch>
                <Route path="/" exact>
                  <MainPage />
                </Route>
                <Route>
                  <NotFoundPage />
                </Route>
              </Switch>
            )}
        </ErrorBoundary>
      </main>
    </div>
  );
}

export { App };
