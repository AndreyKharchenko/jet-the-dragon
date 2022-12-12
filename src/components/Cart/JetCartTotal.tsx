import React from 'react'
import { Box, Card } from '@mui/material';
import style from './JetCart.module.css';
import { flexBetween } from '../../themes/commonStyles';


const JetCartTotal: React.FC<{totalPrice: number}> = ({totalPrice}) => {
    return (
        <Box className={style.cartTotalContainer}>
            <Card className={style.cartTotal} elevation={5}>
                <Box>
                    <h2>Cart Summary</h2>
                </Box>
                <Box sx={flexBetween}>
                    <Box>
                        <h4>Total Price:</h4>
                    </Box>
                    <Box>
                        <h3>{totalPrice}.00</h3>
                    </Box>
                </Box>
            </Card>
        </Box>
    )
}

export default JetCartTotal;