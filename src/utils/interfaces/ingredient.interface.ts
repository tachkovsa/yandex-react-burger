export interface IIngredient {
  _id: string;
  name: string;
  type: Array<'bun' | 'main' | 'sauce'>;
  proteins?: number;
  fat?: number;
  carbohydrates?: number;
  calories?: number;
  price: number;
  image: string;
  image_mobile?: string;
  image_large?: string;
  __v: number;
}
