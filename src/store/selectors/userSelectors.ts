import { RootState } from "..";

export const customerProfile = (state: RootState) => state.user.customerProfile;
export const customerCity = (state: RootState) => state.user.customerProfile?.city;
export const customerId = (state: RootState) => state.user.customerProfile?.id;
export const customerFirstName = (state: RootState) => state.user.customerProfile?.firstName;
export const customerLastName = (state: RootState) => state.user.customerProfile?.lastName;
export const custFavourities = (state: RootState) => state.user.custFavourities;
export const custPaymentOrders = (state: RootState) => state.user.custPaymentOrders;

export const supplierProfile = (state: RootState) => state.user.supplierProfile;
export const supplierCity = (state: RootState) => state.user.supplierProfile?.city;
export const supplierId = (state: RootState) => state.user.supplierProfile?.id;
export const supplierProducts = (state: RootState) => state.user.supplierProducts;
export const supplierAnalytic = (state: RootState) => state.user.supplierAnalytic;
export const supplierActiveOrders = (state: RootState) => state.user.supplierActiveOrders;
export const supplierTechMaps = (state: RootState) => state.user.supplierTechMaps;

export const userRole = (state: RootState) => state.user.role;
//export const role = (state: RootState) => state.user.role;
export const loader = (state: RootState) => state.user.loader;


