import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import {
  EmailInput, PasswordInput, Input, Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import commonStyles from '../common.module.css';
import styles from './register.module.css';

export function RegisterPage() {
  const onChangeEmail = (e) => {};
  const onChangePassword = (e) => {};
  const onChangeName = (e) => {};

  return (
    <div className={commonStyles.content}>
      <div className={styles.registerContainer}>
        <form className={classNames('form-fields_width_100', 'mb-20')}>
          <div className={classNames('text', 'text_type_main-medium', 'mb-6', 'text_align_center')}>Регистрация</div>
          <div className={classNames('mb-6')}>
            <Input
              type="text"
              placeholder="Имя"
              onChange={onChangeName}
            />
          </div>
          <div className={classNames('mb-6')}>
            <EmailInput onChange={onChangeEmail} value="" name="email" />
          </div>
          <div className={classNames('mb-6')}>
            <PasswordInput onChange={onChangePassword} value="" name="password" className="mb-6" />
          </div>
          <div className="text_align_center">
            <Button type="primary" size="large">
              Зарегистрироваться
            </Button>
          </div>
        </form>
        <p className="text text_type_main-default text_color_inactive text_align_center mb-4">
          Уже зарегистрированы?
          <Link to="/login" className={classNames('ml-2 text text_type_main-default', commonStyles.link)}>Войти</Link>
        </p>
      </div>
    </div>
  );
}
