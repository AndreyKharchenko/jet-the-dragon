import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "oidc-client";
import { userAPI } from "../../api/api";
import { ICustomerLoginForm, ISupplierLoginForm } from "../../models/login";
import { ICustomer, ISupplier, IUpdateCustomer, IUpdateSupplier } from "../../models/user";

interface IUserState {
    customerProfile: null | ICustomer,
    supplierProfile: null | ISupplier,
    role: 'customer' | 'supplier' | null,
    loader: boolean
}

const initialState: IUserState = {
    customerProfile: null,
    supplierProfile: null,
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
                console.log('ACTION', action.payload)
                state.supplierProfile = action.payload;
                state.role = 'supplier';
                state.loader = false;
            })
            
    }
})

export const userActions = userSlice.actions;

export default userSlice.reducer;