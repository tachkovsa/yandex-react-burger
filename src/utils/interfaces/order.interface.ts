export type TOrderStatus = 'done' | 'created' | 'cancelled' | 'pending';

export interface IOrder {
  orderNumber: number;
  burgerName: string;
}

export interface IOrderDetails {
  ingredients: string[];
  _id: string;
  name: string;
  status: TOrderStatus;
  number: number;
  createdAt: string;
  updatedAt: string;
  _isOwn?: boolean;
}
