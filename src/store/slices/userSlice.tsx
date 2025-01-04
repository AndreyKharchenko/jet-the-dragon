import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "oidc-client";
import { analyticAPI, favouritiesAPI, imagesAPI, ordersAPI, techMapAPI, userAPI } from "../../api/api";
import { ICustomerLoginForm, ISupplierLoginForm } from "../../models/login";
import { ICreateFavourite, ICreateProduct, ICreateProductRequest, IDeleteFavourite, IDeleteProduct, IFavourite, IFavouriteFilter, IFullProduct, IUpdateProduct, IUpdateProductRequest } from "../../models/product";
import { ICustomer, ISupplier, IUpdateCustomer, IUpdateSupplier } from "../../models/user";
import { ICustomerPaymentOrder, IFullOrder, IOrdersFilter, ISupplierActiveOrder } from "../../models/order";
import { IAnalytic, IAnalyticFilter } from "../../models/analytic";
import { ICreateOrUpdateTechMap, IDeleteTechMap, ITechMap, ITechMapFilter } from "../../models/techmap";

interface IUserState {
    customerProfile: null | ICustomer,
    supplierProfile: null | ISupplier,
    role: 'customer' | 'supplier' | null,
    supplierProducts: IFullProduct[] | [],
    supplierAnalytic: IAnalytic[] | [],
    supplierTechMaps: ITechMap[] | [],
    supplierActiveOrders: ISupplierActiveOrder[] | [],
    custFavourities: IFavourite[],
    custPaymentOrders: ICustomerPaymentOrder[],
    loader: boolean
}

const initialState: IUserState = {
    customerProfile: null,
    supplierProfile: null,
    supplierProducts: [],
    supplierAnalytic: [],
    supplierTechMaps: [],
    supplierActiveOrders: [],
    custFavourities: [],
    custPaymentOrders: [],
    role: null,
    loader: false
}

// Получение профиля пользователя
export const getCustomerData = createAsyncThunk<ICustomer, string | undefined>(
    'user/getCustomerData',
    async function(email, {rejectWithValue}) {
        try {
            const response = await userAPI.getCustomerData(email);
            console.log('RES-CUSTOMER-GET', response.data)
            return response.data;
        } catch (error) {
            console.error('ERR:', error)
            rejectWithValue(error)
            return false;
        }
    }
);

// Создание профиля пользователя
export const createCustomer = createAsyncThunk<{}, ICustomerLoginForm>(
    'user/createCustomer',
    async function(customer, {rejectWithValue}) {
        try {
            const response = await userAPI.createCustomer(customer);
            console.log('RESPONCE-CREATE', response)
            return response.data;
        } catch (error) {
            console.error('ERR:', error)
            rejectWithValue(error)
            return false;
        }
    }
);

// Обновление профиля пользователя
export const updateCustomer = createAsyncThunk<{}, IUpdateCustomer>(
    'user/updateCustomer',
    async function(customer, {rejectWithValue, dispatch}) {
        try {
            const response = await userAPI.updateCustomer(customer);
            await dispatch(getCustomerData(customer.email));
            return response.data;
        } catch (error) {
            console.error('ERR:', error)
            rejectWithValue(error)
            return false;
        }
    }
);

// // Получение профиля поставщика
export const getSupplierData = createAsyncThunk<ISupplier, string | undefined>(
    'user/getSupplierData',
    async function(email, {rejectWithValue}) {
        try {
            const response = await userAPI.getSupplierData(email);
            console.log('RES-SUPPLIER-GET', response.data)
            return response.data;
        } catch (error) {
            console.error('ERR:', error)
            rejectWithValue(error)
            return false;
        }
    }
);

// Создание профиля поставщика
export const createSupplier = createAsyncThunk<{}, ISupplierLoginForm>(
    'user/createCustomer',
    async function(supplier, {rejectWithValue}) {
        try {
            const response = await userAPI.createSupplier(supplier);
            console.log('RESPONCE-CREATE-SUPPLIER', response)
            return response.data;
        } catch (error) {
            console.error('ERR:', error)
            rejectWithValue(error)
            return false;
        }
    }
);

