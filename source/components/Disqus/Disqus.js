import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './Disqus.css';

const Disqus = ({
  type, title, siteUrl, pageUrl,
}) => {
  if (type !== 'post') return null;
  return (
    <Fragment>
      <script dangerouslySetInnerHTML={{
        __html: `
          function disqus_config() {
            this.page.title = '${title}';
            this.page.url = '${siteUrl}${pageUrl}';
            this.page.identifier = '${pageUrl}';
          }`,
      }} />,
      <script defer src="//schoenwaldmedia.disqus.com/embed.js" data-timestamp={new Date()} />
      <div className="Disqus u-whiteBox u-boxPadding" id="disqus_thread" />
    </Fragment>
  );
};

Disqus.defaultProps = {
  siteUrl: '//schoenwald.media/',
};

Disqus.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  siteUrl: PropTypes.string,
  pageUrl: PropTypes.string.isRequired,
};

export default Disqus;
