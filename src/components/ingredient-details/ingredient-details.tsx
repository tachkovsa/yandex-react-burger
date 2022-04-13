import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { useHistory, useParams } from 'react-router-dom';
import { IIngredient } from '../../utils/interfaces/ingredient.interface';
import { useSelector } from '../../hooks';

import styles from './ingredient-details.module.css';

export function IngredientDetails() {
  const history = useHistory();

  const { id } = useParams<{ id?: string }>();
  const [ingredient, setIngredient] = useState<IIngredient | null>(null);

  const { ingredients, loaded } = useSelector((state) => state.ingredients);

  useEffect(() => {
    if (loaded) {
      const foundIngredient = ingredients.find((_ingredient: IIngredient) => _ingredient._id === id) as IIngredient | undefined;

      if (!foundIngredient) {
        setIngredient(null);
        history.replace('/');
      } else {
        setIngredient(foundIngredient);
      }
    }
  }, [history, id, ingredients, loaded]);

  if (loaded && ingredient) {
    return (
      <div
        className={styles.detailsContainer}
        data-test="ingredient-details"
      >
        <picture className={classNames(styles.image, 'mb-4')}>
          <source media="(max-width: 640px)" srcSet={ingredient.image_mobile} />
          <img
            src={ingredient.image_large}
            alt={ingredient.name}
            data-test="ingredient-details-image"
          />
        </picture>
        <p
          className={classNames(styles.name, 'mb-8', 'text', 'text_type_main-medium')}
          data-test="ingredient-details-name"
        >
          {ingredient.name}
        </p>
        <div className={classNames(styles.specsList, 'mb-5')}>
          <div className={classNames(styles.specsListItem, 'mr-5')}>
            <div className={classNames(styles.specTitle, 'mb-2', 'text', 'text_type_main-default', 'text_color_inactive')}>Калории, ккал</div>
            <div
              className={classNames(styles.specValue, 'text', 'text_type_digits-default', 'text_color_inactive')}
              data-test="ingredient-details-calories"
            >
              {ingredient.calories}
            </div>
          </div>
          <div className={classNames(styles.specsListItem, 'mr-5')}>
            <div className={classNames(styles.specTitle, 'mb-2', 'text', 'text_type_main-default', 'text_color_inactive')}>Белки, г</div>
            <div
              className={classNames(styles.specValue, 'text', 'text_type_digits-default', 'text_color_inactive')}
              data-test="ingredient-details-proteins"
            >
              {ingredient.proteins}
            </div>
          </div>
          <div className={classNames(styles.specsListItem, 'mr-5')}>
            <div className={classNames(styles.specTitle, 'mb-2', 'text', 'text_type_main-default', 'text_color_inactive')}>Жиры, г</div>
            <div
              className={classNames(styles.specValue, 'text', 'text_type_digits-default', 'text_color_inactive')}
              data-test="ingredient-details-fat"
            >
              {ingredient.fat}
            </div>
          </div>
          <div className={classNames(styles.specsListItem)}>
            <div className={classNames(styles.specTitle, 'mb-2', 'text', 'text_type_main-default', 'text_color_inactive')}>Углеводы, г</div>
            <div
              className={classNames(styles.specValue, 'text', 'text_type_digits-default', 'text_color_inactive')}
              data-test="ingredient-details-carbohydrates"
            >
              {ingredient.carbohydrates}
            </div>
          </div>
        </div>
      </div>
    );
  }
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return (<></>);
}
