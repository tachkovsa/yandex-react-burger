
import { useEffect, useState } from 'react';

import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from 'classnames';
import SimpleBar from 'simplebar-react';

import 'simplebar/dist/simplebar.min.css';
import burgerConstructorStyles from './burger-constructor.module.css';

const BurgerConstructor = ({ ingredients, basket }) => {
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        setTotalPrice(
            basket
                .map(el => ingredients.find(i => i._id === el._id).price)
                .reduce((acc, price) => acc + price)
        );
    }, [ingredients, basket]);

    return (
        <>
            <SimpleBar className={classNames(burgerConstructorStyles.basketListContainer)} >
                <div className={classNames(burgerConstructorStyles.basketList, 'mr-4')}>
                    {basket.map((elem, index) => {
                        const ingredient = ingredients.find(i => i._id === elem._id);

                        const isFirst = index === 0;
                        const isLast = index === (basket.length - 1);
                        
                        return (
                            <div className={classNames(burgerConstructorStyles.basketListElem, 'ml-4')} 
                                key={`${index}_${elem._id}`}>
                                {(!isLast && !isFirst) && <DragIcon type="primary" />}
                                <div className={classNames(burgerConstructorStyles.bullet, (isFirst || isLast ? 'ml-8' : 'ml-2'))}>
                                    <ConstructorElement
                                        type={isFirst ? 'top' : (isLast ? 'bottom' : undefined)}
                                        isLocked={isFirst || isLast}
                                        text={`${ingredient.name}${isLast && ingredient.type === 'bun' ? ' (низ)' : ingredient.type === 'bun' ? ' (верх)' : ''}`}
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

export default BurgerConstructor;
