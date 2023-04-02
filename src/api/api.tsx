import axios from "axios";
import { ICartFilter, ICreateCart, ICreatePayment } from "../models/cart";
import { IGetCategory, IProductFilter } from "../models/catalog";
import { IImages } from "../models/images";
import { ICustomerLoginForm, ISupplierLoginForm } from "../models/login";
import { ICreateOrder, IDeleteOrder, IUpdateOrder } from "../models/order";
import { ICreateProduct, IDeleteProduct, IUpdateProduct } from "../models/product";
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
    },
    deleteProduct(data: IDeleteProduct) {
        return instance.delete(`products`, {params: data});
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

export const ordersAPI = {
    getOrders(data: any) {
        return instance.get(`orders`, {params: data});
    },
    createOrder(data: ICreateOrder) {
        return instance.post(`orders`, data);
    },
    updateOrder(data: IUpdateOrder) {
        return instance.put(`orders`, data);
    },
    deleteOrder(data: IDeleteOrder) {
        return instance.delete(`orders`, {params: data});
    }
}

export const cartAPI = {
    getCart(data: ICartFilter) {
        return instance.get(`cart`, {params: data});
    },
    createCart(data: ICreateCart) {
        return instance.post(`cart`, data);
    },
    updateCart(data: ICreateCart) {
        return instance.put(`cart`, data);
    }
}

export const imagesAPI = {
    createImages(data: FormData) {
        return instance.post(`image`, data);
    }
}

export const paymentAPI = {
    createPayment(data: ICreatePayment) {
        return instance.post(`payment`, data);
    }
}
