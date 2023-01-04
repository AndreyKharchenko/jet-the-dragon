import React from 'react'
import { Box, Button, Card } from '@mui/material';
import style from './JetCart.module.css';
import { flexBetween, flexCenter } from '../../themes/commonStyles';

interface CartTotalProps {
    totalPrice: number,
    onCheckout: () => void
}

const JetCartTotal: React.FC<CartTotalProps> = ({totalPrice, onCheckout}) => {
    return (
        <Box className={style.cartTotalContainer}>
            <Card className={style.cartTotal} elevation={5}>
                <Box>
                    <h2>Общая сумма</h2>
                </Box>
                <Box sx={flexBetween}>
                    <Box>
                        <h4>Итого:</h4>
                    </Box>
                    <Box>
                        <h3>{totalPrice}.00₽</h3>
                    </Box>
                </Box>
                <Box sx={flexCenter}>
                <Button 
                    variant="contained"
                    fullWidth={true} 
                    className={style.checkoutBtn}
                    onClick={onCheckout}
                >
                    Перейти к оформлению
                </Button>
                </Box>
            </Card>
        </Box>
    )
}

export default JetCartTotal;