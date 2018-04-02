import React from 'react';
import PropTypes from 'prop-types';
import './Content.css';

const Content = ({ children }) => (
  <section className="Content" role="main">
    {children}
  </section>
);

Content.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Content;
