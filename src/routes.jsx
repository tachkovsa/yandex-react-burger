import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { MainPage } from './pages/main';

export function Routes() {
  return (
    <Switch>
      {/* Главная страница, конструктор бургеров */}
      <Route exact path="/" component={MainPage} />
      {/* TODO: Страница авторизации */}
      {/* <Route exact path="/login" component /> */}
      {/* TODO: Страница регистрации */}
      {/* <Route exact path="/register" component /> */}
      {/* TODO: Страница восстановления пароля */}
      {/* <Route exact path="/forgot-password" component /> */}
      {/* TODO: Страница сброса пароля */}
      {/* <Route exact path="/reset-password" component /> */}
      {/* TODO: Страница с настройками профиля пользователя */}
      {/* <Route exact path="/profile" component /> */}
      {/* TODO: Страница ингредиента */}
      {/* <Route exact path="/ingredients/:id" component /> */}
    </Switch>
  );
}
