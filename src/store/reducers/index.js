import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { constructorIngredientsReducer } from './constructor-ingredients';
import { currentIngredientReducer } from './current-ingredient';
import { orderReducer } from './order';
import { authReducer } from './auth';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorIngredients: constructorIngredientsReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
  auth: authReducer,
});

export default rootReducer;
