import square from "./square";


describe('square', () => {
    beforeEach(() => {

    })

    beforeAll(() => {

    })

    test('Корректное значение', () => {
        const spyMathPow = jest.spyOn(Math, 'pow');
        square(1);
        expect(spyMathPow).toBeCalledTimes(0); // ожидаемое кол-во вызываний метода
    })

    test('Корректное значение2', () => {
        const spyMathPow = jest.spyOn(Math, 'pow');
        square(2);
        expect(spyMathPow).toBeCalledTimes(1); // ожидаемое кол-во вызываний метода
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    afterAll(() => {

    })

})