import React from 'react';
import PropTypes from 'prop-types';
import stylesheet from './Content.css';

const Content = ({ children }) => [
  <style dangerouslySetInnerHTML={{ __html: stylesheet }} />,
  <section className="Content" role="main">
    <div className="u-maxWidth">
      <div className="Content-box">
        {children}
      </div>
    </div>
  </section>,
];

Content.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Content;
