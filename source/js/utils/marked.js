import React from 'react';
import { renderToString } from 'react-dom/server';
import { decodeHTML } from 'entities';
import marked from 'marked';
import highlightJs from 'highlight.js';
import queryString from 'query-string';
import Picture from '../../../source/components/Picture/Picture';

marked.setOptions({
  langPrefix: 'hljs ',
  highlight: (code, lang) => {
    return highlightJs.highlight(lang, code).value;
  },
});

const renderer = new marked.Renderer();

renderer.image = (href, title, text) => {
  const src = decodeHTML(href).split(/[?|#]/);
  const params = src[1] && queryString.parse(src[1]);
  const options = src[2] && queryString.parse(src[2]);
  return renderToString(<Picture
    imageSrc={src[0]}
    imageAlt={text}
    title={title}
    width={params.w && parseInt(params.w, 10)}
    float={options.float} />);
}; // https://github.com/zeit/next.js/issues/3711#issuecomment-363855132

export default function (content) {
  return marked(content, { renderer });
}
