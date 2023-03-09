import { RootState } from "..";

export const loader = (state: RootState) => state.catalog.loader;
export const currentProduct = (state: RootState) => state.catalog.currentProduct;