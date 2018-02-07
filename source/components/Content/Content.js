import React from 'react';
import PropTypes from 'prop-types';
import './Content.css';

const Content = ({ children }) => (
  <section className="Content" role="main">
    <div className="Content-box u-maxWidth">
      {children}
    </div>
  </section>
);

Content.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Content;
