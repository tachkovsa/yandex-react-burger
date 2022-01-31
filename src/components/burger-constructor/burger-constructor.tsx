
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SimpleBar from 'simplebar-react';

import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";

import 'simplebar/dist/simplebar.min.css';
import burgerConstructorStyles from './burger-constructor.module.css';

import { ingredientsPropTypes, basketPropTypes } from '../../utils/types.js';

const BurgerConstructor = ({ ingredients, basket, onOpenModal }) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [burgerBun, setBurgerBun] = useState<any>(undefined);

    const handleOpenModal = () => {
        onOpenModal({
            type: 'order_details',
            orderNumber: '034536',
            header: ''
        });
    };

    useEffect(() => {
        setTotalPrice(
            basket
                .map(el => ingredients.find(i => i._id === el._id).price)
                .reduce((acc, price) => acc + price)
        );

        const bun = ingredients.find(i => i.type === 'bun');
        setBurgerBun(bun);

    }, [ingredients, basket]);

    return (
        <>
            <div className={classNames(burgerConstructorStyles.basketListContainer)}>
                {burgerBun && (
                    <div className={classNames(burgerConstructorStyles.bulletEdge, 'mr-4', 'mb-4')}>
                        <ConstructorElement
                            type={'top'}
                            isLocked={true}
                            text={`${burgerBun.name} (верх)`}
                            price={burgerBun.price}
                            thumbnail={burgerBun.image}
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
                {burgerBun && (
                    <div className={classNames(burgerConstructorStyles.bulletEdge, 'mr-4', 'mt-4')}>
                        <ConstructorElement
                            type={'bottom'}
                            isLocked={true}
                            text={`${burgerBun.name} (низ)`}
                            price={burgerBun.price}
                            thumbnail={burgerBun.image}
                        />
                    </div>
                )}
            </div>

            <div className={classNames(burgerConstructorStyles.orderInfo, 'mt-10', 'mr-4')}>
                <div className={classNames(burgerConstructorStyles.orderInfoPrice, 'mr-10')}>
                    <span className={classNames('text', 'text_type_digits-medium', 'mr-2')}>{totalPrice}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <Button
                    type="primary"
                    size="large"
                    onClick={handleOpenModal}
                >
                    Оформить заказ
                </Button>
            </div>
        </>
    );
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired,
    basket: PropTypes.arrayOf(basketPropTypes.isRequired),
    onOpenModal: PropTypes.func.isRequired
}

export default BurgerConstructor;
