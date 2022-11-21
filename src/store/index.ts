import { combineReducers, configureStore } from "@reduxjs/toolkit";
import catalogReducer from './slices/catalogSlice';
import cartReducer from './slices/cartSlice';

const rootReducer = combineReducers({
    catalog: catalogReducer,
    cart: cartReducer
})

export function setupStore() {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
