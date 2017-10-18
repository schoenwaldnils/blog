import React from 'react';
import PropTypes from 'prop-types';
import { getFields } from '../scripts/contentful';
import Post from '../source/components/Post/Post';
import Filter from '../source/components/Filter/Filter';

const Page = ({ posts, tags, activeTag }) => {
  return [
    <Filter activeTag={activeTag} tags={tags} />,
    <div className="Page">
      {posts.map(post => (<Post {...post} key={post.slug} />))}
    </div>,
  ];
};

Page.getInitialProps = async ({ query }) => {
  const posts = await Promise.all(query.posts.map(async (post) => {
    const postFields = await getFields(post.id);
    if (postFields.image) delete postFields.image;
    if (postFields.content) delete postFields.content;
    postFields.url = post.url;
    return postFields;
  }));

  return {
    posts,
    tags: query.tags || null,
    activeTag: query.tag || null,
  };
};

Page.propTypes = {
  posts: PropTypes.array.isRequired,
  tags: PropTypes.array,
  activeTag: PropTypes.string,
};

export default Page;
