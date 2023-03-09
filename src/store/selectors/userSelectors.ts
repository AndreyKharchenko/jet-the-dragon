import { RootState } from "..";

export const customerProfile = (state: RootState) => state.user.customerProfile;
export const supplierProfile = (state: RootState) => state.user.supplierProfile;
export const role = (state: RootState) => state.user.role;
export const loader = (state: RootState) => state.user.loader;