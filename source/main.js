import { map } from 'lodash';
import Filter from './components/Filter/Filter';

((window, document) => {
  const App = {};

  // Initialization

  const init = () => {
    /*
     * App registration
     */
    if (document) {
      map(document.getElementsByClassName('js-Filter'), (element) => {
        App.filter = new Filter(element);
      });
    }
  };

  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', init);
  }
})(window, document);
