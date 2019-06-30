import { hasEntries, prefix } from "../utils";
import { fail } from "assert";
describe(`utils`, () => {
  describe(`hasEntries`, () => {
    it(`should return false if object is empty`, () => {
      expect(hasEntries({})).toBe(false);
    });

    it(`should return false if object is null`, () => {
      expect(hasEntries(null)).toBe(false);
    });

    it(`should return true if object has entries`, () => {
      expect(hasEntries({ jss: {} })).toBe(true);
    });
  });

  describe(`prefix`, () => {
    const invalidCss = `
        .jss1 {
            border-radius: 6px;
        }
        .jss1 {
            h1, h2, h3: [object Object];
        }
    `;

    it(`should throw an error if css is invalid1`, () => {
      expect(() => prefix(invalidCss, `/test`)).toThrowErrorMatchingSnapshot();
    });
  });
});
