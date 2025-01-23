import { getStringInfo, toUpperCase } from "../app/Utils";

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



    it.only('should return info for valid string', () => {
        // arrage:
        const sut = getStringInfo;
        const input = 'My-String';

        // act:
        const actual = sut('My-String');
        
        // assert:
        expect(actual.lowerCase).toBe(input.toLowerCase());
        expect(actual.upperCase).toBe(input.toUpperCase());
        expect(actual.length).toBe(input.length);
        expect(actual.characters).toContain('M');
        expect(actual.characters).toContain('y');
        expect(actual.characters).toEqual(Array.from(input));
        expect(actual.characters).toEqual(
            expect.arrayContaining(Array.from(input))
        );

        expect(actual.extraInfo).toEqual({});

        expect(actual.extraInfo).not.toBe(undefined);
        expect(actual.extraInfo).not.toBeUndefined();

    })
})