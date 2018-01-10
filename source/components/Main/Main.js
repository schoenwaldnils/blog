import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Main extends Component {
  static contextTypes = {
    _documentProps: PropTypes.any,
  }

  render() {
    const { html, errorHtml } = this.context._documentProps;

    return [
      <div id="__next" dangerouslySetInnerHTML={{ __html: html }} key="main-html" />,
      <div id="__next-error" dangerouslySetInnerHTML={{ __html: errorHtml }} key="main-error" />,
    ];
  }
}

export default Main;
