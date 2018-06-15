import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { getFields } from '../scripts/contentful';

import '../source/css/index.css';

import Meta from '../source/components/Meta/Meta';
import { TeaserList, TeaserListChild } from '../source/components/TeaserList/TeaserList';
import Post from '../source/components/Post/Post';
import Layout from '../source/components/Layout/Layout';

const Page = ({ posts, tags, activeTag }) => {
  return (
    <Fragment>
      <Meta url={activeTag ? `https://schoenwald.media/${activeTag}/` : undefined} />
      <Layout type="postList" {...{ tags, activeTag }}>
        <TeaserList>
          {posts.map(post => (
            <TeaserListChild href={post.url} key={post.slug}>
              <Post {...post} type="list" />
            </TeaserListChild>
          ))}
        </TeaserList>
      </Layout>
    </Fragment>
  );
};

Page.getInitialProps = async ({ query: { posts, tag, tags } }) => {
  const handeledPosts = await Promise.all(posts.map(async (post) => {
    const postFields = await getFields(post.id);
    if (postFields.content) delete postFields.content;
    if (postFields.tags) delete postFields.tags;
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
    posts: handeledPosts,
    activeTag: tag || undefined,
    tags: tags || undefined,
  };
};

Page.defaultProps = {
  activeTag: undefined,
  tags: undefined,
};

Page.propTypes = {
  posts: PropTypes.array.isRequired,
  activeTag: PropTypes.string,
  tags: PropTypes.array,
};

export default Page;
