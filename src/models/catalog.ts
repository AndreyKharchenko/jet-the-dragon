import { Moment } from "moment"

// ИНТЕРФЕЙСЫ ДЛЯ РАБОТЫ С СТРАНИЦЕЙ КАТАЛОГА
export interface ICategory {
    id: string,
    name: string,
    description: string,
}

export interface IGetCategory {
    orderBy?: 'desc' | 'asc',
    pageIndex?: number,
    pageSize?: number,
    name?: string
}

export interface IProductFilter {
    categoryId?: string,
    supplierId?: string,
    minShelfLife?:number,
    maxShelfLife?:number,
    minManufactureDate?: Moment,
    maxManufactureDate?: Moment,
    minRating?: number,
    maxRating?: number
}