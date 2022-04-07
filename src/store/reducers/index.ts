import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorIngredientsReducer } from './constructor-ingredients';
import { detailedIngredientReducer } from './detailed-ingredient';
import { orderReducer } from './order';
import { authReducer } from './auth';
import { websocketsReducer } from './websockets';
import { feedReducer } from './feed';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorIngredients: constructorIngredientsReducer,
  detailedIngredient: detailedIngredientReducer,
  order: orderReducer,
  auth: authReducer,
  feed: feedReducer,
  websockets: websocketsReducer,
});
