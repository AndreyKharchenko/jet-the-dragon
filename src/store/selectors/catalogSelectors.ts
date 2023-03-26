import { RootState } from "..";

export const loader = (state: RootState) => state.catalog.loader;
export const currentProduct = (state: RootState) => state.catalog.currentProduct;
export const productCategories = (state: RootState) => state.catalog.productCategories;
export const products = (state: RootState) => state.catalog.products;