// Обновление профиля поставщика
export const updateSupplier = createAsyncThunk<{}, {data: IUpdateSupplier, email: string}>(
    'user/updateSupplier',
    async function(supplier, {rejectWithValue, dispatch}) {
        try {
            const response = await userAPI.updateSupplier(supplier.data);
            await dispatch(getSupplierData(supplier.email));
            return response.data;
        } catch (error) {
            console.error('ERR:', error)
            rejectWithValue(error)
            return false;
        }
    }
);

// // Получение продуктов поставщика
export const getSupplierProducts = createAsyncThunk<IFullProduct[]>(
    'user/getSupplierProducts',
    async function(_, {rejectWithValue}) {
        try {
            const response = await userAPI.getSupplierProducts();
            console.log('RES-SUPPLIER-PRODUCTS-GET', response.data)
            return response.data;
        } catch (error) {
            console.error('ERR:', error)
            rejectWithValue(error)
            return false;
        }
    }
);


// Создание продукта (доступно только поставщику)
export const createProduct = createAsyncThunk<{}, ICreateProductRequest>(
    'user/createProduct',
    async function(product, {rejectWithValue, dispatch}) {
        try {
            const response = await userAPI.createProduct(product.productData);
            console.log('RESPONCE-CREATE-PRODUCT', response)

            const {productId} = response.data;
            if(!!productId) {
                // На создание картинки
                let addedImages = new FormData();
                addedImages.append('subjectId', productId);
                
                if(product.addImages.length) {
                    product.addImages.map(img => {
                        addedImages.append('images', img);
                    })

                    await imagesAPI.createImages(addedImages);
                }
            }

            await dispatch(getSupplierProducts());
        } catch (error) {
            console.error('ERR:', error)
            rejectWithValue(error)
            return false;
        }
    }
);

// Обновление продукта (доступно только поставщику)
export const updateProduct = createAsyncThunk<{}, IUpdateProductRequest>(
    'user/updateProduct',
    async function(product, {rejectWithValue, dispatch}) {
        try {
            const response = await userAPI.updateProduct(product.productData);
            console.log('RESPONCE-UPDATE-PRODUCT', response)

            // На создание картинки
            let addedImages = new FormData();
            addedImages.append('subjectId', product.productData.productId);
            
            if(product.addImages.length) {
                product.addImages.map(img => {
                    addedImages.append('images', img);
                })

                await imagesAPI.createImages(addedImages);
            }
            

            // На удаление картинки
            if(product.deleteImages.length) {
                await Promise.all(
                    product.deleteImages.map(async (img) => {
                        await imagesAPI.deleteImages({imageId: img});
                    })
                );
            }
            
            

            await dispatch(getSupplierProducts());
        } catch (error) {
            console.error('ERR:', error)
            rejectWithValue(error)
            return false;
        }
    }
);

// Удаление продукта
export const deleteProduct = createAsyncThunk<{}, IDeleteProduct>(
    'user/deleteProduct',
    async function(product, {rejectWithValue, dispatch}) {
        try {
            const response = await userAPI.deleteProduct(product);
            console.log('RESPONCE-DELETE-PRODUCT', response);
            await dispatch(getSupplierProducts());
        } catch (error) {
            console.error('ERR:', error)
            rejectWithValue(error)
            return false;
        }
    }
);

// ИЗБРАННОЕ

// Получение Избранных
export const getFavourities = createAsyncThunk<IFavourite[], IFavouriteFilter>(
    'user/getFavourities',
    async function(filterParams, {rejectWithValue}) {
        try {
            const response = await favouritiesAPI.getFavourities(filterParams);
            console.log('RESPONCE-GET-FAV', response);
            return response.data;
        } catch (error) {
            console.error('ERR:', error)
            rejectWithValue(error)
            return false;
        }
    }
);

