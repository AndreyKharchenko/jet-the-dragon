export interface ICustomer {
    id: string | number,
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    country: string,
    region?: string,
    city: string,
    street: string,
    houseNumber: string,
    flatNumber: string
}
// Профиль поставщика = покупатель + поставщик
export interface ISupplier {
    id: string | number,
    customerId?: string | number,
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    country: string,
    region?: string,
    city: string,
    street: string,
    houseNumber: string,
    flatNumber: string
    orgType: string;
    inn: string;
    name: string;
    ogrnip: string;
    declarationNum: string;
    declarationDate: object;
    sanBookNum: string;
    sanBookDate: object;
}

export interface IUpdateCustomer {
    customerId: string | number,
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    country: string,
    region?: string,
    city: string,
    street: string,
    houseNumber: string,
    flatNumber: string
}

export interface IUpdateSupplier {
    supplierId: number | string,
    orgType: string;
    inn: string;
    name: string;
    ogrnip: string;
    declarationNum: string;
    declarationDate: object;
    sanBookNum: string;
    sanBookDate: object;
    description: string;
}