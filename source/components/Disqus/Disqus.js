import React from 'react';
import PropTypes from 'prop-types';
import stylesheet from './Disqus.css';

const Disqus = ({ title, siteUrl, pageUrl }) => {
  function disqus_config() {
    this.page.title = title;
    this.page.url = `${siteUrl}${pageUrl}`;
    this.page.identifier = `${siteUrl}${pageUrl}`;
  }
  return [
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />,
    <div className="Disqus u-whiteBox u-boxPadding" id="disqus_thread" />,
    <script src="//schoenwaldmedia.disqus.com/embed.js" data-timestamp={new Date()} />,
    <noscript>
      Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
    </noscript>,
  ];
};

Disqus.defaultProps = {
  siteUrl: 'http://schoenwald.media',
};

Disqus.propTypes = {
  title: PropTypes.string.isRequired,
  siteUrl: PropTypes.string,
  pageUrl: PropTypes.string.isRequired,
};

export default Disqus;
