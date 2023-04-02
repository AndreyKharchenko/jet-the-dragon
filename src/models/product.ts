import { Moment } from "moment"
// СОДЕРЖИТ ИНТЕРФЕЙСЫ ПРОДУКТОВ
export interface IProduct { // TO-DO: remove
    id: number,
    name: string,
    qty: number,
    price: number,
    image: string,
    isChoose?: boolean,
    isFavourite?: boolean
}

// Информация о продукте (используем при создании)
export interface ICreateProduct {
    categoryId: string,
    supplierId: string | number,
    name: string,
    description: string,
    price: number,
    count: number,
    shelfLife: number,
    manufactureDate: Moment | object,
    rating: number,
    unit: '1000GRM' | 'PACK',
    productCharaks: CharakValue[]
}

export interface IFullProduct extends ICreateProduct {
    id: string,
}

export interface IUpdateProduct extends ICreateProduct {
    productId: string
}

export interface IDeleteProduct {
    productId: string
}

export interface CharakValue {
    key: string,
    value: string
}

export interface Charak extends CharakValue {
    id: number,
}


