import React from 'react';
import stylesheet from './Footer.css';
import SocialIcon from '../SocialIcon/SocialIcon';

const footerNav = [
  {
    url: '/about',
    text: 'About',
  },
  {
    url: '/imprint',
    text: 'Imprint',
  },
];

const Footer = () => [
  <style dangerouslySetInnerHTML={{ __html: stylesheet }} />,
  <footer className="Footer">
    <div className="Footer-content u-maxWidth u-widthPadding">
      <div className="Footer-socialIcons">
        <div className="Footer-wrapSocialIcon">
          <SocialIcon name="Twitter" href="https://twitter.com/schoenwaldnils" />
        </div>
        <div className="Footer-wrapSocialIcon">
          <SocialIcon name="Github" href="https://github.com/schoenwaldnils" />
        </div>
      </div>
      <nav className="Footer-nav Footer-text">
        {footerNav.map(item => (
          <a className="Footer-navItem" href={item.url} title={item.text} key={item.text}>{item.text}</a>
        ))}
      </nav>
      <div className="Footer-copy Footer-text">
        © {(new Date()).getFullYear()} Nils Schönwald
      </div>
    </div>
  </footer>,
];

export default Footer;
