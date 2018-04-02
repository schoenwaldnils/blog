import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { getFields } from '../scripts/contentful';
import Meta from '../source/components/Meta/Meta';
import Header from '../source/components/Header/Header';
import Filter from '../source/components/Filter/Filter';
import TeaserList from '../source/components/TeaserList/TeaserList';
import Teaser from '../source/components/Teaser/Teaser';

const Page = ({ posts, tags, activeTag }) => {
  return (
    <Fragment>
      <Meta
        url={activeTag ? `https://schoenwald.media/${activeTag}/` : undefined}
        key="page-meta" />,
      <Header className="Header--postList" key="index-header" />,
      <Filter activeTag={activeTag} tags={tags} key="index-filter" />,
      <TeaserList key="index-page">
        {posts.map(post => (<Teaser {...post} key={post.slug} />))}
      </TeaserList>,
    </Fragment>
  );
};

Page.getInitialProps = async ({ query }) => {
  const posts = await Promise.all(query.posts.map(async (post) => {
    const postFields = await getFields(post.id);
    if (postFields.content) delete postFields.content;
    postFields.url = post.url;
    const altImage = {
      url: postFields.image.fields.file.url,
      alt: postFields.image.fields.title,
    };
    delete postFields.image;
    postFields.image = altImage;

    return postFields;
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
