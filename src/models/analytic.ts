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

export interface IBarChartData {
    name: string, 
    value: number
}

export interface ILineChartData {
    name: string, 
    value: number
}

export interface IAnalyticFilter {
    supplierId: string
}

export interface IAnalytic {
    productId: string,
    productName: string,
    productSalesCount: number,
    productProfit: number,
    supplierId: string,
}