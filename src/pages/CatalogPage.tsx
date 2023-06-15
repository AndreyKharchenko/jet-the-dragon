import React, { useEffect } from "react";
import JetHeader from "../components/Header/JetHeader";
import JetOptionsTab from "../components/OptionsTab/JetOptionsTab";
import JetProductCards from "../components/ProductCards/JetProductCards";
import JetFooter from "../components/Footer/JetFooter";
import { Box, Container } from '@mui/material';
import * as userSelectors from '../store/selectors/userSelectors';
import * as catalogSelectors from '../store/selectors/catalogSelectors';
import * as cartSelectors from '../store/selectors/cartSelectors';
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { getFavourities } from "../store/slices/userSlice";
import { getProductsByFilter } from "../store/slices/catalogSlice";
import { createCart, getCart, getOrders } from "../store/slices/cartSlice";



const CatalogPage: React.FC<{}> = () => {
    const getCustomerProfile = useAppSelector(userSelectors.customerProfile);
    const getSupplierProfile = useAppSelector(userSelectors.supplierProfile);
    const catalogProducts = useAppSelector(catalogSelectors.products);
    const favouriteProducts = useAppSelector(userSelectors.custFavourities);
    const cartId = useAppSelector(cartSelectors.cartId);
    const dispatch = useAppDispatch();
    
    const getProducts = async (categoryId: string | null) => {
        try {
            if(!!categoryId) {
                await dispatch( getProductsByFilter({categoryId: categoryId}) );
            } else {
                await dispatch( getProductsByFilter({}) );
            }
        } catch (error) {
            console.error('ERR: getProducts()');
        }
        
    }

    const getFavouritiesProduct = async () => {
        try {
            if(!!getCustomerProfile) {
                await dispatch(getFavourities({customerId: getCustomerProfile.id}));
            }
        } catch (error) {
            console.error('ERR: getProducts()');
        }
        
    }

    const initialCart = async () => {
        if(!!getCustomerProfile) {
            try {
                const response = await dispatch(getCart({customerId: getCustomerProfile?.id}));
                if(
                    (typeof response.payload == 'object' && !!response.payload && !Object.keys(response.payload).length)
                    || 
                    (typeof response.payload == 'boolean' && !response.payload)
                ) {
                    console.log('СОЗДАЕМ КОРЗИНУ');
                    await dispatch(createCart({deliveryType:'', paymentType: '', comment:''}));
                }
            } catch (error) {
                console.error('ERR: initialCart()');
            }
            
        }
    }

    const getOrdersByCartId = async () => {
        try {
            console.log('CARTID', cartId)
            if(!!cartId) {
                await dispatch(getOrders({cartId: cartId})); 
            }
            
        } catch (error) {
            console.error('ERR: getOrdersByCartId()');
        }
    }


    const onChangeTab = (tabId: string) => {
        if(tabId == 'all') {
            getProducts(null);
        } else {
            getProducts(tabId);
        }
    }

    useEffect(() => {
        // Получение продуктов 
        getProducts(null);

        // Инициализация корзины
        initialCart();

        // Получение заказов
        getOrdersByCartId();

        // Получаем Избранное
        getFavouritiesProduct();
    },[])
    return(
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
          }}>
            <Box>
                <JetHeader headerType="main" />
                <JetOptionsTab onChangeTab={onChangeTab} />
            </Box>
            
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                height: 100,
                overflowY: 'scroll'
            }}>
                <Container maxWidth="xl" sx={{mb:3}}>
                    <JetProductCards products={catalogProducts} favourities={favouriteProducts} />
                </Container>

            </Box>
            <Box>
                <JetFooter />
            </Box>
            
        </Box>
    );
}

export default CatalogPage;