import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import commonStyles from '../common.module.css';
import styles from './reset-password.module.css';
import { resetPassword } from '../../store/actions/auth';

export function ResetPasswordPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const email = useSelector((state: any) => state.auth.resetPasswordCodeEmail);

  const [token, setToken] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    if (!email) {
      history.replace('/forgot-password');
    }
  }, [history, email]);

  const onSubmitResetPasswordForm = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(resetPassword({ email, password, token }));
  };

  return (
    <div className={commonStyles.content}>
      <div className={styles.resetPasswordContainer}>
        <form className={classNames('form-fields_width_100', 'mb-20')} onSubmit={onSubmitResetPasswordForm}>
          <div className={classNames('text', 'text_type_main-medium', 'mb-6', 'text_align_center')}>Восстановление пароля</div>
          <div className={classNames('mb-6')}>
            <Input
              type="password"
              placeholder="Введите новый пароль"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              name="password"
              // className="mb-6"
              icon="ShowIcon"
            />
          </div>
          <div className={classNames('mb-6')}>
            <Input
              type="text"
              placeholder="Введите код из письма"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </div>

          <div className="text_align_center">
            <Button type="primary" size="large" disabled={token === '' || password === ''}>
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
