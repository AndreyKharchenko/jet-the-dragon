export interface ICustomer {
    id: string,
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
    id: string,
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
    description: string;
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