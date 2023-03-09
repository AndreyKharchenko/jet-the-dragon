import { RootState } from "..";

export const accessToken = (state: RootState) => state.auth.token;