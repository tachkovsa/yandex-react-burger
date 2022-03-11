import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  MainPage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, IngredientsPage, ProfilePage,
} from './pages';
import { ProtectedRoute } from './components/protected-route';

export function Routes() {
  return (
    <Switch>
      {/* Главная страница, конструктор бургеров */}
      <Route exact path="/" component={MainPage} />
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
  );
}
