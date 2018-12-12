import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Lowlight from 'react-lowlight';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import html from 'highlight.js/lib/languages/xml';

Lowlight.registerLanguage('css', css);
Lowlight.registerLanguage('js', js);
Lowlight.registerLanguage('html', html);

export default class CodeBlock extends PureComponent {
  render() {
    const { language, value } = this.props;

    return (
      <Lowlight
        language={language}
        value={value} />
    );
  }
}

CodeBlock.defaultProps = {
  language: null,
};

CodeBlock.propTypes = {
  value: PropTypes.string.isRequired,
  language: PropTypes.string,
};
