import axios from "axios";
import { IGetCategory, IProductFilter } from "../models/catalog";
import { IImages } from "../models/images";
import { ICustomerLoginForm, ISupplierLoginForm } from "../models/login";
import { ICreateProduct, IUpdateProduct } from "../models/product";
import { IUpdateSupplier } from "../models/user";

const token = localStorage.getItem('TOKEN');
//console.log('TOKEN', token)

const instance = axios.create({
    baseURL: 'https://localhost:7099/',
    headers: {
        'Authorization': `Bearer ${token}`
    },
});

export const authAPI = {
    
}

// Запросы для поставщиков и покупателей
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
    },
    getSupplierProducts() {
        return instance.get(`supplierproducts`);
    },
    createProduct(data: ICreateProduct) {
        return instance.post(`products`, data);
    },
    updateProduct(data: IUpdateProduct) {
        return instance.put(`products`, data);
    }
}

export const catalogAPI = {
    getCategories(data: IGetCategory) {
        return instance.get(`category`, {params: data});
    },
    getProductsByFilter(data: IProductFilter) {
        if(Object.keys(data).length) {
            return instance.get(`products`, {params: data});
        } else {
            return instance.get(`products`);
        }
        
    }
}

export const imagesAPI = {
    createImages(data: FormData) {
        return instance.post(`image`, data);
    }
}
