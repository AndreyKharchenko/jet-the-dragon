import React, { useEffect } from 'react'
import { Box, Tooltip, Typography } from '@mui/material';
import style from './JetSupplier.module.css';
import JetProductCards from '../ProductCards/JetProductCards';
import {InfoOutlined, FavoriteBorder} from '@mui/icons-material';
import * as userSelectors from '../../store/selectors/userSelectors';
import * as catalogSelectors from '../../store/selectors/catalogSelectors';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { getProductsByFilter } from '../../store/slices/catalogSlice';



const JetSupplier: React.FC<{}> = () => {
    const dispatch = useAppDispatch();
    const supplierData = useAppSelector(userSelectors.supplierProfile);
    const supplierProducts = useAppSelector(catalogSelectors.products);
    useEffect(() => {
        // Получаем продукты
        const getProducts = async () => {
            await dispatch( getProductsByFilter({supplierId: supplierData?.id}) );
        }
    
        getProducts();
    },[])
    
    return (
        <>
            <Box className={style.supplierDesc}>
                <Box>
                    <Typography component='span' className={style.supplierName}>
                        {supplierData?.name} 
                        <Tooltip title="Информация о фирме" placement="right">
                            <InfoOutlined color='secondary' fontSize='small' sx={{cursor:'pointer'}} />
                        </Tooltip>
                    </Typography>
                </Box>
                <Box>
                    <Tooltip title="В избранное" placement="top">
                        <FavoriteBorder color='secondary' sx={{cursor:'pointer'}} />
                    </Tooltip>
                </Box>
            </Box>
            <Box className={style.title}>Все товары</Box>
            <Box>
                { !!supplierProducts.length && <JetProductCards products={supplierProducts} /> }
                { !supplierProducts.length && 
                    <Box sx={{textAlign:'center'}}>
                        <Box sx={{fontSize:'30px', fontWeight:'600', color: '#ff4569'}}>Нет товаров</Box> 
                    </Box>
                }
            </Box>
        </>
    )
}

export default JetSupplier