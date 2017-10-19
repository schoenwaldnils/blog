import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import marked from 'marked';
import highlightJs from 'highlight.js';
import { getFields } from '../scripts/contentful';
import Post from '../source/components/Post/Post';
import Disqus from '../source/components/Disqus/Disqus';

marked.setOptions({
  langPrefix: 'hljs ',
  highlight: (code, language) => {
    return highlightJs.highlight(language, code).value;
  },
});

const Page = ({ fields }) => [
  <Head>
    <title>{fields.title}</title>
    <meta name="description" content={fields.description} />
  </Head>,
  <Post
    {...fields}
    description={null} />,
  <Disqus title={fields.title} pageUrl={fields.url} />,
];

Page.getInitialProps = async ({ query }) => {
  const fields = await getFields(query.id);
  return {
    fields: {
      title: fields.title,
      url: `/${fields.slug}`,
      image: fields.image ? {
        url: fields.image.fields.file.url,
        alt: fields.image.fields.title,
      } : null,
      description: fields.description,
      date: fields.date || null,
      tags: fields.tags || null,
      content: marked(fields.content),
    },
  };
};

Page.propTypes = {
  fields: PropTypes.object.isRequired,
};

export default Page;
