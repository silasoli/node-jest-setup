// jest.mock('../../app/doubles/OtherUtils'); mock all

//choose functions to mock
jest.mock('../../app/doubles/OtherUtils', () => ({
    ...jest.requireActual('../../app/doubles/OtherUtils'),
    //change implementation only this function
    calculateComplexity: () => { return 10; },
}));

jest.mock('uuid', () => ({
    v4: () => '123'
}))

describe('module tests', () => {
    test('calculate complexity', () => {
        const result = OtherUtils.calculateComplexity({} as any);
        expect(result).toBe(10);
    })

    test('calculate complexity', () => {
        const result = OtherUtils.toUpperCase('abc');
        expect(result).toBe('ABC');
    })

    test('string with id', () => {
        const result = OtherUtils.toLowerCaseWithId('ABC');
        expect(result).toBe('abc123');
    })

})

import * as OtherUtils from '../../app/doubles/OtherUtils'