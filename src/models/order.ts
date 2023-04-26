import { Moment } from "moment"

export interface ICreateOrder {
    productId: string,
    cartId: string,
    count: number,
    createDate: Moment | object,
    isWholesale?: boolean,
}

export interface IUpdateOrder extends ICreateOrder {
    orderId: string,
}

export interface IDeleteOrder {
    orderId: string,
    cartId: string
}

// Using in Cart
export interface IFullOrder extends ICreateOrder {
    id: string,
    productName: string,
    productManufactureDate: object,
    //productImageId: string,
    productPrice: number,
    productUnit: string,
    productImage: string
}

// Using in Customer Profile
export interface ICustomerPaymentOrder extends IFullOrder {
    createDate: Moment | object,
    cartPaymentType: string,
    cartDeliveryType: string,
    supplierAddres: string, 
    isWholesale: boolean,
}

// Using in Supplier Profile
export interface ISupplierActiveOrder extends IFullOrder {
    createDate: Moment | object,
    cartPaymentType: string,
    cartDeliveryType: string,
    supplierAddres: string, 
    isWholesale: boolean,
}

export interface IOrdersFilter {
    cartId?: string
    customerId?: string
    supplierId?: string
}