import React from 'react';
import PropTypes from 'prop-types';
import { getFields } from '../scripts/contentful';
import Meta from '../source/components/Meta/Meta';
import Post from '../source/components/Post/Post';
import Disqus from '../source/components/Disqus/Disqus';

const Page = ({ type, fields }) => [
  <a href={`/edit?type=${type}&id=${fields.id}`} key="page-edit">Edit</a>,
  <Meta
    url={`http://schoenwald.media/${fields.slug}/`}
    type="article"
    title={fields.title}
    description={fields.description}
    image={fields.image ? fields.image.url : undefined}
    key="page-meta" />,
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
      id: query.id,
      title: fields.title,
      slug: fields.slug,
      image: fields.image ? {
        url: fields.image.fields.file.url,
        alt: fields.image.fields.title,
      } : null,
      description: fields.description,
      date: fields.date || null,
      tags: fields.tags || null,
      content: fields.content,
    },
  };
};

Page.propTypes = {
  type: PropTypes.string.isRequired,
  fields: PropTypes.object.isRequired,
};

export default Page;
