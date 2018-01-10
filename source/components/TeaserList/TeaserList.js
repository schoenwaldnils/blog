import React from 'react';
import PropTypes from 'prop-types';
import stylesheet from './TeaserList.css';

const TeaserList = ({ children }) => [
  <style dangerouslySetInnerHTML={{ __html: stylesheet }} key="TeaserList-style" />,
  <div className="TeaserList" key="TeaserList-div">
    {children}
  </div>,
];

TeaserList.propTypes = {
  children: PropTypes.object.isRequired,
};

export default TeaserList;
