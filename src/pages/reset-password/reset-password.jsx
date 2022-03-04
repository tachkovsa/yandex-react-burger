import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { Input, Button, ShowIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import commonStyles from '../common.module.css';
import styles from './reset-password.module.css';

export function ResetPasswordPage() {
  const onChangeCode = (e) => {};
  const onChangePassword = (e) => {};

  return (
    <div className={commonStyles.content}>
      <div className={styles.resetPasswordContainer}>
        <form className={classNames('form-fields_width_100', 'mb-20')}>
          <div className={classNames('text', 'text_type_main-medium', 'mb-6', 'text_align_center')}>Восстановление пароля</div>
          <div className={classNames('mb-6')}>
            <Input type="password" placeholder="Введите новый пароль" onChange={onChangePassword} value="" name="password" className="mb-6" icon="ShowIcon" />
          </div>
          <div className={classNames('mb-6')}>
            <Input
              type="text"
              placeholder="Введите код из письма"
              value=""
              onChange={onChangeCode}
            />
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
