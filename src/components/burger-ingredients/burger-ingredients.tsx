import React, {
  useCallback, useState, useRef, useEffect, RefObject,
} from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import SimpleBar from 'simplebar-react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory, useLocation } from 'react-router-dom';

import { BurgerIngredient } from './burger-ingredient';

import styles from './burger-ingredients.module.css';
import 'simplebar/dist/simplebar.min.css';
import { IIngredient } from '../../utils/interfaces/ingredient.interface';

type TTabs = 'buns' | 'sauces' | 'stuffings';

export const BurgerIngredients = () => {
  const history = useHistory();
  const location = useLocation();

  const basket = useSelector((state: any) => state.constructorIngredients.basket);
  const { ingredients } = useSelector((state: any) => state.ingredients);

  const [tab, setTab] = useState<TTabs>('buns');

  const ingredientsBlockRef = useRef<HTMLElement>(null);
  const bunsTitleRef = useRef<HTMLParagraphElement>(null);
  const sauceTitleRef = useRef<HTMLParagraphElement>(null);
  const stuffingsTitleRef = useRef<HTMLParagraphElement>(null);

  const onTabClick = (value: TTabs, ref: RefObject<HTMLElement>) => {
    setTab(value);

    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getInBasketCount = useCallback((ingredient: IIngredient): number => {
    const { _id, type } = ingredient;
    const ingredientsCount: number = basket.filter((b: IIngredient) => b._id === _id).length;

    return type === 'bun' ? ingredientsCount * 2 : ingredientsCount;
  }, [basket]);

  const openDetailedIngredientPage = useCallback((ingredientId: string) => {
    history.push({
      pathname: `/ingredients/${ingredientId}`,
      state: { ingredientModal: location },
    });
  }, [history, location]);

  const onScrollIngredientsBlock = () => {
    if (bunsTitleRef
        && bunsTitleRef.current
        && bunsTitleRef.current.getBoundingClientRect().top >= 0) {
      setTab('buns');
    } else if (sauceTitleRef
        && sauceTitleRef.current
        && sauceTitleRef.current.getBoundingClientRect().top >= 0) {
      setTab('sauces');
    } else if (stuffingsTitleRef
        && stuffingsTitleRef.current
        && stuffingsTitleRef.current.getBoundingClientRect().top >= 0) {
      setTab('stuffings');
    }
  };

  useEffect(() => {
    const ingredientsScrollableDOMElement = ingredientsBlockRef.current;
    if (ingredientsScrollableDOMElement != null) {
      ingredientsScrollableDOMElement.addEventListener('scroll', onScrollIngredientsBlock);
    }

    return () => (ingredientsScrollableDOMElement !== null
      ? ingredientsScrollableDOMElement.removeEventListener('scroll', onScrollIngredientsBlock)
      : undefined);
  }, []);

  return (
    <>
      <p className="text text_type_main-large">
        Собери бургер
      </p>
      <div className={classNames(styles.tabs, 'mt-5')}>
        <Tab
          value="buns"
          active={tab === 'buns'}
          onClick={(e) => onTabClick(e as TTabs, bunsTitleRef)}
        >
          Булки
        </Tab>
        <Tab
          value="sauces"
          active={tab === 'sauces'}
          onClick={(e) => onTabClick(e as TTabs, sauceTitleRef)}
        >
          Соусы
        </Tab>
        <Tab
          value="stuffings"
          active={tab === 'stuffings'}
          onClick={(e) => onTabClick(e as TTabs, stuffingsTitleRef)}
        >
          Начинки
        </Tab>
      </div>
      <SimpleBar
        className={classNames(styles.burgerConstructor, 'mt-10')}
        scrollableNodeProps={{ ref: ingredientsBlockRef }}
      >
        <div className={styles.ingredientsBlock}>
          <p className="text text_type_main-medium" ref={bunsTitleRef}>
            Булки
          </p>
          <ul className={classNames(styles.ingredientsList, 'mt-6')}>
            {ingredients.filter((i: IIngredient) => i.type === 'bun').map((ingredient: IIngredient) => (
              <li
                className={classNames(styles.ingredientsListItem, 'mb-8')}
                key={ingredient._id}
                onClick={() => openDetailedIngredientPage(ingredient._id)}
              >
                <BurgerIngredient
                  ingredient={ingredient}
                  inBasketCount={getInBasketCount(ingredient)}
                />
              </li>

            ))}
          </ul>
        </div>
        <div className={classNames(styles.ingredientsBlock, 'mt-10')}>
          <p className="text text_type_main-medium" ref={sauceTitleRef}>
            Соусы
          </p>
          <ul className={classNames(styles.ingredientsList, 'mt-6')}>
            {ingredients.filter((i) => i.type === 'sauce').map((ingredient) => (
              <li
                className={classNames(styles.ingredientsListItem, 'mb-8')}
                key={ingredient._id}
                onClick={() => openDetailedIngredientPage(ingredient._id)}
              >
                <BurgerIngredient
                  ingredient={ingredient}
                  inBasketCount={getInBasketCount(ingredient)}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className={classNames(styles.ingredientsBlock, 'mt-10')}>
          <p className="text text_type_main-medium" ref={stuffingsTitleRef}>
            Начинки
          </p>
          <ul className={classNames(styles.ingredientsList, 'mt-6')}>
            {ingredients.filter((i) => i.type === 'main').map((ingredient) => (
              <li
                className={classNames(styles.ingredientsListItem, 'mb-8')}
                key={ingredient._id}
                onClick={() => openDetailedIngredientPage(ingredient._id)}
              >
                <BurgerIngredient
                  ingredient={ingredient}
                  inBasketCount={getInBasketCount(ingredient)}
                />
              </li>
            ))}
          </ul>
        </div>
      </SimpleBar>
    </>
  );
};
