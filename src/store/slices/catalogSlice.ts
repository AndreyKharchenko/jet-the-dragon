import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { catalogAPI } from "../../api/api";
import { ICategory, IGetCategory, IProductFilter } from "../../models/catalog";
import { IFullProduct } from "../../models/product";

interface ICatalogState {
    products: IFullProduct[],
    productCategories: ICategory[] | null,
    currentProduct: IFullProduct | null | undefined,
    loader: boolean
}

// Получение категорий
export const getCategories = createAsyncThunk<ICategory[], IGetCategory>(
    'catalog/getCategories',
    async function(categoryData) {
        try {
            const response = await catalogAPI.getCategories(categoryData);
            console.log('RES-CATEGORIES-GET', response.data)
            return response.data;
        } catch (error) {
            console.error('ERR:', error)
            return false;
        }
    }
);

// Получение продуктов 
export const getProductsByFilter = createAsyncThunk<IFullProduct[], IProductFilter>(
    'catalog/getProducts',
    async function(params, {rejectWithValue}) {
        try {
            console.log('PARAMS', params);
            let response = await catalogAPI.getProductsByFilter(params);
            console.log('RES-PRODUCTS-GET', response.data);
            return response.data;
        } catch (error) {
            console.error('ERR:', error)
            rejectWithValue(error)
            return false;
        }
    }
);


const initialState: ICatalogState = {
    products: [],
    productCategories: null,
    currentProduct: null,
    loader: false
}

const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {
        setCurrentProduct(state: ICatalogState, action: PayloadAction<{id: string}>): void {
            const currentProduct = state.products.find(it => it.id == action.payload.id);
            state.currentProduct = currentProduct;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state, action) => {
                state.loader = true;
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.productCategories = action.payload;
                state.loader = false;
            })
            .addCase(getProductsByFilter.pending, (state, action) => {
                state.loader = true;
            })
            .addCase(getProductsByFilter.fulfilled, (state, action) => {
                state.products = action.payload;
                state.loader = false;
            })
    }
})

export const catalogActions = catalogSlice.actions;

export default catalogSlice.reducer;