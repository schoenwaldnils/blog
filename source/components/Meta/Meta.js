import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Favicons from '../Favicons/Favicons';

const Meta = ({
  url, type, title, description, image,
}) => {
  const alteredImage = image.includes('contentful') ? `https:${image}?w=200&h=200&fit=fill` : image;
  return (
    <Head>
      <meta content="width=device-width,initial-scale=1" name="viewport" />

      <title>{ title }</title>
      <meta name="description" content={description} />

      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Schönwald" />
      <meta property="og:image" content={alteredImage} />
      <meta property="og:image:width" content="200" />
      <meta property="og:image:height" content="200" />

      <meta property="fb:app_id" content="481527111909443" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@schoenwaldnils" />
      <meta name="twitter:creator" content="@schoenwaldnils" />

      <Favicons />
    </Head>
  );
};

Meta.defaultProps = {
  url: 'https://schoenwald.media',
  type: 'website',
  title: 'Schönwald',
  description: 'Thoughts on CSS, JS, and overall clean code.',
  image: 'https://schoenwald.media/static/assets/images/icon-on-black.png',
};

Meta.propTypes = {
  url: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};

export default Meta;
