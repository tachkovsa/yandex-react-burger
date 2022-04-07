import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { OrdersList } from '../../components/orders-list';
import { TRootState } from '../../utils/types';

export const MyOrdersPage: FC = () => {
  const { orders } = useSelector((state: TRootState) => state.feed);
  const myOrders = useMemo(() => orders?.filter((order) => !!order._isOwn) || null, [orders]);

  return (
    <OrdersList orders={myOrders} showOrderStatus />
  );
};
