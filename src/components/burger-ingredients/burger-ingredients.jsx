import { useCallback, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SimpleBar from 'simplebar-react';

import { Tab, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import 'simplebar/dist/simplebar.min.css';
import burgerIngredientsStyles from './burger-ingredients.module.css';

import { ingredientsPropTypes, basketPropTypes } from '../../utils/types.js';

import { IngredientsContext } from '../services/ingredientsContext';

const BurgerIngredients = ({ basket, onOpenModal }) => {
    const { ingredients } = useContext(IngredientsContext);

    const [tab, setTab] = useState('buns')
    const getInBasketCount = useCallback((ingredientId) => basket.filter(b => b._id === ingredientId).length, [basket]);

    const handleOpenModal = (ingredient) => {
        onOpenModal({
            type: 'ingredient_details',
            ingredient,
            header: 'Детали ингредиента'
        });
    };

    return (
        <>
            <p className="text text_type_main-large">
                Собери бургер
            </p>
            <div className={classNames(burgerIngredientsStyles.tabs, 'mt-5')}>
                <Tab value="buns" active={tab === 'buns'} onClick={setTab}>
                    Булки
                </Tab>
                <Tab value="sauces" active={tab === 'sauces'} onClick={setTab}>
                    Соусы
                </Tab>
                <Tab value="stuffings" active={tab === 'stuffings'} onClick={setTab}>
                    Начинки
                </Tab>
            </div>
            <SimpleBar className={classNames(burgerIngredientsStyles.burgerConstructor, 'mt-10')}>
                <div className={burgerIngredientsStyles.ingredientsBlock}>
                    <p className="text text_type_main-medium">
                        Булки
                    </p>
                    <ul className={classNames(burgerIngredientsStyles.ingredientsList, 'mt-6')}>
                        {ingredients.filter(i => i.type === 'bun').map(ingredient => (
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
                    <p className="text text_type_main-medium">
                        Соусы
                    </p>
                    <ul className={classNames(burgerIngredientsStyles.ingredientsList, 'mt-6')}>
                        {ingredients.filter(i => i.type === 'sauce').map(ingredient => (
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
                    <p className="text text_type_main-medium">
                        Начинки
                    </p>
                    <ul className={classNames(burgerIngredientsStyles.ingredientsList, 'mt-6')}>
                        {ingredients.filter(i => i.type === 'main').map(ingredient => (
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
    basket: PropTypes.arrayOf(basketPropTypes.isRequired),
    onOpenModal: PropTypes.func.isRequired
}

const BurgerIngredient = ({ ingredient, inBasketCount }) => {

    return (
        <>
            {!!inBasketCount && (<div className={classNames(burgerIngredientsStyles.ingredientItemCount, 'text', 'text_type_digits-default')}>{ inBasketCount }</div>)}
            <picture className={classNames(burgerIngredientsStyles.ingredientItemImg, 'ml-4', 'mr-4')}>
                <source media="(max-width: 640px)" srcSet={ingredient.image_mobile} />
                <source media="(min-width: 1921px)" srcSet={ingredient.image_large} />
                <img src={ingredient.image} alt={ingredient.name} />
            </picture>
            <div className={classNames(burgerIngredientsStyles.ingredientItemPrice, 'mt-1')}>
                <CurrencyIcon type="primary" />
                <span className={classNames(burgerIngredientsStyles.ingredientItemPricePriceValue, 'ml-2', 'text', 'text_type_digits-default')}>{ ingredient.price }</span>
            </div>
            <div className={classNames(burgerIngredientsStyles.ingredientItemName, 'mt-1', 'text', 'text_type_main-default')}>
                { ingredient.name }
            </div>
        </>
    );
}

BurgerIngredient.propTypes = {
    ingredient: ingredientsPropTypes.isRequired,
    inBasketCount: PropTypes.number.isRequired
}

export default BurgerIngredients;
