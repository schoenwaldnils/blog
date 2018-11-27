import React from 'react';
import { renderToString } from 'react-dom/server';
import he from 'he';
import marked from 'marked';
import { highlight } from 'highlight.js';
import qs from 'qs';

import Picture from '../../../source/components/Picture/Picture';

marked.setOptions({
  langPrefix: 'hljs ',
  highlight: (code, lang) => {
    return highlight(lang, code).value;
  },
  headerIds: false,
});

const renderer = new marked.Renderer();

renderer.image = (href, title, text) => {
  const [imgSrc, paramsQuery, optionsQuery] = he.decode(href).split(/[?|#]/);
  const params = paramsQuery && qs.parse(paramsQuery);
  const options = optionsQuery && qs.parse(optionsQuery);
  // Be extra ceareful to check for calls on undefined, they will break the build
  const width = params && params.w && parseInt(params.w, 10);
  const float = options && options.float;

  return renderToString(<Picture
    imageSrc={imgSrc}
    imageAlt={text}
    title={title}
    width={width}
    float={float} />);
}; // https://github.com/zeit/next.js/issues/3711#issuecomment-363855132

export default function (content) {
  return marked(content, { renderer });
}
