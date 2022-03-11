import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  EmailInput, Input, PasswordInput, EditIcon, Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import classNames from 'classnames';
import styles from './profile.module.css';
import { patchUser } from '../../store/actions/auth';

const PASSWORD_PLACEHOLDER_VALUE = '******';

export function Profile() {
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: user.email, name: user.name, password: PASSWORD_PLACEHOLDER_VALUE });
  const [isDirty, setIsDirty] = useState(false);

  const inputNameRef = useRef(null);
  const inputPasswordRef = useRef(null);

  const [isNameEdit, setIsNameEdit] = useState(false);
  const [isPasswordEdit, setIsPasswordEdit] = useState(false);

  const onToggleNameEdit = () => {
    setIsNameEdit(!isNameEdit);

    setTimeout(() => {
      const currentInputNameRef = inputNameRef.current;
      return currentInputNameRef === null || currentInputNameRef === undefined
        ? undefined
        : currentInputNameRef.focus();
    }, 0);
  };

  const onTogglePasswordEdit = () => {
    const isEdit = !isPasswordEdit;
    if (isEdit && form.password === PASSWORD_PLACEHOLDER_VALUE) {
      setForm({ ...form, password: '' });
    }

    setIsPasswordEdit(isEdit);
    setTimeout(() => {
      const currentInputPasswordRef = inputPasswordRef.current;
      return currentInputPasswordRef === null || currentInputPasswordRef === undefined
        ? undefined
        : currentInputPasswordRef.focus();
    }, 0);
  };

  const onChangeFormValue = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
    setIsDirty(true);
  };

  const onSubmitForm = () => {
    dispatch(patchUser({
      email: form.email,
      name: form.name,
      password: form.password !== PASSWORD_PLACEHOLDER_VALUE ? form.password : null,
    }));
  };

  const onCancelForm = () => {
    setIsDirty(false);
    setForm({ email: user.email, name: user.name, password: PASSWORD_PLACEHOLDER_VALUE });
  };

  useEffect(() => {
  }, [user]);

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()} className={classNames(styles.form, 'form-fields_width_100')}>
        <div className={classNames(styles.formInput)}>
          <Input
            value={form.name}
            icon="EditIcon"
            name="name"
            placeholder="Имя"
            onChange={onChangeFormValue}
            onBlur={() => setIsNameEdit(false)}
            disabled={!isNameEdit}
            ref={inputNameRef}
            onIconClick={onToggleNameEdit}
          />
        </div>
        <div className={classNames('mt-6', styles.formInput)}>
          <EmailInput value={form.email} name="email" onChange={onChangeFormValue} />
        </div>
        <div className={classNames('mt-6', styles.formInput)}>
          <Input
            value={form.password}
            type="password"
            icon="EditIcon"
            name="password"
            placeholder="Пароль"
            onChange={onChangeFormValue}
            onBlur={() => setIsPasswordEdit(false)}
            disabled={!isPasswordEdit}
            ref={inputPasswordRef}
            onIconClick={onTogglePasswordEdit}
            error={form.password === ''}
          />
        </div>
      </form>
      {isDirty && (
      <div className={classNames(styles.actions, 'mt-10')}>
        <Button type="primary" size="small" disabled={!isDirty || loading} onClick={onSubmitForm}>
          Сохранить
        </Button>
        <div className="mt-4" />
        <Button type="secondary" size="small" disabled={loading} onClick={onCancelForm}>
          Отменить изменения
        </Button>
      </div>
      )}
    </>
  );
}
