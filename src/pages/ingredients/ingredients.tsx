import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { IngredientDetails } from '../../components/ingredient-details/ingredient-details';
import { IIngredient } from '../../utils/interfaces/ingredient.interface';
import { useSelector } from '../../hooks';

import commonStyles from '../common.module.css';

export function IngredientsPage() {
  const history = useHistory();
  const { id } = useParams<{ id?: string }>();

  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const [ingredient, setIngredient] = useState<IIngredient | null>(null);

  const redirectToMainPage = useCallback((): void => history.replace('/'), [history]);

  useEffect(() => {
    if (!id) {
      redirectToMainPage();
    } else {
      const foundIngredient = ingredients.find((_ingredient: IIngredient) => _ingredient._id === id) as IIngredient | undefined;

      if (foundIngredient) {
        setIngredient(foundIngredient);
      } else {
        redirectToMainPage();
      }
    }
  }, [history, id, ingredients, redirectToMainPage]);

  return (
    <div className={commonStyles.content}>
      {ingredient && <IngredientDetails />}
    </div>
  );
}
