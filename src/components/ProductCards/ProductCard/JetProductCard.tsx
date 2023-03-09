import React, { useState } from "react";
import { Box, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import {AddBoxOutlined, Star, Favorite, FavoriteBorder} from '@mui/icons-material';
import style from '../JetProductCard.module.css';
import { dFlex, flexBetween } from "../../../themes/commonStyles";
import { IProduct } from '../../../models/product';

interface PropsType {
    card: IProduct,
    addToCart: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, product: IProduct) => void,
    addToFavourite: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>,product: IProduct) => void,
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
                    image={props.card.image}
                />
                <CardContent className={style.productContent}>
                    <Box sx={flexBetween}>
                        <Box>
                            <Typography component="h5" className={style.productCardName}>{props.card.name}</Typography>
                            <Typography component="h5" color={theme => theme.palette.secondary.main}>Описание Описание Описание Описание</Typography>
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
                        {
                            (props.card.isChoose)
                            ?
                            <AddBoxOutlined color="primary" />
                            :
                            <AddBoxOutlined />
                        }
                    </IconButton>

                    <IconButton onClick={(e) => props.addToFavourite(e, props.card)}>
                        {
                            (props.card.isFavourite)
                            ?
                            <Favorite color="error" />
                            :
                            <FavoriteBorder />
                        }
                        
                    </IconButton>
                </CardActions>
            </Card>
        </Box>
    );
}

export default JetProductCard;