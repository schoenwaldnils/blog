import React from 'react';
import stylesheet from './Footer.css';
import SocialIcon from '../SocialIcon/SocialIcon';

const Footer = () => (
  <footer className="Footer">
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <div className="Footer-content u-maxWidth">
      <div className="Footer-socialIcons">
        <div className="Footer-wrapSocialIcon">
          <SocialIcon name="Twitter" href="https://twitter.com/schoenwaldnils" />
        </div>
        <div className="Footer-wrapSocialIcon">
          <SocialIcon name="GitHub" href="https://github.com/schoenwaldnils" />
        </div>
      </div>
      <div className="Footer-copy">
        © {(new Date()).getFullYear()} Nils Schönwald – <a href="/imprint/" title="Imprint">Imprint</a>
      </div>
    </div>
  </footer>
);

export default Footer;
