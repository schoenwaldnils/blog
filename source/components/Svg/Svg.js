import React from 'react';
import PropTypes from 'prop-types';

import SmediaIconOld from './svgs/smedia-icon-old.svg';
import SmediaIcon from './svgs/smedia-icon.svg';
import SmediaLogo from './svgs/smedia-logo-white.svg';
import Twitter from './svgs/twitter.svg';
import GitHub from './svgs/github.svg';

const Svg = ({ name }) => {
  switch (name) {
    case 'twitter':
      return <Twitter className="Svg Svg--twitter" />;
    case 'github':
      return <GitHub className="Svg Svg--github" />;
    case 'smedia-icon-old':
      return <SmediaIconOld className="Svg Svg--smediaIconOld" />;
    case 'smedia-icon':
      return <SmediaIcon className="Svg Svg--smediaIcon" />;
    case 'smedia-logo-white':
      return <SmediaLogo className="Svg Svg--smediaLogo" />;
    default:
      return null;
  }
};

Svg.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Svg;
