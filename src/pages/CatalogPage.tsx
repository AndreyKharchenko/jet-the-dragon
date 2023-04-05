import React, { useEffect, useState } from "react";
import JetHeader from "../components/Header/JetHeader";
import JetOptionsTab from "../components/OptionsTab/JetOptionsTab";
import JetProductCards from "../components/ProductCards/JetProductCards";
import JetFooter from "../components/Footer/JetFooter";
import JetIcon from "../components/common/JetIcon";
import { Box, Button, Container, DialogContent, DialogTitle, IconButton } from '@mui/material';
import JetDialog from "../components/common/JetDialog";
import * as userSelectors from '../store/selectors/userSelectors';
import * as authSelectors from '../store/selectors/authSelectors';
import * as catalogSelectors from '../store/selectors/catalogSelectors';
import * as cartSelectors from '../store/selectors/cartSelectors';
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { getCustomerData, getFavourities, getSupplierData } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { getProductsByFilter } from "../store/slices/catalogSlice";
import { createCart, getCart, getOrders } from "../store/slices/cartSlice";


const CatalogPage: React.FC<{}> = () => {
    const [dialog, handleDialog] = useState<boolean>(false);
    const getToken = useAppSelector(authSelectors.accessToken); 
    const getCustomerProfile = useAppSelector(userSelectors.customerProfile);
    const getSupplierProfile = useAppSelector(userSelectors.supplierProfile);
    const catalogProducts = useAppSelector(catalogSelectors.products);
    const favouriteProducts = useAppSelector(userSelectors.custFavourities);
    const cartId = useAppSelector(cartSelectors.cartId);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const onCustomer = async () => {
        onCloseDialog();
        try {
            const res = await dispatch(getCustomerData(getToken?.profile.name));
            if(!res.payload && typeof res.payload == 'boolean') {
                navigate(`/login/customer`); 
            } else if(typeof res.payload == 'object' && !!res.payload && !!Object.keys(res.payload).length) {
                navigate(`/my/main`);
            }
        } catch (error) {
            console.error('ERR: onCustomer')
        }
        
       
    }

    const onSupplier = async () => {
        onCloseDialog();
        try {
            const res = await dispatch(getSupplierData(getToken?.profile.name));
            
            if(!res.payload) {
                const customer = await dispatch(getCustomerData(getToken?.profile.name));
                navigate(`/login/supplier`);
            } else {
                navigate(`/my/main`);
            }
        } catch (error) {
            console.error('ERR: onSupplier')
        }
    }

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
            console.log('1')
            try {
                const response = await dispatch(getCart({customerId: getCustomerProfile?.id}));
                console.log('response', response);
                
                if(typeof response.payload == 'object' && !!response.payload && !Object.keys(response.payload).length) {
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
            await dispatch(getOrders({cartId: cartId})); 
        } catch (error) {
            console.error('ERR: getOrdersByCartId()');
        }
    }

    const onCloseDialog = () => {
        handleDialog(false);
    }

    const onChangeTab = (tabId: string) => {
        if(tabId == 'all') {
            getProducts(null);
        } else {
            getProducts(tabId);
        }
    }

    

    useEffect(() => {
        const token = localStorage.getItem('TOKEN');
        if(!!token && !!getToken && getCustomerProfile == null && getSupplierProfile == null) { 
            handleDialog(true);
        }
    },[getToken])

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

                <JetDialog open={dialog}  onClose={onCloseDialog}>
                    <DialogTitle sx={{display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: '700'}}>
                        <Box sx={{fontSize:'24px'}}>
                            Зайти в личный кабинет
                        </Box>
                    </DialogTitle>

                    <DialogContent>
                        <Box sx={{display:'flex', flexDirection: 'column'}}>
                            <Button 
                                variant='outlined' 
                                onClick={onCustomer}
                                startIcon={<JetIcon icon="jet-account-outline" />}
                                sx={{mb:2}}
                            >
                                Покупателя
                            </Button>

                            <Button 
                                variant='outlined'
                                onClick={onSupplier}
                                startIcon={<JetIcon icon="jet-supplier-outline" />}
                            >
                                Поставщика
                            </Button>
                        </Box>
                    </DialogContent>
                </JetDialog>
            </Box>
            <Box>
                <JetFooter />
            </Box>
            
        </Box>
    );
}

export default CatalogPage;