import { toUpperCase } from "../app/Utils";

describe("Utils test suite", () => {
    
    test('should return upper case', () => {
        const result = toUpperCase('abc');
        expect(result).toBe('ABC');
    })
})