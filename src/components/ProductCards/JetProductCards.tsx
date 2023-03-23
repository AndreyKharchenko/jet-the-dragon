import React, { useState } from "react";
import JetProductCard from "./ProductCard/JetProductCard";
import { Badge, Box, Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { IFullProduct } from '../../models/product';
import { cartActions } from '../../store/slices/cartSlice';
import { useNavigate } from "react-router-dom";
import style from './JetProductCard.module.css'
import * as catalogSelectors from '../../store/selectors/catalogSelectors';
import JetProductSkeleton from "../common/JetProductSkeleton";

interface IJetProductCard {
    prodTitle?: string;
    products: IFullProduct[]
}

const JetProductCards: React.FC<IJetProductCard> = ({prodTitle, products}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const getLoader = useAppSelector(catalogSelectors.loader);

    const addToCart = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>, product: IFullProduct) => {
        event.preventDefault();
        event.stopPropagation();
        /*const newCards = value.cards.map(card => {
            if(card.id == product.id) {
                card = {...card, isChoose: !card.isChoose};
            }
            return card;
        })
        setValue({...value, cards: [...newCards]});
        dispatch(cartActions.addProduct(product));*/
    }

    const addToFavourite = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>, product: IFullProduct) => {
        event.preventDefault();
        event.stopPropagation();
        /*const newCards = value.cards.map(card => {
            if(card.id == product.id) {
                card = {...card, isFavourite: !card.isFavourite};
            }
            return card;
        })
        setValue({...value, cards: [...newCards]});*/
    }

    const onProduct = (id: string | number) => {
        navigate(`/product/${id}`);
    }


    

    return(
        <>
            { !!prodTitle &&
            <Box className={style.productTitle}>
                <Badge badgeContent={products.length.toString()} color="primary">
                    {prodTitle}
                </Badge>
            </Box>
            }
            <Box sx={{mx:2}}>
                <Grid container item>
                    {getLoader &&
                        [0,1,2,3,4,5,6,7].map(it => {
                            return(
                                <Grid item key={it} xs={12} sm={2} md={4} lg={3}>
                                    <JetProductSkeleton /> 
                                </Grid>
                            )
                        }) 
                        
                    }
                    {!getLoader && products &&
                        products.map(card => {
                            return(
                                <Grid item key={card.id} xs={12} sm={2} md={4} lg={3}>
                                    <JetProductCard 
                                        card={card} 
                                        addToCart={addToCart} 
                                        addToFavourite={addToFavourite}
                                        onProduct={onProduct} 
                                    />
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Box>
        </>
    );
}

export default JetProductCards;