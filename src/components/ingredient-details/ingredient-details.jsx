import React from 'react';
import classNames from 'classnames';

import styles from './ingredient-details.module.css';

import { ingredientsPropTypes } from '../../utils/types';

function IngredientDetails({ ingredient }) {
  return (
    <div className={styles.detailsContainer}>
      <picture className={classNames(styles.image, 'mb-4')}>
        <source media="(max-width: 640px)" srcSet={ingredient.image_mobile} />
        <img src={ingredient.image_large} alt={ingredient.name} />
      </picture>
      <p className={classNames(styles.name, 'mb-8', 'text', 'text_type_main-medium')}>{ingredient.name}</p>
      <div className={classNames(styles.specsList, 'mb-5')}>
        <div className={classNames(styles.specsListItem, 'mr-5')}>
          <div className={classNames(styles.specTitle, 'mb-2', 'text', 'text_type_main-default', 'text_color_inactive')}>Калории, ккал</div>
          <div className={classNames(styles.specValue, 'text', 'text_type_digits-default', 'text_color_inactive')}>{ingredient.calories}</div>
        </div>
        <div className={classNames(styles.specsListItem, 'mr-5')}>
          <div className={classNames(styles.specTitle, 'mb-2', 'text', 'text_type_main-default', 'text_color_inactive')}>Белки, г</div>
          <div className={classNames(styles.specValue, 'text', 'text_type_digits-default', 'text_color_inactive')}>{ingredient.proteins}</div>
        </div>
        <div className={classNames(styles.specsListItem, 'mr-5')}>
          <div className={classNames(styles.specTitle, 'mb-2', 'text', 'text_type_main-default', 'text_color_inactive')}>Жиры, г</div>
          <div className={classNames(styles.specValue, 'text', 'text_type_digits-default', 'text_color_inactive')}>{ingredient.fat}</div>
        </div>
        <div className={classNames(styles.specsListItem)}>
          <div className={classNames(styles.specTitle, 'mb-2', 'text', 'text_type_main-default', 'text_color_inactive')}>Углеводы, г</div>
          <div className={classNames(styles.specValue, 'text', 'text_type_digits-default', 'text_color_inactive')}>{ingredient.carbohydrates}</div>
        </div>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  ingredient: ingredientsPropTypes.isRequired,
};

export default IngredientDetails;
