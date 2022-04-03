import React from 'react';
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

export function Routes() {
  const history = useHistory();
  const location = useLocation();

  const definedLocation = typeof location?.state === 'object'
    && objectHasKeys(location?.state, ['ingredientModal']) ? location as unknown as IExpandedLocation : undefined;
  const ingredientModal = definedLocation ? definedLocation.state?.ingredientModal : undefined;
  const switchLocation = (ingredientModal || location) as H.Location;

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
        <ProtectedRoute exact path={['/profile', '/profile/orders', '/profile/orders/:id']} accessType="authorized">
          <ProfilePage />
        </ProtectedRoute>
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
    </>

  );
}
