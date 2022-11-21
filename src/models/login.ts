export interface CountryType {
    code: string;
    label: string;
    phone: string;
    suggested?: boolean;
}

export interface IUserForm {
    username: string;
    password: string;
    email?: string;
    city?: string;
}

export interface IProviderForm {
    surname: string;
    name: string;
    patronymic: string;
    phone: string;
    email: string;
    country: string;
    orgFormat: string;
    inn: string;
    providerName: string;
    chiefName: string;
    ogrnil: string;
    declarationNum: string;
    dtDeclaration: object;
    sanBookNum: string;
    dtSanBook: object;
}