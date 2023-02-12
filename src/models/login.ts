/*export interface CountryType {
    code: string;
    label: string;
    phone: string;
    suggested?: boolean;
}*/

export interface ICustomerLoginForm {
    /*username: string;
    password: string;
    email?: string;
    city?: string;*/
    firstname: string,
    lastname: string,
    password: string;
    phone: string,
    email: string,
    country: string,
    city: string,
    street: string,
    housenumber: string,
    flatnumber: string
}

export interface ISupplierLoginForm {
    firstname: string;
    lastname: string;
    patronymic: string;
    phone: string;
    email: string;
    country: string;
    region: string;// DO
    city: string,// DO
    street: string,// DO
    housenumber: string, // DO
    orgFormat: string;
    inn: string;
    supplierName: string;
    chiefName: string;
    ogrnip: string;
    declarationNum: string;
    dtDeclaration: object;
    sanBookNum: string;
    dtSanBook: object;
}