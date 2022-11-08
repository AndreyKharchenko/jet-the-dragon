export interface CountryType {
    code: string;
    label: string;
    phone: string;
    suggested?: boolean;
}

export interface IFormInputs {
    username: string;
    password: string;
    email?: string;
    city?: string;
}