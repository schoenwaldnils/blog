import React from 'react';
import PropTypes from 'prop-types';
import Post from '../source/components/Post/Post';

const Page = ({ url }) => {
  const summary = url.query.summary.fileMap;
  console.log(url.query);
  return (
    <div className="Page">
      {Object.keys(summary).map((post) => {
        const postData = summary[post];
        if (postData.type === 'post') {
          return (<Post
            url={postData.url}
            title={postData.title}
            date={postData.date}
            tags={postData.tags}
            description={postData.description} />);
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
