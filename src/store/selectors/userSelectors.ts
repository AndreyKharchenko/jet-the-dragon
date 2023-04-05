import { RootState } from "..";

export const customerProfile = (state: RootState) => state.user.customerProfile;
export const customerId = (state: RootState) => state.user.customerProfile?.id;
export const supplierProfile = (state: RootState) => state.user.supplierProfile;
export const supplierId = (state: RootState) => state.user.supplierProfile?.id;
export const supplierProducts = (state: RootState) => state.user.supplierProducts;
export const role = (state: RootState) => state.user.role;
export const loader = (state: RootState) => state.user.loader;

export const custFavourities = (state: RootState) => state.user.custFavourities;