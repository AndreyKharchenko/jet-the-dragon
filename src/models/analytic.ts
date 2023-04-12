export interface IRowTable {
    id: string,
    productName: string;
    productSalesCount: number;
    productProfit: number,
}

export interface IColumnTable {
    id: string;
    label: string;
    numeric: boolean;
    disablePadding: boolean;
}