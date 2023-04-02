import React from 'react'
import { Box, Button, Card } from '@mui/material';
import style from './JetCart.module.css';
import { flexBetween, flexCenter } from '../../themes/commonStyles';
import { FormProvider, useForm } from 'react-hook-form';
import JetRadioGroup from '../common/form-components/JetRadioGroup';
import JetInput from '../common/form-components/JetInput';
import { PaymentDetailsForm } from '../../models/cart';

interface CartTotalProps {
    totalPrice: number,
    onConfirmPay: (details: PaymentDetailsForm) => void
}



const JetCartTotal: React.FC<CartTotalProps> = ({totalPrice, onConfirmPay}) => {
    const methods = useForm<PaymentDetailsForm>();

    
    return (
        <Box className={style.cartTotalContainer}>
            <Card className={style.cartTotal} elevation={5}>
                <Box>
                    <h2>Общая стоимость</h2>
                </Box>
                <Box sx={flexBetween}>
                    <Box sx={{mt:-1}}>
                        <h4>Итого:</h4>
                    </Box>
                    <Box>
                        <h3>{totalPrice} ₽</h3>
                    </Box>
                </Box>
                <Box>
                    <FormProvider {...methods}>
                        <form>
                            <Box>
                                <JetRadioGroup 
                                    radios={[ {label: 'Самовывоз', value:'pickup'}, {label: 'Доставка курьером', value:'courier'} ]}
                                    name='deliveryType'
                                    radioGroupLabel='Доставка'
                                    isRow={false}
                                />
                            </Box>

                            <Box>
                                <JetRadioGroup 
                                    radios={[ {label: 'Оплата картой онлайн', value:'bankCard'}, {label: 'Оплата наличными', value:'cash'} ]}
                                    name='paymentType'
                                    radioGroupLabel='Способ оплаты'
                                    isRow={true}
                                />
                            </Box>

                            <Box>
                                <JetInput 
                                    name='comment' 
                                    label='Комментарий'
                                    placeholder='Комментарий к заказу'
                                    fullWidth={true}
                                    initialVal=''
                                />
                            </Box>
                        </form>
                    </FormProvider>
                </Box>
                <Box sx={flexCenter}>
                    <Button 
                        variant="contained"
                        fullWidth={true} 
                        className={style.checkoutBtn}
                        onClick={() => onConfirmPay(methods.getValues())}
                    >
                        Перейти к оформлению
                    </Button>
                </Box>
            </Card>
        </Box>
    )
}

export default JetCartTotal;