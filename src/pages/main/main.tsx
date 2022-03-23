import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor';
import { Modal } from '../../components/modal/modal';
import { OrderDetails } from '../../components/order-details/order-details';
import { IngredientDetails } from '../../components/ingredient-details/ingredient-details';

import Actions from '../../store/actions';
import commonStyles from '../common.module.css';
import styles from './main.module.css';

export function MainPage() {
  const dispatch = useDispatch();

  const orderNumber = useSelector((state: any) => state.order.orderNumber);
  const detailedIngredient = useSelector((state: any) => state.currentIngredient.detailedIngredient);

  const ingredients = useSelector((state: any) => state.ingredients.ingredients);
  const isLoading = useSelector((state: any) => state.ingredients.loading);

  const handleCloseOrderModal = () => {
    dispatch({ type: Actions.RESET_CONSTRUCTOR_INGREDIENTS });
    dispatch({ type: Actions.RESET_ORDER_NUMBER });
  };
  const handleCloseDetailedIngredientModal = () => dispatch({ type: Actions.RESET_DETAILED_INGREDIENT });

  return (
    <>
      {!isLoading && ingredients.length > 0 && (
        <DndProvider backend={HTML5Backend}>
          <main className={commonStyles.content}>
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
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
}
