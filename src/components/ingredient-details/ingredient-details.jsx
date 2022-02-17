import React from 'react';
import classNames from 'classnames';

import ingredientDetailsStyles from './ingredient-details.module.css';

import { ingredientsPropTypes } from '../../utils/types';

function IngredientDetails({ ingredient }) {
  return (
    <div className={ingredientDetailsStyles.modal}>
      <picture className={classNames(ingredientDetailsStyles.modalIngredientImage, 'mb-4')}>
        <source media="(max-width: 640px)" srcSet={ingredient.image_mobile} />
        <img src={ingredient.image_large} alt={ingredient.name} />
      </picture>
      <p className={classNames(ingredientDetailsStyles.modalIngredientName, 'mb-8', 'text', 'text_type_main-medium')}>{ingredient.name}</p>
      <div className={classNames(ingredientDetailsStyles.modalIngredientSpecsList, 'mb-5')}>
        <div className={classNames(ingredientDetailsStyles.modalIngredientSpecsListItem, 'mr-5')}>
          <div className={classNames(ingredientDetailsStyles.modalIngredientSpecTitle, 'mb-2', 'text', 'text_type_main-default', 'text_color_inactive')}>Калории, ккал</div>
          <div className={classNames(ingredientDetailsStyles.modalIngredientSpecValue, 'text', 'text_type_digits-default', 'text_color_inactive')}>{ingredient.calories}</div>
        </div>
        <div className={classNames(ingredientDetailsStyles.modalIngredientSpecsListItem, 'mr-5')}>
          <div className={classNames(ingredientDetailsStyles.modalIngredientSpecTitle, 'mb-2', 'text', 'text_type_main-default', 'text_color_inactive')}>Белки, г</div>
          <div className={classNames(ingredientDetailsStyles.modalIngredientSpecValue, 'text', 'text_type_digits-default', 'text_color_inactive')}>{ingredient.proteins}</div>
        </div>
        <div className={classNames(ingredientDetailsStyles.modalIngredientSpecsListItem, 'mr-5')}>
          <div className={classNames(ingredientDetailsStyles.modalIngredientSpecTitle, 'mb-2', 'text', 'text_type_main-default', 'text_color_inactive')}>Жиры, г</div>
          <div className={classNames(ingredientDetailsStyles.modalIngredientSpecValue, 'text', 'text_type_digits-default', 'text_color_inactive')}>{ingredient.fat}</div>
        </div>
        <div className={classNames(ingredientDetailsStyles.modalIngredientSpecsListItem)}>
          <div className={classNames(ingredientDetailsStyles.modalIngredientSpecTitle, 'mb-2', 'text', 'text_type_main-default', 'text_color_inactive')}>Углеводы, г</div>
          <div className={classNames(ingredientDetailsStyles.modalIngredientSpecValue, 'text', 'text_type_digits-default', 'text_color_inactive')}>{ingredient.carbohydrates}</div>
        </div>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  ingredient: ingredientsPropTypes.isRequired,
};

export default IngredientDetails;
