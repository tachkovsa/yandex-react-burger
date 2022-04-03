import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { IngredientDetails } from '../../components/ingredient-details/ingredient-details';
import commonStyles from '../common.module.css';
import { IIngredient } from '../../utils/interfaces/ingredient.interface';
import { TRootState } from '../../utils/types';

export function IngredientsPage() {
  const history = useHistory();
  const { id } = useParams<{ id?: string }>();

  const ingredients = useSelector((state: TRootState) => state.ingredients.ingredients);
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
