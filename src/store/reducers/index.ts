import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorIngredientsReducer } from './constructor-ingredients';
import { detailedIngredientReducer } from './detailed-ingredient';
import { orderReducer } from './order';
import { authReducer } from './auth';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorIngredients: constructorIngredientsReducer,
  detailedIngredient: detailedIngredientReducer,
  order: orderReducer,
  auth: authReducer,
});

export default rootReducer;
