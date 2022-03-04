import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import commonStyles from '../common.module.css';
import styles from './forgot-password.module.css';

export function ForgotPasswordPage() {
  const onChangeEmail = (e) => {};

  return (
    <div className={commonStyles.content}>
      <div className={styles.forgotPasswordContainer}>
        <form className={classNames('form-fields_width_100', 'mb-20')}>
          <div className={classNames('text', 'text_type_main-medium', 'mb-6', 'text_align_center')}>Восстановление пароля</div>
          <div className={classNames('mb-6')}>
            <Input type="email" value="" onChange={onChangeEmail} placeholder="Укажите e-mail" />
          </div>
          <div className="text_align_center">
            <Button type="primary" size="large">
              Восстановить
            </Button>
          </div>
        </form>
        <p className="text text_type_main-default text_color_inactive text_align_center mb-4">
          Вспомнили пароль?
          <Link to="/login" className={classNames('ml-2 text text_type_main-default', commonStyles.link)}>Войти</Link>
        </p>
      </div>
    </div>
  );
}
