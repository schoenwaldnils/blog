import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { getFields } from '../scripts/contentful';
import Meta from '../source/components/Meta/Meta';
import Header from '../source/components/Header/Header';
import Post from '../source/components/Post/Post';
// import Button from '../source/components/Button/Button';
import Disqus from '../source/components/Disqus/Disqus';

const Page = (props) => {
  console.log(props);
  const { type, fields } = props;
  return (
    <Fragment>
      {/* <a className="page-edit" href={`/edit?type=${type}&id=${fields.id}`} key="page-edit">
        <Button>Edit</Button>
      </a> */}
      <Meta
        url={`https://schoenwald.media/${fields.slug}/`}
        type="article"
        title={fields.title}
        description={fields.description}
        image={fields.image ? fields.image.url : undefined}
        key="page-meta" />,
      <Header className="Header--post" key="page-header" />
      <Post
        {...fields}
        key="page-post" />
      <Disqus type={type} title={fields.title} pageUrl={fields.slug} key="page-disqus" />
    </Fragment>
  );
};

Page.getInitialProps = async ({ query }) => {
  const fields = await getFields(query.id);
  return {
    type: query.type,
    fields: {
      id: query.id,
      title: fields.title,
      slug: fields.slug,
      image: fields.image ? {
        color: fields.image.fields.file.details.color || null,
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
