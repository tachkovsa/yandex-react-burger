import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import {
  PasswordInput, Input, Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { validateEmail } from '../../utils/validation';
import { registerUser } from '../../store/actions/auth';

import commonStyles from '../common.module.css';
import styles from './register.module.css';
import { useDispatch, useSelector } from '../../hooks';

export function RegisterPage() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');

  const { loading, error } = useSelector((state) => state.auth);

  const isEmailValid = useCallback(() => !!validateEmail(email), [email]);

  const submitRegistrationForm = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(registerUser({ email, password, name }));
  };

  return (
    <div className={commonStyles.content}>
      <div className={styles.registerContainer}>
        <form className={classNames('form-fields_width_100', 'mb-20')} onSubmit={submitRegistrationForm}>
          <div className={classNames('text', 'text_type_main-medium', 'mb-6', 'text_align_center')}>Регистрация</div>
          <div className={classNames('mb-6')}>
            <Input
              type="text"
              placeholder="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={classNames('mb-6')}>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              error={!!error || (email !== '' && !isEmailValid())}
              errorText={typeof error === 'string' ? error : 'Введён некорректный email'}
              disabled={!!loading}
              success={isEmailValid()}
            />
          </div>
          <div className={classNames('mb-6')}>
            <PasswordInput
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              name="password"
              // className="mb-6"
            />
          </div>
          <div className="text_align_center">
            <Button type="primary" size="large" disabled={!!loading}>
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
