import PropTypes from 'prop-types';
import classNames from 'classnames';

import orderDetailsStyles from './order-details.module.css';
import doneImg from '../../images/done.svg'

const OrderDetails = ({ orderNumber }) => {
    return (
        <div className={orderDetailsStyles.modal}>
            <div className={classNames(orderDetailsStyles.orderNumber, 'mb-8', 'text', 'text_type_digits-large')}>
                {orderNumber}
            </div>
            <div className={classNames(orderDetailsStyles.orderSubtext, 'mb-15', 'text', 'text_type_main-medium')}>
                идентификатор заказа
            </div>
            <img className={classNames(orderDetailsStyles.orderDoneImg, 'mb-15')} src={doneImg} alt="done" />
            <div className={classNames(orderDetailsStyles.orderStatus, 'mb-2', 'text', 'text_type_main-default')}>
                Ваш заказ начали готовить
            </div>
            <div className={classNames(orderDetailsStyles.orderSubStatus, 'mb-20', 'text', 'text_type_main-default')}>
                Дождитесь готовности на орбитальной станции
            </div>
        </div>
    );
}

OrderDetails.propTypes = {
    orderNumber: PropTypes.number.isRequired
}

export default OrderDetails;
