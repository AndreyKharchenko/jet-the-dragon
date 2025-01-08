import axios from "axios";
import { ICartFilter, ICreateCart, ICreateDelivered, ICreatePayment } from "../models/cart";
import { IGetCategory, IProductFilter } from "../models/catalog";
import { IDeleteImage, IImages } from "../models/images";
import { ICustomerLoginForm, ISupplierLoginForm } from "../models/login";
import { ICreateOrder, IDeleteOrder, IOrdersFilter, IUpdateOrder } from "../models/order";
import { ICreateFavourite, ICreateProduct, IDeleteFavourite, IDeleteProduct, IFavouriteFilter, IUpdateProduct } from "../models/product";
import { IUpdateSupplier } from "../models/user";
import { IAnalyticFilter } from "../models/analytic";
import { ICreateOrUpdateTechMap, IDeleteTechMap, ITechMap, ITechMapFilter } from "../models/techmap";
//import https from 'https'


const token = localStorage.getItem('TOKEN');
//console.log('TOKEN', token)
// @ts-ignore

// const isNode = typeof window === 'undefined';
const instance = axios.create({
    baseURL: 'http://localhost:5158/',
    headers: {
        'Authorization': `Bearer ${token}`
    },
    /* ...(isNode && {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false, // Это работает только в Node.js среде
        }),
      }), */
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

export const techMapAPI = {
    getAllTechMap(data: ITechMapFilter) {
        return instance.get(`techmap`, {params: data});
    },
    createTechMap(data: ICreateOrUpdateTechMap) {
        return instance.post(`techmap`, data);
    },
    updateTechMap(data: ICreateOrUpdateTechMap) {
        return instance.put(`techmap`, data);
    },
    deleteTechMap(data: IDeleteTechMap) {
        return instance.delete(`techmap`, {params: data});
    },
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
    getOrdersConfirmPay(data: IOrdersFilter) {
        return instance.get(`ordersconfirmpay`, {params: data});
    },
    getSupplierActiveOrders(data: IOrdersFilter) {
        return instance.get(`supplierordersactive`, {params: data});
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
    },
    deleteImages(data: IDeleteImage) {
        return instance.delete(`image`, {params: data});
    }
}

export const paymentAPI = {
    createPayment(data: ICreatePayment) {
        return instance.post(`payment`, data);
    }
}

export const deliveredAPI = {
    createDelivered(data: ICreateDelivered) {
        return instance.post(`delivered`, data);
    }
}

export const favouritiesAPI = {
    getFavourities(data: IFavouriteFilter) {
        return instance.get(`favourities`, {params: data});
    },
    createFavourite(data: ICreateFavourite) {
        return instance.post(`favourities`, data);
    },
    deleteFavourite(data: IDeleteFavourite) {
        return instance.delete(`favourities`, {params: data});
    }
}

export const analyticAPI = {
    getSupplierAnalytic(data: IAnalyticFilter) {
        return instance.get(`analytic`, {params: data});
    }
}
