
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from 'classnames';
import SimpleBar from 'simplebar-react';

import 'simplebar/dist/simplebar.min.css';
import burgerConstructorStyles from './burger-constructor.module.css';

import { ingredientsPropTypes, basketPropTypes } from '../app/app';

const BurgerConstructor = ({ ingredients, basket }) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [topBun, setTopBun] = useState<any>(undefined);
    const [bottomBun, setBottomBun] = useState<any>(undefined);

    useEffect(() => {
        setTotalPrice(
            basket
                .map(el => ingredients.find(i => i._id === el._id).price)
                .reduce((acc, price) => acc + price)
        );

        let bun;
        const buns = ingredients.filter(i => i.type === 'bun');
        buns.some(element => {
            if (basket.find(b => b._id === element._id)) {
                bun = element;
                return true;
            }
        });
        setTopBun(bun);
        setBottomBun(bun);

    }, [ingredients, basket]);

    return (
        <>
            <div className={classNames(burgerConstructorStyles.basketListContainer)}>
                {topBun && (
                    <div className={classNames(burgerConstructorStyles.bulletEdge, 'mr-4', 'mb-4')}>
                        <ConstructorElement
                            type={'top'}
                            isLocked={true}
                            text={`${topBun.name} (верх)`}
                            price={topBun.price}
                            thumbnail={topBun.image}
                        />
                    </div>
                )}
                <SimpleBar className={classNames(burgerConstructorStyles.basketListBar)}>
                    <div className={classNames(burgerConstructorStyles.basketList, 'mr-4')}>
                        {basket.slice(1, -1).map((elem, index) => {
                            const ingredient = ingredients.find(i => i._id === elem._id);
                            
                            return (
                                <div className={classNames(burgerConstructorStyles.basketListElem, 'ml-4')} 
                                    key={`${index}_${elem._id}`}>
                                    <DragIcon type="primary" />
                                    <div className={classNames(burgerConstructorStyles.bullet, 'ml-2')}>
                                        <ConstructorElement
                                            isLocked={false}
                                            text={`${ingredient.name}`}
                                            price={ingredient.price}
                                            thumbnail={ingredient.image}
                                        />
                                    </div>
                                </div>
                            );
                        }
                        )}
                    </div>
                </SimpleBar>
                {bottomBun && (
                    <div className={classNames(burgerConstructorStyles.bulletEdge, 'mr-4', 'mt-4')}>
                        <ConstructorElement
                            type={'bottom'}
                            isLocked={true}
                            text={`${bottomBun.name} (низ)`}
                            price={bottomBun.price}
                            thumbnail={bottomBun.image}
                        />
                    </div>
                )}
            </div>

            <div className={classNames(burgerConstructorStyles.orderInfo, 'mt-10', 'mr-4')}>
                <div className={classNames(burgerConstructorStyles.orderInfoPrice, 'mr-10')}>
                    <span className={classNames('text', 'text_type_digits-medium', 'mr-2')}>{totalPrice}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </>
    );
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired,
    basket: PropTypes.arrayOf(basketPropTypes.isRequired)
}

export default BurgerConstructor;
