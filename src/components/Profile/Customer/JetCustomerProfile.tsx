import React, { useEffect, useState } from 'react'
import { Box, Button, Drawer, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import JetSidebar from '../../Sidebar/JetSidebar'
import { useNavigate } from 'react-router-dom'
import { dFlex, flexCenter } from '../../../themes/commonStyles'
import JetIcon from '../../common/JetIcon'
import JetLogo from '../../common/JetLogo'
import JetCustomerMain from './JetCustomerMain'
import JetCustomerOrdersList from './JetCustomerOrdersList'
import JetCustomerReturns from './JetCustomerReturns'
import JetCustomerPrchd from './JetCustomerPrchd'
import JetCustomerFavourites from './JetCustomerFavourites'
import JetOrder from '../../Orders/JetOrder'
import { ICustomer } from '../../../models/user'
import { useAppSelector } from '../../../hooks/useRedux'


interface IUserProfileProps {
    orderId?: string | number | null,
    page: string | null,
}

const listItems: listItem[] = [
    {id: 1, label: 'Личный кабинет', icon: 'jet-account-outline', page: 'main'},
    {id: 2, label: 'Моя корзина', icon: 'jet-cart', page: 'cart'},
    {id: 3, label: 'Мои заказы', icon: 'jet-order', page: 'orders'},
    {id: 4, label: 'Мои возвраты', icon: 'jet-return-order', page: 'returns'},
    {id: 5, label: 'Купленные товары', icon: 'jet-purchased', page: 'purchased'},
    {id: 6, label: 'Избранное', icon: 'jet-favourite', page: 'favourites'},
    {id: 7, label: 'Стать поставщиком', icon: 'jet-add-group-outline', page: 'supplier'},
    {id: 8, label: 'Выход', icon: 'jet-exit', page: 'exit'},
]

type listItem = {id: number, label: string, icon: string, page: string};





const JetCustomerProfile: React.FC<IUserProfileProps> = ({orderId, page}) => {
    const [selectedItem, setSelectedItem] = useState<listItem>(listItems[0]);
    const getLoader = useAppSelector((state) => state.user.loader);
    const navigate = useNavigate();
    

    const handleListItemClick = (item: listItem) => {
        if(item.page.toUpperCase() == 'CART') {
            navigate(`/cart`);
            return;
        } else if(item.page.toUpperCase() == 'EXIT') {
            navigate(`/login/user`);
            return;
        } else if(item.page.toUpperCase() == 'SUPPLIER') {
            navigate(`/login/${item.page}`); // Переход на форму регистрации поставщика
            return;
        }
        
        setSelectedItem(item);
        navigate(`/my/${item.page}`);
    }

    
    useEffect(() => {
        console.log('PAGE', page);
        console.log('ID', orderId);
    }, [page, orderId])
    
    
    return (
        <>
            <Box sx={dFlex}>
                <JetSidebar>
                    <Box sx={{mt:4, mb: 6}}>
                        <JetLogo />
                    </Box>
                    <Box>
                        {
                            listItems.map((item, index) => (
                                <ListItemButton
                                    selected={selectedItem.id === item.id}
                                    key={item.label}
                                    sx={{ 
                                        color: (index == listItems.length - 1) ? '#eb4034' : '#3853D8', 
                                        mb: 1, 
                                        borderLeft: (selectedItem.id === item.id) ? '5px solid #3853D8' : 'none',
                                    }}
                                    onClick={() => handleListItemClick(item)}
                                >
                                    <ListItemIcon sx={{ color: 'inherit' }}>
                                        <JetIcon icon={item.icon} />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.label}
                                        primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                                    />
                                </ListItemButton>
                            ))
                        }
                    </Box>
                </JetSidebar>

                <Box sx={(!getLoader) ? {mt:2} : {width:'100%',...flexCenter}}>
                    {
                        (page?.toUpperCase() == 'MAIN')
                        ?
                            <JetCustomerMain />
                        :
                        (page?.toUpperCase() == 'ORDERS' && !(!!orderId))
                        ?
                            <JetCustomerOrdersList />
                        :
                        (page?.toUpperCase() == 'ORDERS' && !!orderId)
                        ?
                            <JetOrder id={orderId} />
                        :
                        (page?.toUpperCase() == 'RETURNS')
                        ?
                            <JetCustomerReturns />
                        :
                        (page?.toUpperCase() == 'PURCHASED')
                        ?
                            <JetCustomerPrchd />
                        :
                        (page?.toUpperCase() == 'FAVOURITES')
                        ?
                            <JetCustomerFavourites />
                        :
                        null
                    }
                </Box>
            </Box>
        </>
    )
}

export default JetCustomerProfile