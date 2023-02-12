export interface IProduct {
    id: number,
    name: string,
    qty: number,
    price: number,
    image: string,
    isChoose?: boolean,
    isFavourite?: boolean
}

export interface IFullProduct {
    //productId: number,
    productCategory: string,
    productSupplier: string,
    productName: string,
    productDesc: string,
    productCost: number,
    isStock: boolean,
    //expirationDt: Date,
    productSl: number,
    //manufactureDt: Date,
    //charaks: Charak[]
    productQty: number
}

export type Charak = {
    id: number,
    charakName: string,
    charakValue: string
}