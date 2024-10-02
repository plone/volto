if (typeof window === 'undefined') {
  global.__SERVER__ = true;
  global.__CLIENT__ = false;
  global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';
} else {
  global.__CLIENT__ = true;
  global.__SERVER__ = false;
  global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        addListener: function () {},
        removeListener: function () {},
      };
    };
}
