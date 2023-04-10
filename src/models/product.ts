import { Moment } from "moment"
// СОДЕРЖИТ ИНТЕРФЕЙСЫ ПРОДУКТОВ

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
    productImages?: string[]
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

export interface ICreateFavourite {
    customerId: string,
    productId: string
}

export interface IFavourite extends ICreateFavourite {
    id: string
}

export interface IDeleteFavourite {
    favouriteId: string
}

export interface IFavouriteFilter {
    customerId: string
}

export interface newPhoto { 
    id: number, 
    photo: File
}

export interface ICreateProductRequest {
    productData: ICreateProduct, 
    addImages: File[], 
}

export interface IUpdateProductRequest {
    productData: IUpdateProduct, 
    addImages: File[],
    deleteImages: string[]
}


