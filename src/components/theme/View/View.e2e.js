const page = {
  loaded: () => element(by.id('page-home')),
  heading: () => element(by.css('h1')).getText(),
};

describe('Home container', () => {
  beforeEach(() => {
    browser.get('/');
    browser.wait(protractor.ExpectedConditions.presenceOf(page.loaded()), 10000);
  });

  it('loads the home screen', () => {
    expect(page.heading()).toEqual('Mosaic');
  });
});
