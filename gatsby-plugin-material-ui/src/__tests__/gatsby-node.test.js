const { onPreInit } = require(`../gatsby-node`);

describe(`gatsby-node`, () => {
  describe(`onPreInit`, () => {
    it(`should throw an exception if the plugin is provided twice in the gatsby config`, () => {
      onPreInit();
      expect(() => {
        onPreInit();
      }).toThrowError();
    });
  });
});
