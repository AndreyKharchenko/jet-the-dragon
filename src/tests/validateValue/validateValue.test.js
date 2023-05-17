import { getPaymentType } from "../../utils/utils";

describe('validateValue', () => {
    test('getPaymentType = CASH', () => {
        expect(getPaymentType('cash')).toBe('Наличными при получении');
    })

    test('getPaymentType = BANKCARD', () => {
        expect(getPaymentType('bankcard')).toBe('Оплата банковской картой онлайн');
    })

    test('getPaymentType = UNDEFINED', () => {
        expect(getPaymentType(undefined)).toBe(null);
    })
})