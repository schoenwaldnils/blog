((window, document) => {
  // // Locales
  // const App = {};
  // const MenuBar = require('./components/menu-bar/menu-bar.js');
  // const Btf = require('./components/btf/btf.js');

  // Initialization

  const init = () => {
    /*
     * App registration
     */

    // App.menuBar = new MenuBar(document.getElementById('js-MenuBar'));
    // App.btf = new Btf(document.getElementById('beautiful-taxonomy-filters-fahrrad'));
  };

  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', init);
  }
})();
