import React, {
  useCallback, useState, useRef, useEffect,
} from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import SimpleBar from 'simplebar-react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory, useLocation } from 'react-router-dom';

import BurgerIngredient from './burger-ingredient';

import styles from './burger-ingredients.module.css';
import 'simplebar/dist/simplebar.min.css';

function BurgerIngredients() {
  const history = useHistory();
  const location = useLocation();

  const basket = useSelector((state) => state.constructorIngredients.basket);
  const { ingredients } = useSelector((state) => state.ingredients);

  const [tab, setTab] = useState('buns');

  const ingredientsBlockRef = useRef(null);
  const bunsTitleRef = useRef(null);
  const sauceTitleRef = useRef(null);
  const stuffingsTitleRef = useRef(null);

  const onTabClick = (value, ref) => {
    setTab(value);
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  const getInBasketCount = useCallback((ingredient) => {
    const { _id, type } = ingredient;
    const ingredientsCount = basket.filter((b) => b._id === _id).length;

    return type === 'bun' ? ingredientsCount * 2 : ingredientsCount;
  }, [basket]);

  const openDetailedIngredientPage = useCallback((ingredientId) => {
    history.push({
      pathname: `/ingredients/${ingredientId}`,
      state: { ingredientModal: location },
    });
  }, [history, location]);

  const onScrollIngredientsBlock = () => {
    if (bunsTitleRef.current.getBoundingClientRect().top >= 0) {
      setTab('buns');
    } else if (sauceTitleRef.current.getBoundingClientRect().top >= 0) {
      setTab('sauces');
    } else if (stuffingsTitleRef.current.getBoundingClientRect().top >= 0) {
      setTab('stuffings');
    }
  };

  useEffect(() => {
    const ingredientsScrollableDOMElement = ingredientsBlockRef.current;
    ingredientsScrollableDOMElement.addEventListener('scroll', onScrollIngredientsBlock);

    return () => ingredientsScrollableDOMElement.removeEventListener('scroll', onScrollIngredientsBlock);
  }, []);

  return (
    <>
      <p className="text text_type_main-large">
        Собери бургер
      </p>
      <div className={classNames(styles.tabs, 'mt-5')}>
        <Tab value="buns" active={tab === 'buns'} onClick={(e) => onTabClick(e, bunsTitleRef)}>
          Булки
        </Tab>
        <Tab value="sauces" active={tab === 'sauces'} onClick={(e) => onTabClick(e, sauceTitleRef)}>
          Соусы
        </Tab>
        <Tab value="stuffings" active={tab === 'stuffings'} onClick={(e) => onTabClick(e, stuffingsTitleRef)}>
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
            {ingredients.filter((i) => i.type === 'bun').map((ingredient) => (
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
}

export default BurgerIngredients;
