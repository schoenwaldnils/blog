import React from 'react';
import stylesheet from './Header.css';
import SocialIcon from '../SocialIcon/SocialIcon';
import SchoenwaldLogo from '../Svg/svgs/schoenwald-logo.svg';


const Header = () => [
  <style dangerouslySetInnerHTML={{ __html: stylesheet }} />,
  <header className="Header">
    <div className="Header-content u-maxWidth u-widthPadding">

      <a className="Header-logo" href="/">
        <SchoenwaldLogo className="Svg" />
      </a>

      <div className="Header-socialIcons">
        <div className="Header-wrapSocialIcon">
          <SocialIcon name="Twitter" href="https://twitter.com/schoenwaldnils" />
        </div>
        <div className="Header-wrapSocialIcon">
          <SocialIcon name="Github" href="https://github.com/schoenwaldnils" />
        </div>
      </div>

    </div>
  </header>,
];

export default Header;
