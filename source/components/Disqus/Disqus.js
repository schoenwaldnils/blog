import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './Disqus.css';

const Disqus = ({ title, siteUrl, pageUrl }) => (
  <Fragment>
    <script dangerouslySetInnerHTML={{
      __html: `
        function disqus_config() {
          this.page.title = '${title}';
          this.page.url = '${siteUrl}${pageUrl}';
          this.page.identifier = '${pageUrl}';
        }`,
    }} />
    {(typeof window !== 'undefined') &&
      <script defer src="//schoenwaldmedia.disqus.com/embed.js" data-timestamp={new Date()} />
    }
    <div className="Disqus u-boxPadding u-maxWidth" id="disqus_thread" key="disqus-body" />
  </Fragment>
);

Disqus.defaultProps = {
  siteUrl: '//schoenwald.media/',
};

Disqus.propTypes = {
  title: PropTypes.string.isRequired,
  siteUrl: PropTypes.string,
  pageUrl: PropTypes.string.isRequired,
};

export default Disqus;
