import axios from "axios";
import { useAppSelector } from "../hooks/useRedux";
import { ICustomerLoginForm, ISupplierLoginForm } from "../models/login";
import { IUpdateSupplier } from "../models/user";

const token = localStorage.getItem('TOKEN');
console.log('TOKEN', token)

const instance = axios.create({
    baseURL: 'https://localhost:7099/',
    headers: {
        'Authorization': `Bearer ${token}`
    },
});

export const authAPI = {
    
}

export const userAPI = {
    getCustomerData(email: string | undefined) {
        return instance.get(`customer`, {params: {Email: email}});
    },
    createCustomer(data: ICustomerLoginForm) {
        return instance.post(`customer`, data);
    },
    updateCustomer(data: ICustomerLoginForm) {
        return instance.put(`customer`, data);
    },
    getSupplierData(email: string | undefined) {
        return instance.get(`supplier`, {params: {Email: email}});
    },
    createSupplier(data: ISupplierLoginForm) {
        return instance.post(`supplier`, data);
    },
    updateSupplier(data: IUpdateSupplier) {
        return instance.put(`supplier`, data);
    }
}
