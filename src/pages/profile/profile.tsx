import React from 'react';

import {
  matchPath, NavLink, Route, Switch, useLocation,
} from 'react-router-dom';
import classNames from 'classnames';
import commonStyles from '../common.module.css';
import styles from './profile.module.css';
import { Profile } from '../../components/profile/profile';

export function ProfilePage() {
  const location = useLocation();
  const matchedProfile = matchPath(location.pathname, { path: '/profile', exact: true });

  return (
    <div className={classNames(commonStyles.content, styles.profile)}>
      <div className={styles.navigation}>
        <nav className={styles.menu}>
          <div className={styles.menuItem}>
            <NavLink
              className={styles.menuItemLink}
              activeClassName={styles.menuItemLinkActive}
              type="button"
              exact
              to="/profile"
            >
              <span className="text text_type_main-medium">Профиль</span>
            </NavLink>
          </div>
          <div className={styles.menuItem}>
            <NavLink
              className={styles.menuItemLink}
              activeClassName={styles.menuItemLinkActive}
              type="button"
              exact
              to="/profile/orders"
            >
              <span className="text text_type_main-medium">История заказов</span>
            </NavLink>
          </div>
          <div className={styles.menuItem}>
            <NavLink
              className={styles.menuItemLink}
              activeClassName={styles.menuItemLinkActive}
              type="button"
              exact
              to="/logout"
            >
              <span className="text text_type_main-medium">Выход</span>
            </NavLink>
          </div>
        </nav>
        {matchedProfile && (
        <div className={classNames(styles.menuDesc, 'mt-20')}>
          <Switch>
            <Route path="/profile" exact>
              <span className="text text_type_main-default text_color_inactive">В этом разделе вы можете изменить свои персональные данные</span>
            </Route>
          </Switch>

        </div>
        )}
      </div>
      <div className={classNames(styles.content, 'ml-15')}>
        <Switch>
          <Route path="/profile" exact component={Profile} />
        </Switch>
      </div>
    </div>
  );
}
