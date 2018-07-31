import React from 'react';
import PropTypes from 'prop-types';
import { FaTwitter, FaGithub } from 'react-icons/fa';
import './SocialIcon.css';

const SocialIcon = ({ name, href }) => {
  const lowerCaseName = name && name.toLowerCase();
  let Icon = null;
  switch (name) {
    case 'Twitter':
      Icon = <FaTwitter />;
      break;
    case 'Github':
      Icon = <FaGithub />;
      break;
    default:
  }
  if (!Icon) return null;
  return (
    <a
      className={`SocialIcon SocialIcon--${lowerCaseName}`}
      href={href}
      target="_blank"
      title={`Show ${name}-profile`}
      rel="noopener noreferrer" >
      <span className="SocialIcon-iconFront">
        { Icon }
      </span>
      <span className="SocialIcon-iconBack">
        { Icon }
      </span>
    </a>
  );
};

SocialIcon.propTypes = {
  name: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export default SocialIcon;
