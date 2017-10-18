import React from 'react';
import stylesheet from './Header.css';
import Svg from '../Svg/Svg';
import SocialIcon from '../SocialIcon/SocialIcon';

const Header = () => [
  <style dangerouslySetInnerHTML={{ __html: stylesheet }} />,
  <header className="Header">
    <div className="Header-content u-maxWidth">

      <a className="Header-logo" href="/">
        <Svg name="schoenwald-logo" />
      </a>

      <div className="Header-socialIcons">
        <div className="Header-wrapSocialIcon">
          <SocialIcon name="Twitter" href="https://twitter.com/schoenwaldnils" />
        </div>
        <div className="Header-wrapSocialIcon">
          <SocialIcon name="GitHub" href="https://github.com/schoenwaldnils" />
        </div>
      </div>

    </div>
  </header>,
];

export default Header;
