import autoprefixer from "../autoprefixer";

describe(`autoprefixer`, () => {
  describe(`default`, () => {
    const invalidCss = `
        .jss1 {
            border-radius: 6px;
        }
        .jss1 {
            h1, h2, h3: [object Object];
        }
    `;

    it(`should throw an error if css is invalid1`, () => {
      expect(() =>
        autoprefixer(invalidCss, `/test`),
      ).toThrowErrorMatchingSnapshot();
    });
  });
});
