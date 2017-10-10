import React from 'react';
import PropTypes from 'prop-types';
import Post from '../source/components/Post/Post';

const Page = ({ url }) => {
  const summary = url.query.summary.fileMap;
  const tag = url.query.tag;
  return (
    <div className="Page">
      {Object.keys(summary).map((post) => {
        const postData = summary[post];
        if (postData.type === 'post' && postData.tags.includes(tag)) {
          return (<Post
            url={`/${postData.base.replace('.json', '')}`}
            title={postData.title}
            date={postData.date}
            tags={postData.tags}
            description={postData.description}
            key={postData.base} />);
        }
        return false;
      })}
    </div>
  );
};

Page.propTypes = {
  url: PropTypes.object.isRequired,
};

export default Page;
