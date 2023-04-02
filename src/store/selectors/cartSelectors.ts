import { RootState } from "..";

export const orders = (state: RootState) => state.cart.orders;
export const cartId = (state: RootState) => state.cart.cart?.id;
export const loader = (state: RootState) => state.cart.loader;
