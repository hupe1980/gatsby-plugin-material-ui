import { onInitialClientRender } from '../gatsby-browser';
// import SPMock from '../.cache/styles-provider-props';

jest.mock(
  `../.cache/styles-provider-props`,
  () => {
    return {
      injectFirst: true,
    };
  },
  { virtual: true },
);

describe(`onInitialClientRender`, () => {
  afterAll(() => {
    delete process.env.BUILD_STAGE;
  });

  it(`should not invokes querySelector if BUILD_STAGE is develop`, () => {
    const spy = jest.spyOn(document, `querySelector`);
    process.env.BUILD_STAGE = `develop`;
    onInitialClientRender();
    expect(spy).not.toHaveBeenCalled();
  });
});
