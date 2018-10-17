import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Meta from '../source/components/Meta/Meta';
import LayoutBase from '../source/components/Layout/LayoutBase';
import Post from '../source/components/Post/Post';
// import Button from '../source/components/Button/Button';
import Disqus from '../source/components/Disqus/Disqus';

const Page = ({ type, fields }) => (
  <Fragment>
    {/* <a className="page-edit" href={`/edit?type=${type}&id=${fields.id}`}>
      <Button>Edit</Button>
    </a> */}
    <Meta
      url={`https://schoenwald.media/${fields.slug}/`}
      type="article"
      title={fields.title}
      description={fields.description}
      image={fields.image ? fields.image.url : undefined}
      key="page-meta" />
    <LayoutBase>
      <Post {...fields} description={null} />
      { type === 'post' && <Disqus title={fields.title} pageUrl={fields.slug} />}
    </LayoutBase>
  </Fragment>
);

Page.getInitialProps = ({ query }) => query;

Page.propTypes = {
  type: PropTypes.string.isRequired,
  fields: PropTypes.object.isRequired,
};

export default Page;
