import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import classNames from 'classnames';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { requestPasswordResetCode } from '../../store/actions/auth';
import { validateEmail } from '../../utils/validation';
import { useDispatch, useSelector } from '../../hooks';

import commonStyles from '../common.module.css';
import styles from './forgot-password.module.css';

// TODO: Add error handler
export function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const { loading, resetPasswordCodeRequested } = useSelector((state) => state.auth);
  const isEmailValid = useCallback(() => !!validateEmail(email), [email]);

  const restorePassword = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(requestPasswordResetCode(email));
  };

  useEffect(() => {
    if (resetPasswordCodeRequested) {
      history.push({
        pathname: '/reset-password',
        state: {
          email,
          emailTimestamp: new Date().getTime(),
        },
      });
    }
  }, [history, resetPasswordCodeRequested, email]);

  return (
    <div className={commonStyles.content}>
      <div className={styles.forgotPasswordContainer}>
        <form className={classNames('form-fields_width_100', 'mb-20')} onSubmit={restorePassword}>
          <div className={classNames('text', 'text_type_main-medium', 'mb-6', 'text_align_center')}>Восстановление пароля</div>
          <div className={classNames('mb-6')}>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Укажите e-mail"
              error={email !== '' && !isEmailValid()}
              errorText="Введён некорректный email"
              disabled={!!loading}
              success={isEmailValid()}
            />
          </div>
          <div className="text_align_center">
            <Button
              type="primary"
              size="large"
              disabled={!!loading || !isEmailValid()}
            >
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
