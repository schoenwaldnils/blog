import {
  merge,
  forEach,
  map,
} from 'lodash';

const defaults = {
  currentTag: false,
};

const elements = {
  reset: 'Filter-reset',
  inputs: 'Filter-tag',
};

class Filter {
  constructor(element, options = {}) {
    this.element = element;
    this.options = merge(defaults, options);
    this.elements = {};
    const html = document.querySelector('html');
    const url = window.location.href;

    forEach(elements, (value, key) => {
      if (this.element.getElementsByClassName(value).length > 1) {
        this.elements[key] = this.element.getElementsByClassName(value);
      } else {
        this.elements[key] = this.element.getElementsByClassName(value)[0];
      }
    });

    this.updateHash = () => {
      if (window.history.replaceState) {
        window.history.replaceState({}, '', `#${this.options.currentTag}`);
      }
    };

    this.checkRadio = () => {
      if (url.indexOf('/tag/') === -1) {
        return;
      }
      map(this.elements.inputs, (input) => {
        const radio = input;
        radio.checked = false;
      });
      const selectedRadio = this.element.getElementsByClassName(`Filter-tag--${this.options.currentTag}`)[0];
      selectedRadio.checked = true;
    };

    this.addHtmlData = () => {
      html.setAttribute('data-tag', `tag:${this.options.currentTag}`);
    };

    this.reset = () => {
      html.removeAttribute('data-tag');
      window.history.replaceState({}, '', '#');
      map(this.elements.inputs, (input) => {
        const radio = input;
        radio.checked = false;
      });
    };

    this.setOption = (key, value) => {
      // console.log(`key: ${key}, value: ${value}`);
      switch (key) {
        case 'currentTag':
          this.options[key] = value;
          if (!value) {
            this.reset();
            break;
          }
          this.updateHash();
          this.checkRadio();
          this.addHtmlData();
          break;
        default:
          this.options[key] = value;
          break;
      }
    };

    if (url.indexOf('#') !== -1) {
      const id = url.substring(url.lastIndexOf('#') + 1);
      if (id !== '') {
        this.setOption('currentTag', id);
      }
    }

    map(this.elements.inputs, (input) => {
      input.addEventListener('change', () => {
        this.setOption('currentTag', input.getAttribute('value'));
      });
    });

    this.elements.reset.addEventListener('click', () => {
      this.setOption('currentTag', false);
    });
  }
}

export default Filter;
