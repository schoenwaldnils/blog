import React from 'react';
import { renderToString } from 'react-dom/server';
import PropTypes from 'prop-types';
import Head from 'next/head';
import marked from 'marked';
import highlightJs from 'highlight.js';
import queryString from 'query-string';
import { decodeHTML } from 'entities';
import { getFields } from '../scripts/contentful';
import Post from '../source/components/Post/Post';
import Disqus from '../source/components/Disqus/Disqus';
import Picture from '../source/components/Picture/Picture';

marked.setOptions({
  langPrefix: 'hljs ',
  highlight: (code, language) => {
    return highlightJs.highlight(language, code).value;
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
    align={options.align} />);
};


const Page = ({ type, fields }) => [
  <Head key="page-head">
    <title>{fields.title}</title>
    <meta name="description" content={fields.description} />
  </Head>,
  <Post
    {...fields}
    description={null}
    key="page-post" />,
  <Disqus type={type} title={fields.title} pageUrl={fields.slug} key="page-disqus" />,
];

Page.getInitialProps = async ({ query }) => {
  const fields = await getFields(query.id);
  return {
    type: query.type,
    fields: {
      title: fields.title,
      slug: fields.slug,
      url: `/${fields.slug}`,
      image: fields.image ? {
        url: fields.image.fields.file.url,
        alt: fields.image.fields.title,
      } : null,
      description: fields.description,
      date: fields.date || null,
      tags: fields.tags || null,
      content: marked(fields.content, { renderer }),
    },
  };
};

Page.propTypes = {
  type: PropTypes.string.isRequired,
  fields: PropTypes.object.isRequired,
};

export default Page;
