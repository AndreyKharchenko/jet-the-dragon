import React, { useEffect, useState } from "react";
import JetProductCard from "./ProductCard/JetProductCard";
import { Badge, Box, Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { IFavourite, IFullProduct } from '../../models/product';
import { cartActions, createOrder, deleteOrder } from '../../store/slices/cartSlice';
import { useNavigate } from "react-router-dom";
import style from './JetProductCard.module.css'
import * as catalogSelectors from '../../store/selectors/catalogSelectors';
import * as cartSelectors from '../../store/selectors/cartSelectors';
import * as userSelectors from '../../store/selectors/userSelectors';
import JetProductSkeleton from "../common/JetProductSkeleton";
import { createFavourite, deleteFavourite } from "../../store/slices/userSlice";

interface IJetProductCard {
    prodTitle?: string;
    products: IFullProduct[],
    favourities?: IFavourite[]
}

const JetProductCards: React.FC<IJetProductCard> = ({prodTitle, products, favourities}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const catalogLoader = useAppSelector(catalogSelectors.loader);
    const cartLoader = useAppSelector(cartSelectors.loader);
    const cartId = useAppSelector(cartSelectors.cartId);
    const cartOrders = useAppSelector(cartSelectors.orders);
    const customerId = useAppSelector(userSelectors.customerId);
    const userLoader = useAppSelector(userSelectors.loader);

    const [addedProducts, setAddedProducts] = useState<string[]>([]); // в корзине
    const [favProducts, setFavProducts] = useState<string[]>([]); // избранное
    const [currentPrdId, setCurrentPrdId] = useState<string>();

    const addToCart = async (event:React.MouseEvent<HTMLButtonElement, MouseEvent>, product: IFullProduct) => {
        event.preventDefault();
        event.stopPropagation();
        setCurrentPrdId(product.id);
        try {
            if(!!cartId) {
                let order = null;
                
                if(addedProducts.indexOf(product.id) != -1) {
                    setAddedProducts([...addedProducts.filter(it => it != product.id)]);
                    
                    let orderId = cartOrders?.filter(it => it.productId == product.id)[0].id; 
                    if(!!orderId) {
                        order = {
                            orderId: orderId, 
                            cartId: cartId, 
                        };

                        await dispatch(deleteOrder(order));
                    }
                        
                } else {
                    setAddedProducts([...addedProducts, product.id]);

                    order = {
                        productId: product.id, 
                        cartId: cartId, 
                        count: 1,
                    };

                    await dispatch(createOrder(order));
                }
            }
        } catch (error) {
            console.error('ERR: addToCart()');
        }
        
    }

    const addToFavourite = async (event:React.MouseEvent<HTMLButtonElement, MouseEvent>, product: IFullProduct) => {
        event.preventDefault();
        event.stopPropagation();
        
        setCurrentPrdId(product.id);
        try {
            if(!!customerId) {
                let favProduct = null;

                if(favProducts.indexOf(product.id) != -1) {
                    setFavProducts([...favProducts.filter(it => it != product.id)]);

                    let favouriteId = favourities?.filter(it => it.productId == product.id)[0].id; 
                    if(!!favouriteId) {
                        favProduct = { favouriteId: favouriteId };
                        await dispatch(deleteFavourite(favProduct));
                    }
                        
                } else {
                    setFavProducts([...favProducts, product.id]);

                    favProduct = {
                        productId: product.id, 
                        customerId: customerId
                    };
                    await dispatch(createFavourite(favProduct));
                }
                
            }
        } catch (error) {
            console.error('ERR: addToFavourite()');
        }
    }

    const onProduct = (id: string | number) => {
        navigate(`/product/${id}`);
    }


    useEffect(() => {
        const ordersProductsIds = cartOrders.map(order => order.productId);
        setAddedProducts([...addedProducts, ...ordersProductsIds]);

        if(!!favourities?.length) {
            const favProductsIds = favourities.map(f => f.productId);
            setFavProducts([...favProducts, ...favProductsIds]);
        }
        
    },[])

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
                    {catalogLoader &&
                        [0,1,2,3,4,5,6,7].map(it => {
                            return(
                                <Grid item key={it} xs={12} sm={2} md={4} lg={3}>
                                    <JetProductSkeleton /> 
                                </Grid>
                            )
                        }) 
                        
                    }
                    {!catalogLoader && products &&
                        products.map(card => {
                            return(
                                <Grid item key={card.id} xs={12} sm={2} md={4} lg={3}>
                                    <JetProductCard 
                                        card={card} 
                                        addToCart={addToCart} 
                                        addToFavourite={addToFavourite}
                                        onProduct={onProduct} 
                                        isAdded={addedProducts.indexOf(card.id) != -1}
                                        isFavourite={favProducts.indexOf(card.id) != -1}
                                        addLoader={ cartLoader  && card.id == currentPrdId }
                                        favLoader={ userLoader  && card.id == currentPrdId }
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