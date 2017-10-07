import React from 'react';
import PropTypes from 'prop-types';
import stylesheet from './SocialIcon.css';
import Svg from '../Svg/Svg';

const SocialIcon = ({ name, href }) => {
  const lowerCaseName = name.toLowerCase();
  return (
    <a className={`SocialIcon SocialIcon--${lowerCaseName}`} href={href} target="_blank" title={`Show ${name}-profile`} rel="noopener">
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      <span className="SocialIcon-iconFront">
        <Svg name={lowerCaseName} />
      </span>
      <span className="SocialIcon-iconBack">
        <Svg name={lowerCaseName} />
      </span>
    </a>
  );
};

SocialIcon.propTypes = {
  name: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export default SocialIcon;
