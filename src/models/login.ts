export interface ICustomerLoginForm {
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

export interface ISupplierLoginForm { 
    customerId?: number | string,
    orgType: string;
    inn: string;
    name: string;
    ogrnip: string;
    declarationNum: string;
    declarationDate: object;
    sanBookNum: string;
    sanBookDate: object;
    description: string
}