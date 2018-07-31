import React from 'react';
import Parser from 'html-react-parser';
import faviconData from '../../../faviconData.json';

const faviconHtml = faviconData && faviconData.favicon.html_code;
const Favicons = () => Parser(faviconHtml, {
  replace(domNode) {
    if (domNode.attribs && domNode.attribs.rel === 'manifest') {
      return <link rel="manifest" href="/static/site.webmanifest" />;
    }
    // TODO: fix for https://sonarwhal.com/docs/user-guide/rules/apple-touch-icons/
    if (domNode.attribs && domNode.attribs.rel === 'apple-touch-icon') {
      return <link rel="apple-touch-icon" href="/static/assets/images/favicons/apple-touch-icon.png?v=1" />;
    }
  },
});

export default Favicons;
