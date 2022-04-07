import React, { useEffect } from 'react';

import {
  matchPath, NavLink, Route, Switch, useLocation,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import classNames from 'classnames';

import { wsConnect, wsDisconnect } from '../../store/actions/websockets';
import { Profile } from '../../components/profile/profile';
import { MyOrders } from '../../components/my-orders';

import commonStyles from '../common.module.css';
import styles from './profile.module.css';
import { setType } from '../../store/actions/feed';

export function ProfilePage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const matchedProfile = matchPath(location.pathname, { path: '/profile', exact: true });
  const matchedOrders = matchPath(location.pathname, { path: '/profile/orders', exact: true });

  useEffect(() => {
    dispatch(setType('my'));
    dispatch(wsConnect());

    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch]);

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
        <div className={classNames(styles.menuDesc, 'mt-20')}>
          {matchedProfile && (<span className="text text_type_main-default text_color_inactive">В этом разделе вы можете изменить свои персональные данные</span>)}
          {matchedOrders && (<span className="text text_type_main-default text_color_inactive">В этом разделе вы можете просмотреть свою историю заказов</span>)}
        </div>
      </div>
      <div className={classNames(styles.content, 'ml-15')}>
        <Switch>
          <Route path="/profile" exact component={Profile} />
          <Route path="/profile/orders" exact component={MyOrders} />
        </Switch>
      </div>
    </div>
  );
}
