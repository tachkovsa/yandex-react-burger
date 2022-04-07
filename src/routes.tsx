import React, { useMemo } from 'react';
import {
  Route, Switch, useHistory, useLocation,
} from 'react-router-dom';
import * as H from 'history';
import {
  MainPage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, IngredientsPage, ProfilePage,
} from './pages';
import { IExpandedLocation, ProtectedRoute } from './components/protected-route';
import { Modal } from './components/modal/modal';
import { IngredientDetails } from './components/ingredient-details/ingredient-details';
import { objectHasKeys } from './utils/validation';
import { FeedPage } from './pages/feed';
import { OrderDetailsPage } from './pages/order-details';
import { OrderDetails } from './components/order-details';

export function Routes() {
  const history = useHistory();
  const location = useLocation();

  const definedLocation = useMemo(() => {
    if (typeof location?.state === 'object') {
      if (objectHasKeys(location?.state, ['ingredientModal'])
          || objectHasKeys(location?.state, ['feedModal'])
      ) {
        return location as IExpandedLocation;
      }
    }

    return undefined;
  }, [location]);
  const ingredientModal = definedLocation?.state?.ingredientModal;
  const feedModal = definedLocation?.state?.feedModal;
  const switchLocation = (ingredientModal || feedModal || location) as H.Location;

  return (
    <>
      <Switch location={switchLocation}>
        {/* Главная страница, конструктор бургеров */}
        <Route exact path="/" component={MainPage} />
        {/* Страница ленты заказов */}
        <Route exact path="/feed" component={FeedPage} />
        {/* Страница авторизации */}
        <ProtectedRoute exact path="/login" accessType="unauthorized">
          <LoginPage />
        </ProtectedRoute>
        {/* Страница регистрации */}
        <ProtectedRoute exact path="/register" accessType="unauthorized">
          <RegisterPage />
        </ProtectedRoute>
        {/* Страница восстановления пароля */}
        <ProtectedRoute exact path="/forgot-password" accessType="unauthorized">
          <ForgotPasswordPage />
        </ProtectedRoute>
        {/* Страница сброса пароля */}
        <ProtectedRoute exact path="/reset-password" accessType="unauthorized">
          <ResetPasswordPage />
        </ProtectedRoute>
        {/* Страница с настройками профиля пользователя */}
        <ProtectedRoute exact path={['/profile', '/profile/orders', '/profile/orders']} accessType="authorized">
          <ProfilePage />
        </ProtectedRoute>
        {/* Страница с деталями заказа */}
        <ProtectedRoute exact path="/profile/orders/:orderId" accessType="authorized">
          <OrderDetailsPage />
        </ProtectedRoute>
        <Route exact path="/feed/orderId" component={OrderDetailsPage} />
        {/* Страница ингредиента */}
        <Route exact path="/ingredients/:id" component={IngredientsPage} />
      </Switch>
      {!!ingredientModal && (
        <Route
          path="/ingredients/:id"
          children={(
            <Modal
              onClose={() => history.goBack()}
              header="Детали ингредиента"
            >
              <IngredientDetails />
            </Modal>
          )}
        />
      )}
      {!!feedModal && (
      <>
        <ProtectedRoute
          exact
          path="/profile/orders/:orderId"
          accessType="authorized"
          children={(
            <Modal
              onClose={() => history.goBack()}
              header=""
            >
              <OrderDetails />
            </Modal>
                            )}
        />
        <Route
          path={['/feed/:orderId', '/profile/orders/:orderId']}
          children={(
            <Modal
              onClose={() => history.goBack()}
              header=""
            >
              <OrderDetails />
            </Modal>
              )}
        />
      </>
      )}
    </>

  );
}
