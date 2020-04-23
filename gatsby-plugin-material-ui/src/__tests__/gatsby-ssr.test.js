import React from "react";

describe(`gatsby-ssr`, () => {
  describe(`wrapRootElement`, () => {
    beforeEach(() => jest.resetModules());

    it(`should throw an error if both pathToStylesProvider and stylesProvider are specified`, () => {
      jest.mock(`material-ui-plugin-cache-endpoint`, () => ({ jss: {} }), {
        virtual: true,
      });
      const { wrapRootElement } = require(`../gatsby-ssr`);

      expect(() => {
        wrapRootElement(
          { element: <div /> },
          {
            stylesProvider: {
              injectFirst: true,
            },
          },
        );
      }).toThrowError();
    });

    it(`should not throw an error if nothing is specified`, () => {
      jest.mock(`material-ui-plugin-cache-endpoint`, () => ({}), {
        virtual: true,
      });
      const { wrapRootElement } = require(`../gatsby-ssr`);

      expect(() => {
        wrapRootElement({ element: <div /> }, {});
      }).not.toThrowError();
    });

    it(`should not throw an error if only stylesProvider is specified`, () => {
      jest.mock(`material-ui-plugin-cache-endpoint`, () => ({}), {
        virtual: true,
      });
      const { wrapRootElement } = require(`../gatsby-ssr`);

      expect(() => {
        wrapRootElement(
          { element: <div /> },
          {
            stylesProvider: {
              injectFirst: true,
            },
          },
        );
      }).not.toThrowError();
    });

    it(`should not throw an error if only stylesProviderProps are specified`, () => {
      jest.mock(`material-ui-plugin-cache-endpoint`, () => ({ jss: {} }), {
        virtual: true,
      });
      const { wrapRootElement } = require(`../gatsby-ssr`);

      expect(() => {
        wrapRootElement({ element: <div /> }, {});
      }).not.toThrowError();
    });
  });
});
