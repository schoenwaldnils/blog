import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { getFields } from '../scripts/contentful';

import '../source/css/index.css';

import Meta from '../source/components/Meta/Meta';
import { TeaserList, TeaserListChild } from '../source/components/TeaserList/TeaserList';
import Teaser from '../source/components/Teaser/Teaser';
import Layout from '../source/components/Layout/Layout';

const Page = ({ posts, tags, activeTag }) => {
  return (
    <Fragment>
      <Meta url={activeTag ? `https://schoenwald.media/${activeTag}/` : undefined} />
      <Layout type="postList" {...{ tags, activeTag }}>
        <TeaserList>
          {posts.map(post => (
            <TeaserListChild key={post.slug}>
              <Teaser {...post} />
            </TeaserListChild>
          ))}
        </TeaserList>
      </Layout>
    </Fragment>
  );
};

Page.getInitialProps = async ({ query }) => {
  const posts = await Promise.all(query.posts.map(async (post) => {
    const postFields = await getFields(post.id);
    if (postFields.content) delete postFields.content;
    const altImage = {
      url: postFields.image.fields.file.url,
      alt: postFields.image.fields.title,
    };
    delete postFields.image;
    postFields.image = altImage;

    return {
      ...postFields,
      url: post.url,
    };
  }));

  return {
    posts,
    tags: query.tags || null,
    activeTag: query.tag || null,
  };
};

Page.defaultProps = {
  activeTag: null,
};

Page.propTypes = {
  posts: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  activeTag: PropTypes.string,
};

export default Page;
