import React from 'react';
import PropTypes from 'prop-types';
import stylesheet from './Content.css';

const Content = ({ content }) => [
  <style dangerouslySetInnerHTML={{ __html: stylesheet }} />,
  <section className="Content" role="main">
    <div className="u-maxWidth">
      <div className="Content-box">
        {content}
      </div>
    </div>
  </section>,
];

Content.propTypes = {
  content: PropTypes.object.isRequired,
};

export default Content;
