import { hasEntries } from "../utils";

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
});
