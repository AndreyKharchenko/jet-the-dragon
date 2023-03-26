import React, { useEffect, useState } from "react";
import JetHeader from "../components/Header/JetHeader";
import JetOptionsTab from "../components/OptionsTab/JetOptionsTab";
import JetProductCards from "../components/ProductCards/JetProductCards";
import JetFooter from "../components/Footer/JetFooter";
import { Box, Button, Container, DialogContent, DialogTitle, IconButton } from '@mui/material';
import JetDialog from "../components/common/JetDialog";
import * as userSelectors from '../store/selectors/userSelectors';
import * as authSelectors from '../store/selectors/authSelectors';
import * as catalogSelectors from '../store/selectors/catalogSelectors';
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { getCustomerData, getSupplierData } from "../store/slices/userSlice";
import JetIcon from "../components/common/JetIcon";
import { useNavigate } from "react-router-dom";
import { getProductsByFilter } from "../store/slices/catalogSlice";

const CatalogPage: React.FC<{}> = () => {
    const [dialog, handleDialog] = useState<boolean>(false);
    const getToken = useAppSelector(authSelectors.accessToken); 
    const getCustomerProfile = useAppSelector(userSelectors.customerProfile);
    const getSupplierProfile = useAppSelector(userSelectors.supplierProfile);
    const catalogProducts = useAppSelector(catalogSelectors.products);
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
        if(!!categoryId) {
            await dispatch( getProductsByFilter({categoryId: categoryId}) );
        } else {
            await dispatch( getProductsByFilter({}) );
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
        getProducts(null);
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
                    <JetProductCards products={catalogProducts} />
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