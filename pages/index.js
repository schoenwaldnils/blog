import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
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
  return {
    posts,
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
