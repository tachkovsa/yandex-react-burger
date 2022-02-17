import React, {
  useCallback, useState, useContext, useRef, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SimpleBar from 'simplebar-react';

import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import 'simplebar/dist/simplebar.min.css';
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import burgerIngredientsStyles from './burger-ingredients.module.css';

import { ingredientsPropTypes } from '../../utils/types';

import { IngredientsContext } from '../../services/ingredientsContext';
import Actions from '../../services/actions';
import BurgerIngredient from './burger-ingredient';

function BurgerIngredients({ basket, onOpenModal }) {
  const { ingredients } = useContext(IngredientsContext);

  const [tab, setTab] = useState('buns');

  const ingredientsBlockRef = useRef(null);
  const bunsTitleRef = useRef(null);
  const sauceTitleRef = useRef(null);
  const stuffingsTitleRef = useRef(null);

  const onTabClick = (value, ref) => {
    setTab(value);
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  const getInBasketCount = useCallback((ingredientId) => basket.filter((b) => b === ingredientId).length, [basket]);

  const handleOpenModal = (ingredient) => {
    onOpenModal({
      type: 'ingredient_details',
      ingredient,
      header: 'Детали ингредиента',
    });
  };

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
      <div className={classNames(burgerIngredientsStyles.tabs, 'mt-5')}>
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
        className={classNames(burgerIngredientsStyles.burgerConstructor, 'mt-10')}
        scrollableNodeProps={{ ref: ingredientsBlockRef }}
      >
        <div className={burgerIngredientsStyles.ingredientsBlock}>
          <p className="text text_type_main-medium" ref={bunsTitleRef}>
            Булки
          </p>
          <ul className={classNames(burgerIngredientsStyles.ingredientsList, 'mt-6')}>
            {ingredients.filter((i) => i.type === 'bun').map((ingredient) => (
              <li
                className={classNames(burgerIngredientsStyles.ingredientsListItem, 'mb-8')}
                key={ingredient._id}
                onClick={() => handleOpenModal(ingredient)}
              >
                <BurgerIngredient
                  ingredient={ingredient}
                  inBasketCount={getInBasketCount(ingredient._id)}
                />
              </li>

            ))}
          </ul>
        </div>
        <div className={classNames(burgerIngredientsStyles.ingredientsBlock, 'mt-10')}>
          <p className="text text_type_main-medium" ref={sauceTitleRef}>
            Соусы
          </p>
          <ul className={classNames(burgerIngredientsStyles.ingredientsList, 'mt-6')}>
            {ingredients.filter((i) => i.type === 'sauce').map((ingredient) => (
              <li
                className={classNames(burgerIngredientsStyles.ingredientsListItem, 'mb-8')}
                key={ingredient._id}
                onClick={() => handleOpenModal(ingredient)}
              >
                <BurgerIngredient
                  ingredient={ingredient}
                  inBasketCount={getInBasketCount(ingredient._id)}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className={classNames(burgerIngredientsStyles.ingredientsBlock, 'mt-10')}>
          <p className="text text_type_main-medium" ref={stuffingsTitleRef}>
            Начинки
          </p>
          <ul className={classNames(burgerIngredientsStyles.ingredientsList, 'mt-6')}>
            {ingredients.filter((i) => i.type === 'main').map((ingredient) => (
              <li
                className={classNames(burgerIngredientsStyles.ingredientsListItem, 'mb-8')}
                key={ingredient._id}
                onClick={() => handleOpenModal(ingredient)}
              >
                <BurgerIngredient
                  ingredient={ingredient}
                  inBasketCount={getInBasketCount(ingredient._id)}
                />
              </li>
            ))}
          </ul>
        </div>
      </SimpleBar>
    </>
  );
}

BurgerIngredients.propTypes = {
  basket: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default BurgerIngredients;
