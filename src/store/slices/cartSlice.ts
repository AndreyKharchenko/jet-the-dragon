import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../models/product";

interface ICartState {
    products: IProduct[]
}

const initialState: ICartState = {
    products: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct(state: ICartState, action: PayloadAction<IProduct>) {
            state.products.push(action.payload);
        },
        removeProduct(state: ICartState, action: PayloadAction<IProduct>) {
            const index = state.products.findIndex(prod => prod.id == action.payload.id);
            state.products.splice(index,1);
        },
        incrementQty(state: ICartState, action: PayloadAction<{id: number}>) {
            const index = state.products.findIndex(prod => prod.id == action.payload.id);
            state.products[index].qty++;
        },
        decrementQty(state: ICartState, action: PayloadAction<{id: number}>) {
            const index = state.products.findIndex(prod => prod.id == action.payload.id);
            state.products[index].qty--;
        }
    },
})

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;