import React from 'react'
import { Box, Tooltip, Typography } from '@mui/material';
import style from './JetSupplier.module.css';
import JetProductCards from '../ProductCards/JetProductCards';
import {InfoOutlined, FavoriteBorder} from '@mui/icons-material';

const JetSupplier: React.FC<{}> = () => {
  return (
    <>
        <Box className={style.supplierDesc}>
            <Box>
                <Typography component='span' className={style.supplierName}>
                    Роджерс 
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
            <JetProductCards />
        </Box>
    </>
  )
}

export default JetSupplier