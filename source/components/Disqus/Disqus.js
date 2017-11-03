import React from 'react';
import PropTypes from 'prop-types';
import stylesheet from './Disqus.css';

const Disqus = ({
  type, title, siteUrl, pageUrl,
}) => {
  if (type !== 'post') return null;
  return [
    <script dangerouslySetInnerHTML={{
      __html: `
        function disqus_config() {
          this.page.title = '${title}';
          this.page.url = '${siteUrl}${pageUrl}';
          this.page.identifier = '${pageUrl}';
        }`,
    }} />,
    <script defer src="//schoenwaldmedia.disqus.com/embed.js" data-timestamp={new Date()} />,
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} key="disqus-style" />,
    <div className="Disqus u-whiteBox u-boxPadding" id="disqus_thread" key="disqus-body" />,
  ];
};

Disqus.defaultProps = {
  siteUrl: 'http://schoenwald.media/',
};

Disqus.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  siteUrl: PropTypes.string,
  pageUrl: PropTypes.string.isRequired,
};

export default Disqus;
