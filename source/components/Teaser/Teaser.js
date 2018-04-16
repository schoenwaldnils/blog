import React from 'react';
import PropTypes from 'prop-types';
import Picture from '../Picture/Picture';
import './Teaser.css';

const Teaser = (props) => {
  const {
    url,
    image,
    title,
    description,
    tags,
  } = props;

  return (
    <article className="Teaser" key="Teaser-article" data-tags={tags}>
      {/* content: url('https://chart.googleapis.com/chart?cht=qr&chs=80x80&chld=L|0&chl={{ site.url }}{{ include.url }}&choe=UTF-8'); */}
      <a className="Teaser-link" href={url}>
        {image &&
        <div className="Teaser-wrapImage">
          <Picture className="Teaser-image" imageSrc={image.url} imageAlt={image.alt} width={450} height={232} />
        </div>}

        <div className="Teaser-content">
          <h1 className="Teaser-title" key="Teaser-title">{title}</h1>
          {description &&
          <div className="Teaser-description">
            {description}
          </div>}
        </div>
      </a>
    </article>
  );
};

Teaser.defaultProps = {
  image: null,
  description: null,
  tags: [],
};

Teaser.propTypes = {
  url: PropTypes.string.isRequired,
  image: PropTypes.object,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  tags: PropTypes.array,
};

export default Teaser;
