import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "oidc-client";

interface IAuthState {
    token? : User | undefined,
}

const initialState: IAuthState = {
    token : undefined,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userSigned(state: IAuthState, action: PayloadAction<{token: User | undefined}>) {
            if(!!action.payload.token) {
                localStorage.setItem('TOKEN', action.payload.token.access_token);
            }
            
            state.token = action.payload.token;
        },
    }
})

export const authActions = authSlice.actions;

export default authSlice.reducer;