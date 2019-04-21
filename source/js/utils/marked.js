import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import ReactMarkdown from 'react-markdown';
import htmlParser from 'react-markdown/plugins/html-parser';

import Picture from '../../components/Picture/Picture';
import CodeBlock from '../../components/CodeBlock/CodeBlock';


// See https://github.com/aknuds1/html-to-react#with-custom-processing-instructions
// for more info on the processing instructions
const parseHtml = htmlParser({
  isValidNode: node => node.type !== 'script',
});

class PictureOverride extends PureComponent {
  render() {
    const { src, alt } = this.props;
    const [imgSrc, paramsQuery, optionsQuery] = decodeURI(src).split(/[?|#]/);
    const params = paramsQuery && qs.parse(paramsQuery);
    const options = optionsQuery && qs.parse(optionsQuery);
    // Be extra ceareful to check for calls on undefined, they will break the build
    const width = params && params.w && parseInt(params.w, 10);
    const float = options && options.float;

    return (
      <Picture
        imageSrc={imgSrc}
        imageAlt={alt}
        width={width}
        float={float} />
    );
  }
}

PictureOverride.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default function (content) {
  const renderers = {
    image: PictureOverride,
    imageReference: PictureOverride,
    code: CodeBlock,
  };

  return (
    <ReactMarkdown
      renderers={renderers}
      source={content}
      escapeHtml={false}
      astPlugins={[parseHtml]} />
  );
}
