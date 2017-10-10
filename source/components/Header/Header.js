import React from 'react';
import Link from 'next/link';
import stylesheet from './Header.css';
import Svg from '../Svg/Svg';
import Nav from '../Nav/Nav';
import SocialIcon from '../SocialIcon/SocialIcon';

const Header = () => (
  <header className="Header">
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <div className="Header-content u-maxWidth">

      <Link href="/" prefetch>
        <a className="Header-logo">
          <Svg name="smedia-icon-old" />
        </a>
      </Link>

      <div className="Header-wrapNav">
        <Nav />
      </div>

      <div className="Header-socialIcons">
        <div className="Header-wrapSocialIcon">
          <SocialIcon name="Twitter" href="https://twitter.com/schoenwaldnils" />
        </div>
        <div className="Header-wrapSocialIcon">
          <SocialIcon name="GitHub" href="https://github.com/schoenwaldnils" />
        </div>
      </div>

    </div>
  </header>
);

export default Header;
