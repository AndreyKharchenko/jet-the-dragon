import { Moment } from "moment"

export interface ICreateOrder {
    productId: string,
    cartId: string,
    count: number,
    createDate: Moment | object
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
}

export interface IOrdersFilter {
    cartId?: string
    customerId?: string
}