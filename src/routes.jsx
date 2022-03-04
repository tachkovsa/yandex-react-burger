import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  MainPage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, IngredientsPage,
} from './pages';

export function Routes() {
  return (
    <Switch>
      {/* Главная страница, конструктор бургеров */}
      <Route exact path="/" component={MainPage} />
      {/* Страница авторизации */}
      <Route exact path="/login" component={LoginPage} />
      {/* Страница регистрации */}
      <Route exact path="/register" component={RegisterPage} />
      {/* Страница восстановления пароля */}
      <Route exact path="/forgot-password" component={ForgotPasswordPage} />
      {/* Страница сброса пароля */}
      <Route exact path="/reset-password" component={ResetPasswordPage} />
      {/* TODO: Страница с настройками профиля пользователя */}
      {/* <Route exact path="/profile" component /> */}
      {/* Страница ингредиента */}
      <Route exact path="/ingredients/:id" component={IngredientsPage} />
    </Switch>
  );
}
