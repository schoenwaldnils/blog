import React from 'react';
import PropTypes from 'prop-types';
import './TeaserList.css';

const TeaserList = ({ children }) => (
  <div className="TeaserList" key="TeaserList-div">
    {children}
  </div>
);

TeaserList.propTypes = {
  children: PropTypes.any.isRequired,
};

export default TeaserList;
