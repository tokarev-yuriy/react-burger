import React, { ReactElement, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { PersonalMenu } from '../components/personal/personal-menu/personal-menu';
import { PersonalOrderDetail } from '../components/personal/personal-order-detail/personal-order-detail';
import { PersonalOrders } from '../components/personal/personal-orders/personal-orders';
import { ProfileForm } from '../components/personal/profile-form/profile-form';
import styles from './personal-page.module.css';

function PersonalPage(): ReactElement {
  
  const [ help, setHelp] = useState<ReactElement | string>('');

  return (
      <div className={styles.row}>
        <div className={styles.colLeft}>
          <PersonalMenu />
          <div className={styles.help}>
            { help }
          </div>
        </div>
        <div className={styles.colMain}>
          <Switch>
            
            <Route path="/profile" exact>
              <ProfileForm setHelp={setHelp} />
            </Route>
            
            <Route path="/profile/orders" exact>
              <PersonalOrders />
            </Route>
            
            <Route path="/profile/orders/:id" exact>
              <PersonalOrderDetail />
            </Route>

            <Route>
              <Redirect to={'/profile'} />
            </Route>
          
          </Switch>
        </div>
      </div>
  );
}

export { PersonalPage };
