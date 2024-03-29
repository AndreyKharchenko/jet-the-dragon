import React, { useEffect } from 'react'
import { Badge, Box } from '@mui/material';
import style from './JetCustomer.module.css';
import JetOrderItem from '../../Orders/List/JetOrderItem';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { getOrdersConfirmPay } from '../../../store/slices/userSlice';
import * as cartSelectors from '../../../store/selectors/cartSelectors';
import * as userSelectors from '../../../store/selectors/userSelectors';
const JetCustomerOrdersList: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const customerId = useAppSelector(userSelectors.customerId);
  const custPaymentOrders = useAppSelector(userSelectors.custPaymentOrders);
  const navigate = useNavigate();
   /* const tmpCards = [
      {id: 1, image: 'https://media.istockphoto.com/photos/fresh-ribeye-steaks-at-the-butcher-shop-picture-id174479270?b=1&k=20&m=174479270&s=170667a&w=0&h=TYgt4dvEDrINqUr_BqgPWvWul7KTcBGz6L1-STZfNJ8=', name: 'Meat', qty: 1, price: 2000, isChoose: false, isFavourite: false},
      {id: 2, image: 'https://images.unsplash.com/photo-1611171711912-e3f6b536f532?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZmlzaCUyMGZvb2R8ZW58MHx8MHx8&w=1000&q=80', name: 'Meat', qty: 1, price: 2000, isChoose: false,  isFavourite: false},
      {id: 3, image: 'https://media.istockphoto.com/photos/various-fresh-dairy-products-picture-id544807136?k=20&m=544807136&s=612x612&w=0&h=iqb23gbUKWgewmunHXd_yzJbYsZDa0fMDz64Ux6OJSc=', name: 'Meat', qty: 1, price: 2000, isChoose: false, isFavourite: false},
      {id: 4, image: 'https://media.istockphoto.com/photos/fresh-ribeye-steaks-at-the-butcher-shop-picture-id174479270?b=1&k=20&m=174479270&s=170667a&w=0&h=TYgt4dvEDrINqUr_BqgPWvWul7KTcBGz6L1-STZfNJ8=', name: 'Meat', qty: 1, price: 2000, isChoose: false, isFavourite: false},
      {id: 5, image: 'https://images.unsplash.com/photo-1611171711912-e3f6b536f532?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZmlzaCUyMGZvb2R8ZW58MHx8MHx8&w=1000&q=80', name: 'Meat', qty: 1, price: 2000, isChoose: false, isFavourite: false},
      {id: 6, image: 'https://media.istockphoto.com/photos/various-fresh-dairy-products-picture-id544807136?k=20&m=544807136&s=612x612&w=0&h=iqb23gbUKWgewmunHXd_yzJbYsZDa0fMDz64Ux6OJSc=', name: 'Meat', qty: 1, price: 2000, isChoose: false, isFavourite: false},
      {id: 7, image: 'https://media.istockphoto.com/photos/fresh-ribeye-steaks-at-the-butcher-shop-picture-id174479270?b=1&k=20&m=174479270&s=170667a&w=0&h=TYgt4dvEDrINqUr_BqgPWvWul7KTcBGz6L1-STZfNJ8=', name: 'Meat', qty: 1, price: 2000, isChoose: false, isFavourite: false},
      {id: 8, image: 'https://images.unsplash.com/photo-1611171711912-e3f6b536f532?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZmlzaCUyMGZvb2R8ZW58MHx8MHx8&w=1000&q=80', name: 'Meat', qty: 1, price: 2000, isChoose: false, isFavourite: false},
      {id: 9, image: 'https://media.istockphoto.com/photos/various-fresh-dairy-products-picture-id544807136?k=20&m=544807136&s=612x612&w=0&h=iqb23gbUKWgewmunHXd_yzJbYsZDa0fMDz64Ux6OJSc=', name: 'Meat', qty: 1, price: 2000, isChoose: false, isFavourite: false},
      {id: 10, image: 'https://media.istockphoto.com/photos/fresh-ribeye-steaks-at-the-butcher-shop-picture-id174479270?b=1&k=20&m=174479270&s=170667a&w=0&h=TYgt4dvEDrINqUr_BqgPWvWul7KTcBGz6L1-STZfNJ8=', name: 'Meat', qty: 1, price: 2000, isChoose: false, isFavourite: false},
      {id: 11, image: 'https://images.unsplash.com/photo-1611171711912-e3f6b536f532?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZmlzaCUyMGZvb2R8ZW58MHx8MHx8&w=1000&q=80', name: 'Meat', qty: 1, price: 2000, isChoose: false, isFavourite: false},
      {id: 12, image: 'https://media.istockphoto.com/photos/various-fresh-dairy-products-picture-id544807136?k=20&m=544807136&s=612x612&w=0&h=iqb23gbUKWgewmunHXd_yzJbYsZDa0fMDz64Ux6OJSc=', name: 'Meat', qty: 1, price: 2000, isChoose: false, isFavourite: false},
  ];*/

  const handleOrderItemClick = (id: string) => {
    navigate({
      pathname: '/my/orders',
      search: `?order=${id}`,
    });
  }

  const getPaymentOrders = async () => {
    try {
      await dispatch(getOrdersConfirmPay({customerId: customerId}));
    } catch (error) {
      console.error('ERR: getPaymentOrders()');
    }
  }

  useEffect(() => {
    getPaymentOrders();
  },[])
  return (
    <>

        <Box className={style.title}>
          <Badge badgeContent={custPaymentOrders.length} color="primary">
            Заказы
          </Badge>
        </Box>
        <Box sx={{ml:4}}>
          {
            custPaymentOrders.map((it, index) => {
              return(
                <JetOrderItem 
                  order={it} 
                  onclick={(id: string) => handleOrderItemClick(id)}
                />
              )
            })
          }
        </Box>
    </>
  )
}

export default JetCustomerOrdersList