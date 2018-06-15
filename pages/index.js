import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { getFields } from '../scripts/contentful';
import Meta from '../source/components/Meta/Meta';
import LayoutBase from '../source/components/Layout/LayoutBase';
import Post from '../source/components/Post/Post';
import Filter from '../source/components/Filter/Filter';

const Page = ({ posts, tags, activeTag }) => (
  <Fragment>
    <Meta url={activeTag ? `https://schoenwald.media/${activeTag}/` : undefined} />
    <LayoutBase>
      {tags && <Filter activeTag={activeTag} tags={tags} />}
      <div className="Page">
        {posts.map(post => (<Post {...post} key={post.slug} />))}
      </div>
    </LayoutBase>
  </Fragment>
);

Page.getInitialProps = async ({ query: { posts, tag, tags } }) => {
  const handeledPosts = [];
  await Promise.all(posts.map(async (post) => {
    try {
      const postFields = await getFields(post.id);

      if (postFields.image) delete postFields.image;
      if (postFields.content) delete postFields.content;
      postFields.url = post.url;

      handeledPosts.push(postFields);
      return;
    } catch (error) {
      throw error;
    }
  })).catch(err => console.error(err));

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
