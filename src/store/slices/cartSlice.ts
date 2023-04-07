import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cartAPI, ordersAPI, paymentAPI } from "../../api/api";
import { ICart, ICartFilter, ICreateCart, ICreatePayment, IUpdateCart } from "../../models/cart";
import { ICreateOrder, IDeleteOrder, IFullOrder, IOrdersFilter, IUpdateOrder } from "../../models/order";

interface ICartState {
    cart: ICart | null,
    orders: IFullOrder[],
    loader: boolean
}

const initialState: ICartState = {
    cart: null,
    orders: [],
    loader: false
}

// Получение корзины
export const getCart = createAsyncThunk<ICart, ICartFilter>(
    'cart/getCart',
    async function(filterParams, {rejectWithValue}) {
        try {
            const response = await cartAPI.getCart(filterParams);
            console.log('RESPONCE-GET-CART', response);
            return response.data;
        } catch (error) {
            console.error('ERR:', error)
            rejectWithValue(error)
            return false;
        }
    }
);

// Создание корзины
export const createCart = createAsyncThunk<{}, ICreateCart>(
    'cart/createCart',
    async function(cart, {rejectWithValue, dispatch}) {
        try {
            const response = await cartAPI.createCart(cart);
            console.log('RESPONCE-CREATE-CART', response);
        } catch (error) {
            console.error('ERR:', error)
            rejectWithValue(error)
            return false;
        }
    }
);

// Обновление корзины
export const updateCart = createAsyncThunk<{}, IUpdateCart>(
    'cart/updateCart',
    async function(cart, {rejectWithValue}) {
        try {
            const response = await cartAPI.updateCart(cart);
            console.log('RESPONCE-CREATE-CART', response);
        } catch (error) {
            console.error('ERR:', error)
            rejectWithValue(error)
            return false;
        }
    }
);

// Получение заказов по корзине
export const getOrders = createAsyncThunk<IFullOrder[], IOrdersFilter>(
    'cart/getOrders',
    async function(filterParams, {rejectWithValue}) {
        try {
            const response = await ordersAPI.getOrders(filterParams);
            console.log('RESPONCE-GET-ORDERS', response);
            return response.data;
        } catch (error) {
            console.error('ERR:', error)
            rejectWithValue(error)
            return false;
        }
    }
);

// Создание заказа
export const createOrder = createAsyncThunk<{}, ICreateOrder>(
    'cart/createOrder',
    async function(order, {rejectWithValue, dispatch}) {
        try {
            const response = await ordersAPI.createOrder(order);
            console.log('RESPONCE-CREATE-ORDER', response);
            await dispatch(getOrders({cartId: order.cartId}));
        } catch (error) {
            console.error('ERR:', error)
            rejectWithValue(error)
            return false;
        }
    }
);

// Обновление заказа
export const updateOrder = createAsyncThunk<{}, IUpdateOrder>(
    'cart/updateOrder',
    async function(order, {rejectWithValue, dispatch}) {
        try {
            const response = await ordersAPI.updateOrder(order);
            console.log('RESPONCE-UPDATE-ORDER', response);
            await dispatch(getOrders({cartId: order.cartId}));
        } catch (error) {
            console.error('ERR:', error)
            rejectWithValue(error)
            return false;
        }
    }
);

// Удаление заказа
export const deleteOrder = createAsyncThunk<{}, IDeleteOrder>(
    'cart/deleteOrder',
    async function(order, {rejectWithValue, dispatch}) {
        try {
            const response = await ordersAPI.deleteOrder(order);
            console.log('RESPONCE-DELETE-ORDER', response);
            await dispatch(getOrders({cartId: order.cartId}));
        } catch (error) {
            console.error('ERR:', error)
            rejectWithValue(error)
            return false;
        }
    }
);

// Подтверждение оплаты
export const createPayment = createAsyncThunk<{}, ICreatePayment>(
    'cart/createPayment',
    async function(payment, {rejectWithValue}) {
        try {
            const response = await paymentAPI.createPayment(payment);
            console.log('RESPONCE-CREATE-PAYMENT', response);
        } catch (error) {
            console.error('ERR:', error)
            rejectWithValue(error)
            return false;
        }
    }
);



const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct(state: ICartState, action: PayloadAction<IFullOrder>) {
            state.orders.push(action.payload);
        },
        removeProduct(state: ICartState, action: PayloadAction<IFullOrder>) {
            const index = state.orders.findIndex(prod => prod.id == action.payload.id);
            state.orders.splice(index,1);
        },
        incrementQty(state: ICartState, action: PayloadAction<{id: string}>) {
            const index = state.orders.findIndex(prod => prod.id == action.payload.id);
            state.orders[index].count++;
        },
        decrementQty(state: ICartState, action: PayloadAction<{id: string}>) {
            const index = state.orders.findIndex(prod => prod.id == action.payload.id);
            state.orders[index].count--;
        }
    },
    extraReducers: (builder) => {
        builder
            // CART
            .addCase(createCart.pending, (state, action) => {
                state.loader = true;
            })
            .addCase(createCart.fulfilled, (state, action) => {
                state.loader = false;
            })
            .addCase(updateCart.pending, (state, action) => {
                state.loader = true;
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                state.loader = false;
            })
            .addCase(getCart.pending, (state, action) => {
                state.loader = true;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.cart = action.payload;
                state.loader = false;
            })
            // ORDERS
            .addCase(createOrder.pending, (state, action) => {
                state.loader = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loader = false;
            })
            .addCase(updateOrder.pending, (state, action) => {
                state.loader = true;
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.loader = false;
            })
            .addCase(getOrders.pending, (state, action) => {
                state.loader = true;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.orders = action.payload;
                state.loader = false;
            })
    }
})

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;