import React, {
  FC, useCallback, useEffect, useMemo, useState,
} from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import SimpleBar from 'simplebar-react';
import { IOrderDetails } from '../../utils/interfaces/order.interface';

import styles from './order-details.module.css';
import { humanizationDate, humanizationOrderStatus } from '../../utils/helpers';
import { IIngredient } from '../../utils/interfaces/ingredient.interface';
import { TRootState } from '../../utils/types';
import 'simplebar/dist/simplebar.min.css';

export const OrderDetails: FC = () => {
  const { orderId } = useParams<{ orderId?: string }>();
  const ingredients = useSelector((state: TRootState) => state.ingredients.ingredients);
  const [orderIngredients, setOrderIngredients] = useState<(IIngredient & { _count?: number })[]>([]);

  const orderDetails: IOrderDetails = useMemo(() => ({
    ingredients: [
      '60d3b41abdacab0026a733ca',
      '60d3b41abdacab0026a733ce',
      '60d3b41abdacab0026a733d0',
      '60d3b41abdacab0026a733d3',
      '60d3b41abdacab0026a733d4',
      '60d3b41abdacab0026a733d1',
      '60d3b41abdacab0026a733d1',
      '60d3b41abdacab0026a733d3',
    ],
    _id: '034544',
    name: 'Death Star Starship Main бургер',
    status: 'done',
    number: 34535,
    createdAt: '2021-06-23T14:43:22.587Z',
    updatedAt: '2021-06-23T14:43:22.603Z',
  }), []);

  useEffect(() => {
    const { ingredients: orderIngredients } = orderDetails;
    const uniqIngredients = Array.from(new Set(orderIngredients));

    setOrderIngredients(
      uniqIngredients
        .map((orderIngredient) => {
          const ingredient = ingredients.find((ingredient) => ingredient._id === orderIngredient);

          return (ingredient === undefined)
            ? undefined
            : {
              ...ingredient,
              _count: (orderIngredients.filter((ingredientId) => ingredientId === ingredient._id).length),
            };
        })
        .filter((ingredient) => ingredient !== undefined) as IIngredient[],
    );
  }, [ingredients, orderDetails]);

  useEffect(() => {
    console.log(orderId);
  }, [orderId]);

  const orderStatus = useMemo(() => {
    const { status } = orderDetails;
    return humanizationOrderStatus(status);
  }, [orderDetails]);

  const orderPrice = useCallback(
    () => (orderIngredients.length > 0 ? orderIngredients?.map((ingredient) => ingredient.price)
      .reduce((acc, price) => acc + price) : 0),
    [orderIngredients],
  );

  // const orderPrice = useCallback(
  //   () => (orderIngredients.length > 0 ? orderIngredients?.map((ingredient) => ingredient.price)
  //     .reduce((acc, price) => acc + price) : 0),
  //   [orderIngredients],
  // );

  return (
    <div className={classNames(styles.orderDetails)}>
      <p className={classNames('text text_type_digits-default', styles.header)}>
        {`#${orderDetails.number}`}
      </p>
      <p className="text text_type_main-medium mt-10">
        {orderDetails.name}
      </p>
      <p className={classNames(orderStatus.fontClass, 'text text_type_main-default mt-3')}>
        {orderStatus.name}
      </p>
      <p className="text text_type_main-medium mt-15">
        Состав:
      </p>
      <SimpleBar className={classNames(styles.ingredients, 'mt-6')}>
        {orderIngredients.map((ingredient) => (
          <div className={classNames(styles.ingredient)}>
            <div className={classNames(styles.ingredientPreview, 'mr-4')}>
              <div
                className={classNames(styles.ingredientPreviewImage)}
                style={{ backgroundImage: `url(${ingredient.image})` }}
              />
            </div>
            <div className={classNames(styles.ingredientName, 'mr-4')}>
              {ingredient.name}
            </div>
            <div className={classNames(styles.ingredientCountNPrice)}>
              <p className="text text_type_digits-default mr-2">{`${ingredient._count} x ${ingredient.price}`}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        ))}
      </SimpleBar>
      <div className={classNames(styles.footer, 'mt-10')}>
        <div className={classNames(styles.orderStamp, 'text text_type_main-default text_color_inactive')}>{humanizationDate(orderDetails.createdAt)}</div>
        <div className={styles.orderPrice}>
          <p className="text text_type_digits-default mr-2">
            {orderPrice()}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
