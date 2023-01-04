import React, { useState } from 'react'
import { Box, Button, Container, Drawer, Grid, IconButton, Link, Paper, Stack, Typography } from '@mui/material';
import { flexAround, flexBetween, flexBetweenCenter, fullWidthFlex, justifyCenter } from '../../themes/commonStyles';
import moment from 'moment';
import {KeyboardArrowUpOutlined, Telegram, YouTube, Instagram} from '@mui/icons-material';
import style from './JetFooter.module.css';
const JetFooter: React.FC<{}> = (props) => {
    const marketPlaceLinks = [
        {id:1, text: 'О компании', url: "#"},
        {id:2, text: 'Контакты', url: "#"},
        {id:3, text: 'Реквизиты', url: "#"},
        {id:4, text: 'Партнерская программа', url: "#"},
        {id:5, text: 'Настоящий маркетплейс', url: "#"}
    ]

    const customerLinks = [
        {id:1, text: 'Помощь покупателю', url: "#"},
        {id:2, text: 'Профиль', url: "#"},
        {id:3, text: 'Доставка', url: "#"},
        {id:4, text: 'Оплата', url: "#"},
        {id:5, text: 'Возврат', url: "#"},
        {id:6, text: 'Жалобы', url: "#"},
        {id:7, text: 'Акции', url: "#"},
        {id:8, text: 'Промокоды', url: "#"}
    ]

    const supplierLinks = [
        {id:1, text: 'Помощь поставщикам', url: "#"},
        {id:2, text: 'Сотрудничество', url: "#"},
        {id:3, text: 'Вход в личный кабинет', url: "#"},
    ]

    const legalPolicyLinks = [
        {id:1, text: 'Условия использования сайта', url: "#"},
        {id:2, text: 'Политика обработки персональных данных', url: "#"},
        {id:3, text: 'Условия заказа и доставки', url: "#"},
    ]

    const CONTACT_LINKS = {
        "TELEGRAM": "https://t.me/andrei_kharchenko23",
        "INSTAGRAM": "#",
        "YOUTUBE": "#"
    }
    const [drawer, setDrawer] = useState<boolean>(false);
    const closeDrawer = () => {
        setDrawer(false);
    }
    const openDrawer = () => {
        setDrawer(true);
    }
  return (
    <Box sx={{...fullWidthFlex, borderTop: '1px solid #ddd', backgroundColor: '#eef1f2'}}>
        <Container maxWidth='xl'>
            <Box sx={{...flexAround, width: '100%', mt: 1}} onClick={openDrawer}>
                <Box>Маркетплейс</Box>
                <Box>Покупателю</Box>
                <Box>Магазинам</Box>
                <Box>Правовая информация</Box>
                <Box>Eco Space</Box>
                <IconButton onClick={openDrawer}>
                    <KeyboardArrowUpOutlined />
                </IconButton>
            </Box>
            <Drawer
                anchor='bottom'
                open={drawer}
                onClose={closeDrawer}
            >
                <Box className={style.bottomDrawer}>
                    <Grid 
                        container 
                        justifyContent='space-around'
                        alignItems="flex-start"
                        columnSpacing={3}
                    >
                        <Grid item xs={2}>
                            <Box className={style.columnTitle}>Маркетплейс</Box>
                            <Box className={style.columnLink}>
                                {
                                    marketPlaceLinks.map(link => {
                                        return(
                                            <Link href="#" underline="none">
                                                {link.text}
                                            </Link>
                                        )
                                    })
                                }
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Box className={style.columnTitle}>Покупателю</Box>
                            <Box className={style.columnLink}>
                                {
                                    customerLinks.map(link => {
                                        return(
                                            <Link href="#" underline="none">
                                                {link.text}
                                            </Link>
                                        )
                                    })
                                }
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Box className={style.columnTitle}>Поставщикам</Box>
                            <Box className={style.columnLink}>
                                {
                                    supplierLinks.map(link => {
                                        return(
                                            <Link href="#" underline="none">
                                                {link.text}
                                            </Link>
                                        )
                                    })
                                }
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Box className={style.columnTitle}>Правовая информация</Box>
                            <Box className={style.columnLink}>
                                {
                                    legalPolicyLinks.map(link => {
                                        return(
                                            <Link href="#" underline="none">
                                                {link.text}
                                            </Link>
                                        )
                                    })
                                }
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Box className={style.columnTitle}>Eco Space</Box>
                            <Typography 
                                color='secondary'
                                sx={{fontSize: '12px', mt:1}}
                            >
                                © 2022 - { moment().format('YYYY') } «ECO SPACE»
                            </Typography>
                            <Box className={style.contacts}>
                                <Link href={CONTACT_LINKS['TELEGRAM']}>
                                    <Telegram />
                                </Link>

                                <Link href={CONTACT_LINKS['YOUTUBE']}>
                                    <YouTube />
                                </Link>

                                <Link href={CONTACT_LINKS['INSTAGRAM']}>
                                    <Instagram />
                                </Link>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Drawer>
        </Container>
    </Box>
  )
}

export default JetFooter;
