import React, { useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import AppHeader from '../app-header/app-header';
import { Routes } from '../../routes';
import { getIngredients } from '../../store/actions/ingredients';

import commonStyles from '../../pages/common.module.css';

function App() {
  const dispatch = useDispatch();

  const [loadingText, setLoadingText] = useState('');

  const isLoading = useSelector<any>((state) => state.ingredients.loading) as boolean;
  const isLoaded = useSelector<any>((state) => state.ingredients.loaded) as boolean;
  const ingredientsErrorText = useSelector<any>((state) => state.ingredients.error) as string | null;
  const orderErrorText = useSelector<any>((state) => state.order.error) as string | null;

  const hasError = useCallback(
    () => ingredientsErrorText || orderErrorText,
    [ingredientsErrorText, orderErrorText],
  );

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    let tick = 0;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingText(`Верстаем меню${'.'.repeat(tick)}`);
        tick = tick === 3 ? 0 : ++tick;
      }, 450);
    }

    return () => clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      {isLoading && (
        <div className={classNames(commonStyles.loader, 'text', 'text_type_main-default')}>{loadingText}</div>
      )}
      {ingredientsErrorText && (
        <div className={classNames(commonStyles.error, 'text', 'text_type_main-default')}>
          При загрузке ингредиетов произошла ошибка... 😞
          <span className={classNames('mt-2', 'text', 'text_type_main-default', 'text_color_inactive')}>{ingredientsErrorText}</span>
        </div>
      )}
      {orderErrorText && (
        <div className={classNames(commonStyles.error, 'text', 'text_type_main-default')}>
          При обработке заказа произошла ошибка... 😞
          <span className={classNames('mt-2', 'text', 'text_type_main-default', 'text_color_inactive')}>{orderErrorText}</span>
        </div>
      )}
      {isLoaded && !hasError() && <Routes />}
    </>
  );
}

export default App;
