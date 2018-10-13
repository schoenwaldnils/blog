import React from 'react';
import { renderToString } from 'react-dom/server';
import { decode } from 'he';
import marked from 'marked';
import highlightJs from 'highlight.js';
import qs from 'qs';
import Picture from '../../../source/components/Picture/Picture';

marked.setOptions({
  langPrefix: 'hljs ',
  highlight: (code, language) => {
    return highlightJs.highlight(language, code).value;
  },
  headerIds: false,
});

const renderer = new marked.Renderer();

renderer.image = (href, title, text) => {
  const src = decode(href).split(/[?|#]/);
  const params = src[1] && qs.parse(src[1]);
  const options = src[2] && qs.parse(src[2]);
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
