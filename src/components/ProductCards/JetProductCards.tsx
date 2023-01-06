import React, { useState } from "react";
import JetProductCard from "./ProductCard/JetProductCard";
import { Box, Grid } from "@mui/material";
import { useAppDispatch } from "../../hooks/useRedux";
import { IProduct } from '../../models/catalog';
import { cartActions } from '../../store/slices/cartSlice';
import { useNavigate } from "react-router-dom";

const JetProductCards: React.FC<{}> = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const addToCart = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>, product: IProduct) => {
        event.preventDefault();
        event.stopPropagation();
        const newCards = value.cards.map(card => {
            if(card.id == product.id) {
                card = {...card, isChoose: !card.isChoose};
            }
            return card;
        })
        setValue({...value, cards: [...newCards]});
        dispatch(cartActions.addProduct(product));
    }

    const addToFavourite = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>, product: IProduct) => {
        event.preventDefault();
        event.stopPropagation();
        const newCards = value.cards.map(card => {
            if(card.id == product.id) {
                card = {...card, isFavourite: !card.isFavourite};
            }
            return card;
        })
        setValue({...value, cards: [...newCards]});
    }

    const onProduct = (id: string | number) => {
        navigate(`/product/${id}`);
    }

    const tmpCards = [
        {id: 1, image: 'https://media.istockphoto.com/photos/fresh-ribeye-steaks-at-the-butcher-shop-picture-id174479270?b=1&k=20&m=174479270&s=170667a&w=0&h=TYgt4dvEDrINqUr_BqgPWvWul7KTcBGz6L1-STZfNJ8=', name: 'Meat', qty: 1, price: 2000, isChoose: false, isFavourite: false},
        {id: 2, image: 'https://images.unsplash.com/photo-1611171711912-e3f6b536f532?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZmlzaCUyMGZvb2R8ZW58MHx8MHx8&w=1000&q=80', name: 'Meat', qty: 1, price: 2000, isChoose: false,  isFavourite: false},
        {id: 3, image: 'https://media.istockphoto.com/photos/various-fresh-dairy-products-picture-id544807136?k=20&m=544807136&s=612x612&w=0&h=iqb23gbUKWgewmunHXd_yzJbYsZDa0fMDz64Ux6OJSc=', name: 'Meat', qty: 1, price: 2000, isChoose: false, isFavourite: false},
        {id: 4, image: 'https://media.istockphoto.com/photos/fresh-ribeye-steaks-at-the-butcher-shop-picture-id174479270?b=1&k=20&m=174479270&s=170667a&w=0&h=TYgt4dvEDrINqUr_BqgPWvWul7KTcBGz6L1-STZfNJ8=', name: 'Meat', qty: 1, price: 2000, isChoose: false, isFavourite: false},
        {id: 5, image: 'https://images.unsplash.com/photo-1611171711912-e3f6b536f532?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZmlzaCUyMGZvb2R8ZW58MHx8MHx8&w=1000&q=80', name: 'Meat', qty: 1, price: 2000, isChoose: false, isFavourite: false},
        {id: 6, image: 'https://media.istockphoto.com/photos/various-fresh-dairy-products-picture-id544807136?k=20&m=544807136&s=612x612&w=0&h=iqb23gbUKWgewmunHXd_yzJbYsZDa0fMDz64Ux6OJSc=', name: 'Meat', qty: 1, price: 2000, isChoose: false, isFavourite: false},
        {id: 7, image: 'https://media.istockphoto.com/photos/fresh-ribeye-steaks-at-the-butcher-shop-picture-id174479270?b=1&k=20&m=174479270&s=170667a&w=0&h=TYgt4dvEDrINqUr_BqgPWvWul7KTcBGz6L1-STZfNJ8=', name: 'Meat', qty: 1, price: 2000, isChoose: false, isFavourite: false},
        {id: 8, image: 'https://images.unsplash.com/photo-1611171711912-e3f6b536f532?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZmlzaCUyMGZvb2R8ZW58MHx8MHx8&w=1000&q=80', name: 'Meat', qty: 1, price: 2000, isChoose: false, isFavourite: false},
        {id: 9, image: 'https://media.istockphoto.com/photos/various-fresh-dairy-products-picture-id544807136?k=20&m=544807136&s=612x612&w=0&h=iqb23gbUKWgewmunHXd_yzJbYsZDa0fMDz64Ux6OJSc=', name: 'Meat', qty: 1, price: 2000, isChoose: false, isFavourite: false},
        {id: 10, image: 'https://media.istockphoto.com/photos/fresh-ribeye-steaks-at-the-butcher-shop-picture-id174479270?b=1&k=20&m=174479270&s=170667a&w=0&h=TYgt4dvEDrINqUr_BqgPWvWul7KTcBGz6L1-STZfNJ8=', name: 'Meat', qty: 1, price: 2000, isChoose: false, isFavourite: false},
        {id: 11, image: 'https://images.unsplash.com/photo-1611171711912-e3f6b536f532?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZmlzaCUyMGZvb2R8ZW58MHx8MHx8&w=1000&q=80', name: 'Meat', qty: 1, price: 2000, isChoose: false, isFavourite: false},
        {id: 12, image: 'https://media.istockphoto.com/photos/various-fresh-dairy-products-picture-id544807136?k=20&m=544807136&s=612x612&w=0&h=iqb23gbUKWgewmunHXd_yzJbYsZDa0fMDz64Ux6OJSc=', name: 'Meat', qty: 1, price: 2000, isChoose: false, isFavourite: false},
    ];

    const [value, setValue] = useState({
        cards: tmpCards
    })

    if(!(!!value.cards)) {
        return null;
    }

    return(
        <Box sx={{mx:2}}>
            <Grid container>
                {
                    value.cards.map(card => {
                        return(
                            <Grid key={card.id} xs={12} sm={2} md={4} lg={3}>
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
    );
}

export default JetProductCards;