import { generateRandomId } from "../../../app/server_app/data/IdGenerator";

describe('IdGeneretor test suite', () => {
    it('should return id', () => {
        const actual = generateRandomId()
        expect(actual).toBeDefined();
        expect(actual.length).toBe(20);
    })
})