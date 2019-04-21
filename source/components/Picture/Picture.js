import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import viewports from '../../js/viewports.json';

const getParams = (width, height = false, retina = false) => {
  const retinaFactor = 1.5;
  const params = {
    fm: 'jpg', // format
    q: retina ? 50 : 60, // quality
    fl: 'progressive',
  };

  if (width) {
    params.w = retina ? Math.floor(width * retinaFactor) : width;
  }

  if (height) {
    params.h = retina ? Math.floor(width * retinaFactor) : width;
    params.fit = 'fill';
  }

  const string = qs.stringify(params, { skipNulls: true });

  return string;
};

const pictureViewports = {
  lg: 768,
  md: 620,
  sm: 480,
};

const Picture = (props) => {
  const {
    className,
    imageSrc,
    imageAlt,
    title,
    width,
    height,
    float,
    color,
  } = props;

  const viewportKeys = Object.keys(viewports).reverse();
  const maxWidth = width || 1366;

  const ratio = height && height / width;

  let css = {};

  if (float) {
    css = {
      float,
      marginRight: float === 'left' && '8px',
      marginBottom: '8px',
      marginLeft: float === 'right' && '8px',
    };
  }

  if (width) {
    css.width = `${width}px`;
  }

  if (color) {
    css.backgroundColor = color;
  }

  return (
    <picture>
      { width < pictureViewports.sm && (
      <source
        srcSet={`
        ${imageSrc}?${getParams(width, height)} 1x,
        ${imageSrc}?${getParams(width, height, true)} 2x
        `}
        key={width} />
      ) }

      { maxWidth >= pictureViewports.sm && viewportKeys.map((identifier, key) => {
        const currentViewport = viewports[identifier];
        const nextViewport = viewportKeys[key - 1] || null;
        const imageSize = viewports[nextViewport] || maxWidth;

        if (currentViewport >= maxWidth) return null;
        return (
          <source
            srcSet={`
            ${imageSrc}?${getParams(imageSize, Math.round(imageSize * ratio))} 1x,
            ${imageSrc}?${getParams(imageSize, Math.round(imageSize * ratio), true)} 2x
            `}
            media={viewports[identifier]}
            key={imageSize + maxWidth} />
        );
      }) }

      <source
        srcSet={`
        ${imageSrc}?${getParams(320, Math.round(320 * ratio))} 1x,
        ${imageSrc}?${getParams(320, Math.round(320 * ratio), true)} 2x
        `} />

      <img
        className={className}
        style={css}
        src={`${imageSrc}?${getParams(320, null)}`}
        alt={imageAlt}
        title={title}
        key="img" />
    </picture>
  );
};

Picture.defaultProps = {
  className: undefined,
  title: undefined,
  width: undefined,
  height: undefined,
  color: undefined,
  float: undefined,
};

Picture.propTypes = {
  className: PropTypes.string,
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  title: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  float: PropTypes.oneOf([
    'left',
    'right',
  ]),
};

export default Picture;