// Создание Избранного
export const createFavourite = createAsyncThunk<{}, ICreateFavourite, {state: {user: IUserState}}>(
    'user/createFavourite',
    async function(favourite, {rejectWithValue, dispatch, getState}) {
        try {
            const response = await favouritiesAPI.createFavourite(favourite);
            console.log('RESPONCE-CREATE-FAV', response);

            const customerId = getState().user.customerProfile?.id;
            if(!!customerId) {
                await dispatch(getFavourities({customerId: customerId}));
            }
            
        } catch (error) {
            console.error('ERR:', error)
            rejectWithValue(error)
            return false;
        }
    }
);

// Удаление Избранного
export const deleteFavourite = createAsyncThunk<{}, IDeleteFavourite, {state: {user: IUserState}}>(
    'user/deleteFavourite',
    async function(favourite, {rejectWithValue, dispatch, getState}) {
        try {
            const response = await favouritiesAPI.deleteFavourite(favourite);
            console.log('RESPONCE-DELETE-FAV', response);
            const customerId = getState().user.customerProfile?.id;
            if(!!customerId) {
                await dispatch(getFavourities({customerId: customerId}));
            }
        } catch (error) {
            console.error('ERR:', error)
            rejectWithValue(error)
            return false;
        }
    }
);

// Получение купленных Order
export const getOrdersConfirmPay = createAsyncThunk<ICustomerPaymentOrder[], IOrdersFilter>(
    'user/getOrdersConfirmPay',
    async function(filterParams, {rejectWithValue}) {
        try {
            const response = await ordersAPI.getOrdersConfirmPay(filterParams);
            console.log('RESPONCE-GET-ORDERS-CONFIRM', response);
            return response.data;
        } catch (error) {
            console.error('ERR:', error)
            rejectWithValue(error)
            return false;
        }
    }
);

// Получение купленных Order (для сборки поставщиком)
export const getSupplierActiveOrders = createAsyncThunk<ISupplierActiveOrder[], IOrdersFilter>(
    'user/getSupplierActiveOrders',
    async function(filterParams, {rejectWithValue}) {
        try {
            const response = await ordersAPI.getSupplierActiveOrders(filterParams);
            console.log('RESPONCE-GET-ORDERS-SUPPLIER-ACTIVE', response);
            return response.data;
        } catch (error) {
            console.error('ERR:', error)
            rejectWithValue(error)
            return false;
        }
    }
);

// Получение аналитики поставщика
export const getSupplierAnalytic = createAsyncThunk<IAnalytic[], IAnalyticFilter>(
    'user/getSupplierAnalytic',
    async function(filterParams, {rejectWithValue}) {
        try {
            const response = await analyticAPI.getSupplierAnalytic(filterParams);
            console.log('RESPONCE-GET-ANALYTIC', response);
            return response.data;
        } catch (error) {
            console.error('ERR:', error)
            rejectWithValue(error)
            return false;
        }
    }
);

// Получение технологических карт поставщика
export const getSupplierTechMaps = createAsyncThunk<ITechMap[], ITechMapFilter>(
    'user/getSupplierTechMaps',
    async function(filterParams, {rejectWithValue}) {
        try {
            const response = await techMapAPI.getAllTechMap(filterParams);
            return response.data;
        } catch (error) {
            console.error('ERR:', error)
            rejectWithValue(error)
            return false;
        }
    }
);

// Создание технологической карты
export const createTechMap = createAsyncThunk<{}, ICreateOrUpdateTechMap>(
    'user/createTechMap',
    async function(techMap, {rejectWithValue, dispatch}) {
        try {
            await techMapAPI.createTechMap(techMap);
            await dispatch(getSupplierTechMaps({}));
        } catch (error) {
            console.error('ERR:', error)
            rejectWithValue(error)
            return false;
        }
    }
);

