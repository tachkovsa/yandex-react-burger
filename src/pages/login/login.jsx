import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import commonStyles from '../common.module.css';
import styles from './login.module.css';

export function LoginPage() {
  const onChangeEmail = (e) => {};
  const onChangePassword = (e) => {};

  return (
    <div className={commonStyles.content}>
      <div className={styles.loginContainer}>
        <form className={classNames('form-fields_width_100', 'mb-20')}>
          <div className={classNames('text', 'text_type_main-medium', 'mb-6', 'text_align_center')}>Вход</div>
          <div className={classNames('mb-6')}>
            <EmailInput onChange={onChangeEmail} value="" name="email" />
          </div>
          <div className={classNames('mb-6')}>
            <PasswordInput onChange={onChangePassword} value="" name="password" className="mb-6" />
          </div>
          <div className="text_align_center">
            <Button type="primary" size="large">
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
