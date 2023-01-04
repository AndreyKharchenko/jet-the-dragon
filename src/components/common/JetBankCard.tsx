import React, { useEffect, useState } from 'react'
import { Box, Button, Icon, Typography } from '@mui/material'
import style from './Common.module.css';
import { FormProvider, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { IBankCard } from '../../models/cart';
import JetInput from './form-components/JetInput';
import JetDatePicker from './form-components/JetDatePicker';
import MIR from '../../assets/mir-logo.svg';
import MASTERCARD from '../../assets/mastercard-logo.svg';
import VISA from '../../assets/visa-logo.svg';
import UNIONPAY from '../../assets/union-pay-logo.svg';
import AMERICANEX from '../../assets/american-express-logo.svg';
import { flexAround, defaultButton, flexEnd } from '../../themes/commonStyles';

type PaySystType = {
    name: string,
    value: any
}
const PAY_SYST: PaySystType[] = [
    {name: "MIR", value: MIR},
    {name: "MASTERCARD", value: MASTERCARD},
    {name: "VISA", value: VISA},
    {name: "UNIONPAY", value: UNIONPAY},
    {name: "AMERICANEX", value: AMERICANEX},
]

const JetBankCard = () => {
    const methods = useForm<IBankCard>();
    const [syst, setSyst] = useState<null | PaySystType>(null);
    const onSubmit: SubmitHandler<IBankCard> = (data: IBankCard) => {
        console.log('data:', data);
    }

    const getPaySyst = (val: string) => {
        const index = PAY_SYST.findIndex(s => s.name == val.toLocaleUpperCase());
        return PAY_SYST[index];
    }

    const definePaySystem = (cardnumber: string) => {
        if(cardnumber.substring(0,4) == '2200') {
            setSyst(getPaySyst('MIR'));
        } else if(cardnumber.substring(0,1) == '4') {
            setSyst(getPaySyst('VISA'));
        } else if(cardnumber.substring(0,2) == '34' || cardnumber.substring(0,2) == '37') {
            setSyst(getPaySyst('AMERICANEX'));
        } else if(cardnumber.substring(0,2) == '62') {
            setSyst(getPaySyst('UNIONPAY'));
        } else if(
            (Number(cardnumber.substring(0,4)) >=2221 && Number(cardnumber.substring(0,4)) <= 2720)
            ||
            (Number(cardnumber.substring(0,2)) >= 51 && Number(cardnumber.substring(0,2)) <= 57)
            ) {
                setSyst(getPaySyst('MASTERCARD'));
        } else {
            setSyst(null);
        }
    }

    useEffect(() => {
        const cardnumber = methods.watch('cardnumber').trim();
        definePaySystem(cardnumber);
        
    },[methods.watch('cardnumber')])

    
    
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Box className={style.cardWrapper}>
                <Box className={style.cardBack}>
                    <Box className={style.cardBackLine}></Box>
                    <Box className={style.cvv}>
                        <JetInput 
                            name='cvv' 
                            label='CVV/CVC' 
                            placeholder='000' 
                            type={'password'} 
                            inputProps={{maxLength:3}}  
                            variant='outlined'  
                            helperText='три цифры с обратной стороны карты'
                        />
                    </Box>
                    
                </Box>
                <Box className={style.cardFront}>
                    
                    {
                        (!!syst)
                            ?
                        <Box sx={{...flexEnd, mt:1, mr: 1}}>
                            <Box>
                                <img src={syst.value} className={style.paySystLarge} />
                            </Box>
                        </Box>
                            :
                        <Box sx={{...flexAround, mt: 1}}>
                            {
                                PAY_SYST.map(it => {
                                    return(
                                        <Box>
                                            <img src={it.value} className={style.paySyst} />
                                        </Box>
                                    )
                                })
                            }
                        </Box>
                        
                    }
                    

                    <Box className={style.cardNumber}>
                        <JetInput 
                            mask='bankCard'
                            name='cardnumber' 
                            label='Номер карты' 
                            placeholder='Номер карты' 
                            variant='outlined' 
                            inputProps={{maxLength:19}}
                        />
                    </Box>

                    <Box className={style.cardDt}>
                        <JetDatePicker 
                            name='cardDt' 
                            label='Действует до: ММ/ГГ' 
                            format='MM/YYYY'
                            views={['month', 'year']}
                        />
                    </Box>
                </Box>
            </Box>
            <Box>
                <Button autoFocus type='submit' sx={{...defaultButton, fontSize:'16px'}} fullWidth variant='contained'>
                    Оплатить
                </Button>
            </Box>
            </form>
        </FormProvider>
        
            
            
            

        
    )
}

export default JetBankCard