import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');

global.__CLIENT__ = true;
global.__DEVELOPMENT__ = false;

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };
