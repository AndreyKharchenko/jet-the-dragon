export interface ICreateOrder {
    productId: string,
    cartId: string,
    count: number,
}

export interface IUpdateOrder extends ICreateOrder {
    orderId: string,
}

export interface IDeleteOrder {
    orderId: string,
    cartId: string
}

export interface IFullOrder extends ICreateOrder {
    id: string,
    productName: string,
    productManufactureDate: object,
    productImageId: string,
    productPrice: number,
    productUnit: string
}

export interface IOrdersFilter {
    cartId?: string
}