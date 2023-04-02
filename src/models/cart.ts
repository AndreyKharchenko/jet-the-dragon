export interface IBankCard {
    cardnumber: string,
    cardDt: object,
    cvv: string
}

export interface ICreateCart {
    deliveryType: string,
    paymentType: string,
    comment: string
}

export interface IUpdateCart extends ICreateCart {
    cartId: string
}

export interface ICart extends ICreateCart {
    id: string
}

export interface ICartFilter {
    customerId: string
    status?: number
}

export interface ICreatePayment {
    cartId: string,
    payment: boolean
}

export interface PaymentDetailsForm {deliveryType: string, paymentType: string, comment: string};