import React, { useEffect, useState } from "react";
import JetLogo from "../common/JetLogo";
import JetSearch from "./Search/JetSearch";
import JetHeaderUtils from "./HeaderUtils/JetHeaderUtils";
import { flexBetweenCenter, dFlex } from "../../themes/commonStyles";
import { Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as authSelectors from '../../store/selectors/authSelectors';
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { authActions } from "../../store/slices/authSlice";
import { login, mgr } from "../../api/userManager";
import { getCustomerData, getSupplierData, userActions } from "../../store/slices/userSlice";

interface IHeader {
    headerType?: string,
}


const JetHeader: React.FC<IHeader> = ({headerType}) => {
    const token = useAppSelector(authSelectors.accessToken);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const getToken = useAppSelector(authSelectors.accessToken); 
    const [isSupplierBtn, setSupplierBtn] = useState<boolean>(false);
    
    const onCustomer = async () => {
        if(token) { 
            dispatch(userActions.changeRole({role: 'customer'})); 
            navigate(`/my/main`); // Переход на личный кабинет
        } else {
            try {
                const t = await mgr.signinRedirectCallback();
                dispatch(authActions.userSigned({token: t}));

                const res = await dispatch(getCustomerData(t?.profile.name));
                if(!res.payload && typeof res.payload == 'boolean') {
                    navigate(`/login/customer`); 
                } else if(typeof res.payload == 'object' && !!res.payload && !!Object.keys(res.payload).length) {
                    navigate(`/my/main`);
                }
            } catch (error) {
                login();
            }
            
        }
        
    }

    const onSupplier = async () => {
        try {
            const res = await dispatch(getSupplierData(getToken?.profile.name));
            
            if(!res.payload) {
                const customer = await dispatch(getCustomerData(getToken?.profile.name));
                navigate(`/login/supplier`);
            } else {
                dispatch(userActions.changeRole({role: 'supplier'})); 
                navigate(`/my/main`);
            }
        } catch (error) {
            console.error('ERR: onSupplier')
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('TOKEN');
        console.log('token', token)
        if(!!token && !!getToken) { 
            setSupplierBtn(true);
        }
    },[getToken])

    return(
        <Box 
            sx={{
                ...dFlex, 
                minHeight:70, 
                borderBottom: '1px solid #ddd',
                boxShadow: '0px 5px 10px 2px rgba(34, 60, 80, 0.2)',
            }}
        >
            {
                (!!headerType && headerType.toUpperCase() == 'MAIN' || !(!!headerType)) 
                ?
                    <Container maxWidth="xl">
                        <Box sx={{
                            ...flexBetweenCenter,
                            minHeight: 90,
                            px: 4
                        }}>
                            <JetLogo />
                            <JetSearch />
                            <JetHeaderUtils 
                                isSupplierBtn={isSupplierBtn} 
                                onCustomer={onCustomer}
                                onSupplier={onSupplier}
                            />
                        </Box>
                    </Container>
                :
                (!!headerType && headerType.toUpperCase() == 'PROFILE' || !(!!headerType)) 
                ?
                    <Container maxWidth="xl">
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            minHeight: 90,
                        }}>
                            <JetHeaderUtils 
                                isSupplierBtn={isSupplierBtn} 
                                onCustomer={onCustomer}
                                onSupplier={onSupplier}
                            />
                        </Box>
                    </Container>
                :
                    <Container maxWidth="xl">
                        <Box sx={{
                            ...flexBetweenCenter,
                            minHeight: 90,
                            px: 4
                        }}>
                            <JetLogo />
                            <JetHeaderUtils 
                                isSupplierBtn={isSupplierBtn} 
                                onCustomer={onCustomer}
                                onSupplier={onSupplier}
                            />
                        </Box>
                    </Container>

            }
            
        </Box>
    );
}

export default JetHeader;