// Обновление технологической карты
export const updateTechMap = createAsyncThunk<{}, ICreateOrUpdateTechMap>(
    'user/updateTechMap',
    async function(techMap, {rejectWithValue, dispatch}) {
        try {
            await techMapAPI.updateTechMap(techMap);
            await dispatch(getSupplierTechMaps({}));
        } catch (error) {
            console.error('ERR:', error)
            rejectWithValue(error)
            return false;
        }
    }
);

// Удаление технологической карты
export const deleteTechMap = createAsyncThunk<{}, IDeleteTechMap>(
    'user/deleteTechMap',
    async function(techMap, {rejectWithValue, dispatch}) {
        try {
            await techMapAPI.deleteTechMap(techMap);
            await dispatch(getSupplierTechMaps({}));
        } catch (error) {
            console.error('ERR:', error)
            rejectWithValue(error)
            return false;
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeRole(state: IUserState, action: PayloadAction<{role: 'customer' | 'supplier'}>) : void {
            state.role = action.payload.role;
        }
    },
    extraReducers: (builder) => {
        builder
            // ПОЛЬЗОВАТЕЛЬСКАЯ ИНФОРМАЦИЯ
            .addCase(getCustomerData.pending, (state, action) => {
                state.loader = true;
            })
            .addCase(getCustomerData.fulfilled, (state, action) => {
                state.customerProfile = action.payload;
                state.role = 'customer';
                state.loader = false;
            })
            .addCase(updateCustomer.pending, (state, action) => {
                state.loader = true;
            })
            .addCase(updateCustomer.fulfilled, (state, action) => {
                state.loader = false;
            })
            .addCase(getSupplierData.pending, (state, action) => {
                state.loader = true;
            })
            .addCase(getSupplierData.fulfilled, (state, action) => {
                state.supplierProfile = action.payload;
                state.role = 'supplier';
                state.loader = false;
            })
            // ПРОДУКТЫ
            .addCase(createProduct.pending, (state, action) => {
                state.loader = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loader = false;
            })
            .addCase(getSupplierProducts.pending, (state, action) => {
                state.loader = true;
            })
            .addCase(getSupplierProducts.fulfilled, (state, action) => {
                state.supplierProducts = action.payload;
                state.loader = false;
            })
            // ИЗБРАННОЕ
            .addCase(getFavourities.pending, (state, action) => {
                state.loader = true;
            })
            .addCase(getFavourities.fulfilled, (state, action) => {
                state.custFavourities = action.payload;
                state.loader = false;
            })
            .addCase(createFavourite.pending, (state, action) => {
                state.loader = true;
            })
            .addCase(createFavourite.fulfilled, (state, action) => {
                state.loader = false;
            })
            // ORDERS (КУПЛЕННЫЕ)
            .addCase(getOrdersConfirmPay.pending, (state, action) => {
                state.loader = true;
            })
            .addCase(getOrdersConfirmPay.fulfilled, (state, action) => {
                state.custPaymentOrders = action.payload;
                state.loader = false;
            })
            .addCase(getSupplierActiveOrders.pending, (state, action) => {
                state.loader = true;
            })
            .addCase(getSupplierActiveOrders.fulfilled, (state, action) => {
                state.supplierActiveOrders = action.payload;
                state.loader = false;
            })
            // АНАЛИТИКА
            .addCase(getSupplierAnalytic.pending, (state, action) => {
                state.loader = true;
            })
            .addCase(getSupplierAnalytic.fulfilled, (state, action) => {
                state.supplierAnalytic = action.payload;
                state.loader = false;
            })
            // Технологические карты
            .addCase(getSupplierTechMaps.pending, (state, action) => {
                state.loader = true;
            })
            .addCase(getSupplierTechMaps.fulfilled, (state, action) => {
                state.supplierTechMaps = action.payload;
                state.loader = false;
            })
            
    }
})

export const userActions = userSlice.actions;

export default userSlice.reducer;