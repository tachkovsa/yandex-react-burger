import { useState } from 'react';

import classNames from 'classnames';

import { Tab, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import SimpleBar from 'simplebar-react';

import 'simplebar/dist/simplebar.min.css';
import burgerIngredientsStyles from './burger-ingredients.module.css';

const BurgerIngredients = ({ ingredients, basket }) => {
  const [tab, setTab] = useState('buns')

    // Add scrolling and state changing on scroll

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
                        {ingredients.filter(i => i.type === 'bun').map(ingredient => 
                            <li className={classNames(burgerIngredientsStyles.ingredientsListItem, 'mb-8')} key={ingredient._id}>
                                <BurgerIngredient ingredient={ingredient} inBasketCount={1} />
                            </li>  
                        )}
                    </ul>
                </div>
                <div className={classNames(burgerIngredientsStyles.ingredientsBlock, 'mt-10')}>
                    <p className="text text_type_main-medium">
                        Соусы
                    </p>
                    <ul className={classNames(burgerIngredientsStyles.ingredientsList, 'mt-6')}>
                        {ingredients.filter(i => i.type === 'sauce').map(ingredient => 
                            <li className={classNames(burgerIngredientsStyles.ingredientsListItem, 'mb-8')} key={ingredient._id}>
                                <BurgerIngredient ingredient={ingredient} inBasketCount={1} />
                            </li>  
                        )}
                    </ul>
                </div>
                <div className={classNames(burgerIngredientsStyles.ingredientsBlock, 'mt-10')}>
                    <p className="text text_type_main-medium">
                        Начинки
                    </p>
                    <ul className={classNames(burgerIngredientsStyles.ingredientsList, 'mt-6')}>
                        {ingredients.filter(i => i.type === 'main').map(ingredient => 
                            <li className={classNames(burgerIngredientsStyles.ingredientsListItem, 'mb-8')} key={ingredient._id}>
                                <BurgerIngredient ingredient={ingredient} inBasketCount={1} />
                            </li>  
                        )}
                    </ul>
                </div>
            </SimpleBar>
        </>
    );
}

const BurgerIngredient = ({ ingredient, inBasketCount }) => {

    return (
        <>
            {!!inBasketCount && <div className={classNames(burgerIngredientsStyles.ingredientItemCount, 'text', 'text_type_digits-default')}>{ inBasketCount }</div>}
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

            {/* "_id":"60666c42cc7b410027a1a9b1",
         "name":"Краторная булка N-200i",
         "type":"bun",
         "proteins":80,
         "fat":24,
         "carbohydrates":53,
         "calories":420,
         "price":1255,
         "image":"https://code.s3.yandex.net/react/code/bun-02.png",
         "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
         "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png", */}

        </>
    );
}

export default BurgerIngredients;
