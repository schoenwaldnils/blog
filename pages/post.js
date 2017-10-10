import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Post from '../source/components/Post/Post';

const Page = ({ url }) => {
  const postData = url.query.postData;
  if (postData) {
    return (
      <div>
        <Head>
          <title>{postData.title}</title>
          <meta name="description" content={postData.description} />
        </Head>
        <Post
          url={url.query.post}
          image={postData.image}
          title={postData.title}
          date={postData.date}
          tags={postData.tags}
          content={postData.bodyHtml} />
      </div>
    );
  }

  return (<div>
    hello
  </div>);
};

Page.propTypes = {
  url: PropTypes.object.isRequired,
};

export default Page;
