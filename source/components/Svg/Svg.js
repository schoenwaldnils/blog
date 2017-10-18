import React from 'react';
import PropTypes from 'prop-types';

import SchoenwaldLogo from './svgs/schoenwald-logo.svg';
import Twitter from './svgs/twitter.svg';
import GitHub from './svgs/github.svg';

const Svg = ({ name }) => {
  switch (name) {
    case 'schoenwald-logo':
      return <SchoenwaldLogo className="Svg Svg--schoenwaldLogo" />;
    case 'twitter':
      return <Twitter className="Svg Svg--twitter" />;
    case 'github':
      return <GitHub className="Svg Svg--github" />;
    default:
      return null;
  }
};

Svg.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Svg;
