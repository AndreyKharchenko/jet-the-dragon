import React, { useState } from "react";
import { Box, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import {AddBoxOutlined, Star, Favorite, FavoriteBorder} from '@mui/icons-material';
import style from '../JetProductCard.module.css';
import { dFlex, flexBetween } from "../../../themes/commonStyles";
import { IFullProduct } from '../../../models/product';

interface PropsType {
    card: IFullProduct,
    addToCart: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, product: IFullProduct) => void,
    addToFavourite: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>,product: IFullProduct) => void,
    onProduct: (id: number | string) => void
}

const JetProductCard: React.FC<PropsType> = (props) => {
    const [elevation, setElevation] = useState<number>(3);
    const onMouseOver = () => setElevation(10);
    const onMouseOut = () => setElevation(3);

    const isNew = true;
    return(
        <Box sx={{flexGrow:1,position:'relative', ml: 3, mb: 3, cursor: 'pointer'}}>
            <Card 
                sx={{maxWidth: '100%'}} 
                elevation={elevation} 
                onClick={() => props.onProduct(props.card.id)} 
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
            >
                <CardMedia
                    height={275}
                    className={style.productImage}
                    component="img"
                    image={'https://media.istockphoto.com/photos/fresh-ribeye-steaks-at-the-butcher-shop-picture-id174479270?b=1&k=20&m=174479270&s=170667a&w=0&h=TYgt4dvEDrINqUr_BqgPWvWul7KTcBGz6L1-STZfNJ8='}
                />
                <CardContent className={style.productContent}>
                    <Box sx={flexBetween}>
                        <Box>
                            <Typography component="h5" className={style.productCardName}>{props.card.name}</Typography>
                            <Typography component="h5" color={theme => theme.palette.secondary.main}>{props.card.description}</Typography>
                            <Typography component="h5" className={style.productCardPrice}>{props.card.price}₽</Typography>
                        </Box>
                        <Box>
                            <Box sx={dFlex}>
                            {
                                isNew ? 
                                <React.Fragment>
                                    <Star className={style.productRaiting} />
                                    <Typography component="h5">New</Typography>
                                </React.Fragment>
                                : 
                                <React.Fragment>
                                    <Star className={style.productRaiting} />
                                    <Typography component="h5">5.0</Typography>
                                </React.Fragment>
                            }     
                            </Box>
                        </Box>
                    </Box>
                    
                </CardContent>
                <CardActions className={style.productActions}>
                    <IconButton onClick={(e) => props.addToCart(e, props.card)}>
                        {/*
                            (props.card.isChoose)
                            ?
                            <AddBoxOutlined color="primary" />
                            :
                            <AddBoxOutlined />
                        */}
                        <AddBoxOutlined />
                    </IconButton>

                    <IconButton onClick={(e) => props.addToFavourite(e, props.card)}>
                        {/*
                            (props.card.isFavourite)
                            ?
                            <Favorite color="error" />
                            :
                            <FavoriteBorder />
                        */}
                        <FavoriteBorder />
                    </IconButton>
                </CardActions>
            </Card>
        </Box>
    );
}

export default JetProductCard;