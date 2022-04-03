export interface IOrder {
  orderNumber: number;
  burgerName: string;
}

export interface IOrderDetails {
  ingredients: string[];
  _id: string;
  // TODO: Find out where to get names for the burgers???
  name?: string;
  // TODO: Add additional statuses
  status: 'done';
  number: number;
  createdAt: string;
  updatedAt: string;
}
