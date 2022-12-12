import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../models/catalog";

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
        }
    },
})

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;