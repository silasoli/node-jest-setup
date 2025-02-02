import { getStringInfo, StringUtils, toUpperCase } from "../app/Utils";

describe("Utils test suite", () => {

  describe.only('StringUtils tests', () => {

    let sut: StringUtils;

    beforeEach(() => {
      sut = new StringUtils();
      console.log('Setup')
    })

    afterEach(() => {
      //clearing mocks
      console.log('Teardown')
    })

    it('should return correct upperCase', () => {
      // act:
      const actual = sut.toUpperCase('abc');

      // assert:
      expect(actual).toBe('ABC');
      console.log('Actual test')

    })

    it('should throw error on invalid argument - function', () => {
      // act:
      function expectError() {
        const actual = sut.toUpperCase('');
      }

      // assert:
      expect(expectError).toThrow();
      expect(expectError).toThrow('Invalid argument!');
    })


    it('should throw error on invalid argument - arrow function', () => {
      // act
      // assert:
      expect(() => {
        sut.toUpperCase('');
      }).toThrow('Invalid argument!');
    })


    it('should throw error on invalid argument - try catch block', () => {
      // this test method is a false positive 
      try {
        // act
        sut.toUpperCase('');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty('message', 'Invalid argument!');

      }
    })
  })





  //each test paramters
  describe("ToUpperCase examples", () => {
    // arrage:
    it.each([
      {
        input: "abc",
        expected: "ABC",
      },
      {
        input: "My-String",
        expected: "MY-STRING",
      },
      {
        input: "def",
        expected: "DEF",
      },
    ])(
      "$input toUpperCase should return $expected",
      ({ input, expected }) => {
        // act:
        const actual = toUpperCase(input);

        // assert:
        expect(actual).toBe(expected);
      }
    );
  });

  it("should return upper case of valid string", () => {
    // arrage:
    const sut = toUpperCase;
    const expected = "ABC";

    // act:
    const actual = sut("abc");

    // assert:
    expect(actual).toBe(expected);
  });

  describe("getStringInfo for arg My-String should", () => {
    test("return right length", () => {
      // arrage:
      const sut = getStringInfo;
      const input = "My-String";

      // act:
      const actual = sut(input);

      // assert:
      expect(actual.length).toBe(9);
    });

    test("return right lower case", () => {
      // arrage:
      const sut = getStringInfo;
      const input = "My-String";

      // act:
      const actual = sut(input);

      // assert:
      expect(actual.lowerCase).toBe("my-string");
    });

    test("return right upper case", () => {
      // arrage:
      const sut = getStringInfo;
      const input = "My-String";

      // act:
      const actual = sut(input);

      // assert:
      expect(actual.upperCase).toBe("MY-STRING");
    });

    test("return right characters", () => {
      // arrage:
      const sut = getStringInfo;
      const input = "My-String";

      // act:
      const actual = sut(input);

      // assert:
      expect(actual.characters).toContain("M");
      expect(actual.characters).toContain("y");
      expect(actual.characters).toEqual(Array.from(input));
      expect(actual.characters).toEqual(
        expect.arrayContaining(Array.from(input))
      );
    });

    test("return defined extra info", () => {
      // arrage:
      const sut = getStringInfo;
      const input = "My-String";

      // act:
      const actual = sut(input);

      // assert:
      expect(actual.extraInfo).toBeDefined();
    });

    test("return right extra info", () => {
      // arrage:
      const sut = getStringInfo;
      const input = "My-String";

      // act:
      const actual = sut(input);

      // assert:
      expect(actual.extraInfo).toEqual({});
    });
  });

  it("should return info for valid string", () => {
    // arrage:
    const sut = getStringInfo;
    const input = "My-String";

    // act:
    const actual = sut("My-String");

    // assert:
    expect(actual.lowerCase).toBe(input.toLowerCase());
    expect(actual.upperCase).toBe(input.toUpperCase());
    expect(actual.length).toBe(input.length);
    expect(actual.characters).toContain("M");
    expect(actual.characters).toContain("y");
    expect(actual.characters).toEqual(Array.from(input));
    expect(actual.characters).toEqual(
      expect.arrayContaining(Array.from(input))
    );

    expect(actual.extraInfo).toEqual({});

    expect(actual.extraInfo).not.toBe(undefined);
    expect(actual.extraInfo).not.toBeUndefined();
  });
});
