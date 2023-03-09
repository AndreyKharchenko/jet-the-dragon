import { RootState } from "..";

export const customerProfile = (state: RootState) => state.user.customerProfile;
export const supplierProfile = (state: RootState) => state.user.supplierProfile;