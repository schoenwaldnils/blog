import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

const Meta = ({ title, description, image }) => {
  const alteredImage = image.includes('contentful') ? `${image}?w=200&h=200&fit=fill` : image;
  return (
    <Head>
      <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
      <meta content="width=device-width,initial-scale=1" name="viewport" />
      <title>{ title }</title>
      <meta property="og:title" content={title} />
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Schönwald" />
      <meta property="og:image" content={alteredImage} />
      <meta name="theme-color" content="#ba3e48" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@schoenwaldnils" />
      <meta name="twitter:creator" content="@schoenwaldnils" />
    </Head>
  );
};

Meta.defaultProps = {
  title: 'Schönwald',
  description: 'Thoughts on CSS, JS, and overall clean code.',
  image: '/static/assets/images/icon-on-black.png',
};

Meta.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};

export default Meta;
