import React from "react";

describe(`gatsby-browser`, () => {
  describe(`onInitialClientRender`, () => {
    afterAll(() => {
      delete process.env.BUILD_STAGE;
    });

    it(`should not invokes querySelector if BUILD_STAGE is develop`, () => {
      jest.mock(`material-ui-plugin-cache-endpoint`, () => ({}), {
        virtual: true,
      });
      const { onInitialClientRender } = require(`../gatsby-browser`);

      const spy = jest.spyOn(document, `querySelector`);
      process.env.BUILD_STAGE = `develop`;
      onInitialClientRender();
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe(`wrapRootElement`, () => {
    beforeEach(() => jest.resetModules());

    it(`should return a pure element if nothing is specified`, () => {
      jest.mock(`material-ui-plugin-cache-endpoint`, () => ({}), {
        virtual: true,
      });
      const { wrapRootElement } = require(`../gatsby-browser`);

      const element = wrapRootElement({ element: <div /> }, {});

      expect(element).toEqual(<div />);
    });

    it(`should throw an error if both pathToStylesProvider and stylesProvider are specified`, () => {
      jest.mock(`material-ui-plugin-cache-endpoint`, () => ({ jss: {} }), {
        virtual: true,
      });
      const { wrapRootElement } = require(`../gatsby-browser`);

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

    it(`should not throw an error if only stylesProvider is specified`, () => {
      jest.mock(`material-ui-plugin-cache-endpoint`, () => ({}), {
        virtual: true,
      });
      const { wrapRootElement } = require(`../gatsby-browser`);

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
      const { wrapRootElement } = require(`../gatsby-browser`);

      expect(() => {
        wrapRootElement({ element: <div /> }, {});
      }).not.toThrowError();
    });
  });
});
