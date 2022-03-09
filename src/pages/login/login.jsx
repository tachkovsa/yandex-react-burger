import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import {
  PasswordInput, Button, Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { validateEmail } from '../../utils/validation';

import commonStyles from '../common.module.css';
import styles from './login.module.css';
import { loginUser } from '../../store/actions/auth';

export function LoginPage() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loading, error } = useSelector((state) => state.auth);

  const isEmailValid = useCallback(() => !!validateEmail(email), [email]);
  const isFormValid = useCallback(() => isEmailValid() && password !== '', [isEmailValid, password]);

  const login = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className={commonStyles.content}>
      <div className={styles.loginContainer}>
        <form className={classNames('form-fields_width_100', 'mb-20')} onSubmit={login}>
          <div className={classNames('text', 'text_type_main-medium', 'mb-6', 'text_align_center')}>Вход</div>
          <div className={classNames('mb-6')}>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Укажите e-mail"
              error={email !== '' && !isEmailValid()}
              errorText="Введён некорректный email"
              disabled={loading}
              success={isEmailValid()}
            />
          </div>
          <div className={classNames('mb-6')}>
            <PasswordInput
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              value={password}
              name="password"
              className="mb-6"
            />
          </div>
          <div className="text_align_center">
            {error && <p className="text text_type_main-default text_color_inactive text_color_error mb-6">{error}</p>}
            <Button type="primary" size="large" disabled={!isFormValid() || loading}>
              Войти
            </Button>
          </div>
        </form>
        <p className="text text_type_main-default text_color_inactive text_align_center mb-4">
          Вы новый пользователь?
          <Link to="/register" className={classNames('ml-2 text text_type_main-default', commonStyles.link)}>Зарегистрироваться</Link>
        </p>
        <p className="text text_type_main-default text_color_inactive text_align_center">
          Забыли пароль?
          <Link to="/forgot-password" className={classNames('ml-2 text text_type_main-default', commonStyles.link)}>Восстановить пароль</Link>
        </p>
      </div>
    </div>
  );
}
