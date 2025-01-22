import { toUpperCase } from "../app/Utils";

describe("Utils test suite", () => {
    
    it('should return upper case of valid string', () => {
        // arrage:
        const sut = toUpperCase;
        const expected = 'ABC';

        // act:
        const actual = sut('abc');


        // assert:
        expect(actual).toBe(expected);
    })
})