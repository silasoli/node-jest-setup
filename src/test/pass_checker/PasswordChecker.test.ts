import { PasswordChecker } from "../../app/pass_checker/PasswordChecker";

describe('PasswordChecker test suite', () => {
    let sut: PasswordChecker;

    beforeEach(() => {
        sut = new PasswordChecker();
    })

    it('Password with less than 8 chars is invalid', () => {
        const actual = sut.checkPassword('1234567');

        expect(actual).toBe(false);
    })

    it('Password with more than 8 chars is valid', () => {
        const actual = sut.checkPassword('12345678Aa');

        expect(actual).toBe(true);
    })

    it('Password with no upper case letters is invalid', () => {
        const actual = sut.checkPassword('1234abcd');

        expect(actual).toBe(false);
    })

    it('Password with upper case letters is valid', () => {
        const actual = sut.checkPassword('1234abcdE');

        expect(actual).toBe(true);
    })


    it('Password with no lower case letters is invalid', () => {
        const actual = sut.checkPassword('1234ABCD');

        expect(actual).toBe(false);
    })

    it('Password with lower case letters is valid', () => {
        const actual = sut.checkPassword('1234ABCDe');

        expect(actual).toBe(true);
    })
})