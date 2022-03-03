import classNames from 'classnames';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../components/app/app.module.css';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import Modal from '../components/modal/modal';
import OrderDetails from '../components/order-details/order-details';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import Actions from '../services/actions';
import { getIngredients } from '../services/actions/ingredients';

export function MainPage() {
  const dispatch = useDispatch();

  const [loadingText, setLoadingText] = useState('');

  const orderNumber = useSelector((state) => state.order.orderNumber);
  const detailedIngredient = useSelector((state) => state.currentIngredient.detailedIngredient);

  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const isLoading = useSelector((state) => state.ingredients.loading);
  const ingredientsErrorText = useSelector((state) => state.ingredients.error);
  const orderErrorText = useSelector((state) => state.order.error);

  const hasError = useCallback(
    () => ingredientsErrorText || orderErrorText,
    [ingredientsErrorText, orderErrorText],
  );

  const handleCloseOrderModal = () => {
    dispatch({ type: Actions.RESET_CONSTRUCTOR_INGREDIENTS });
    dispatch({ type: Actions.RESET_ORDER_NUMBER });
  };
  const handleCloseDetailedIngredientModal = () => dispatch({ type: Actions.RESET_DETAILED_INGREDIENT });

  useEffect(() => {
    let interval; let
      tick = 0;
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
      {isLoading && (
        <div className={classNames(styles.loader, 'text', 'text_type_main-default')}>{loadingText}</div>
      )}
      {ingredientsErrorText && (
        <div className={classNames(styles.error, 'text', 'text_type_main-default')}>
          При загрузке ингредиетов произошла ошибка... 😞
          <span className={classNames('mt-2', 'text', 'text_type_main-default', 'text_color_inactive')}>{ingredientsErrorText}</span>
        </div>
      )}
      {orderErrorText && (
        <div className={classNames(styles.error, 'text', 'text_type_main-default')}>
          При обработке заказа произошла ошибка... 😞
          <span className={classNames('mt-2', 'text', 'text_type_main-default', 'text_color_inactive')}>{orderErrorText}</span>
        </div>
      )}
      {!isLoading && !hasError() && ingredients.length > 0 && (
        <DndProvider backend={HTML5Backend}>
          <main className={styles.content}>
            <section className={classNames(styles.contentBlock, 'mt-10')}>
              <BurgerIngredients />
            </section>
            <section className={classNames(styles.contentBlock, 'mt-25')}>
              <BurgerConstructor />
            </section>
          </main>
        </DndProvider>
      )}
      {orderNumber && (
        <Modal onClose={handleCloseOrderModal}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
      {detailedIngredient && (
        <Modal header="Детали ингредиента" onClose={handleCloseDetailedIngredientModal}>
          <IngredientDetails ingredient={detailedIngredient} />
        </Modal>
      )}
    </>
  );
}
