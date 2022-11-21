import { createSlice } from "@reduxjs/toolkit";

interface ICatalogState {

}

const initialState: ICatalogState = {

}

const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {

    },
})

export const catalogActions = catalogSlice.actions;

export default catalogSlice.reducer;