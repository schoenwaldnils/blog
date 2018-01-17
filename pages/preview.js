import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import Meta from '../source/components/Meta/Meta';
import Header from '../source/components/Header/Header';
import Post from '../source/components/Post/Post';
// import Button from '../source/components/Button/Button';

const Page = (props) => {
  const { url } = props;
  const fields = props.fields || {};
  const params = qs.parse(url.asPath.replace(/.*\?/g, ''));

  Object.keys(params).map((param) => {
    if (param === 'image') {
      fields[param] = params[param];
    } else {
      fields[param] = params[param];
    }
    return true;
  });

  console.log(fields);

  return [
    <Meta
      url={`https://schoenwald.media/${fields.slug}/`}
      type="article"
      title={fields.title}
      description={fields.description}
      image={fields.image ? fields.image.url : undefined}
      key="page-meta" />,
    <Header className="Header--post" key="page-header" />,
    <Post
      {...fields}
      key="page-post" />,
  ];
};

Page.getInitialProps = async () => {
  return {
    fields: {
    },
  };
};

Page.propTypes = {
  fields: PropTypes.object.isRequired,
};

export default Page;
