import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../models/cart";

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
        }
    },
})

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;