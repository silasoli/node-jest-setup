import { PasswordChecker, PasswordErrors } from "../../app/pass_checker/PasswordChecker";

describe('PasswordChecker test suite', () => {
    let sut: PasswordChecker;

    beforeEach(() => {
        sut = new PasswordChecker();
    })

    it('Password with less than 8 chars is invalid', () => {
        const actual = sut.checkPassword('1234567');

        expect(actual.valid).toBe(false);
        expect(actual.reasons).toContain(PasswordErrors.SHORT);
    })

    it('Password with more than 8 chars is valid', () => {
        const actual = sut.checkPassword('12345678Aa');

        expect(actual.valid).toBe(true);
        expect(actual.reasons).not.toContain(PasswordErrors.SHORT);
    })

    it('Password with no upper case letters is invalid', () => {
        const actual = sut.checkPassword('1234abcd');

        expect(actual.valid).toBe(false);
        expect(actual.reasons).toContain(PasswordErrors.NO_UPPER_CASE);
    })

    it('Password with upper case letters is valid', () => {
        const actual = sut.checkPassword('1234abcdE');

        expect(actual.valid).toBe(true);
        expect(actual.reasons).not.toContain(PasswordErrors.NO_UPPER_CASE);
    })


    it('Password with no lower case letters is invalid', () => {
        const actual = sut.checkPassword('1234ABCD');

        expect(actual.valid).toBe(false);
        expect(actual.reasons).toContain(PasswordErrors.NO_LOWER_CASE);
    })

    it('Password with lower case letters is valid', () => {
        const actual = sut.checkPassword('1234ABCDe');

        expect(actual.valid).toBe(true);
        expect(actual.reasons).not.toContain(PasswordErrors.NO_LOWER_CASE);
    })

    it('Complex password is valid', () => {
        const actual = sut.checkPassword('1234ABCDe');

        expect(actual.valid).toBe(true);
        expect(actual.reasons).toHaveLength(0);
    })


     it('Admin password with no number is invalid', () => {
        const actual = sut.checkAdminPassword('abcdABCD');

        expect(actual.reasons).toContain(PasswordErrors.NO_NUMBER);
        expect(actual.valid).toBe(false);
    })

     it('Admin password with number is valid', () => {
        const actual = sut.checkAdminPassword('abcdABCD7');

        expect(actual.reasons).not.toContain(PasswordErrors.NO_NUMBER);
        expect(actual.valid).toBe(true);
    })
})