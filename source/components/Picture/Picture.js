import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import qs from 'qs';
import { viewports, viewportsJs } from '../../js/viewports';

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

const Picture = (props) => {
  const {
    className,
    imageSrc,
    imageAlt,
    title,
    width,
    height,
  } = props;

  const viewportKeys = Object.keys(viewports).reverse();
  const maxWidth = width || 1366;

  const ratio = height && height / width;

  return (
    <picture>
      {width < viewports.sm && <source
        srcSet={`
        ${imageSrc}?${getParams(width, height)} 1x,
        ${imageSrc}?${getParams(width, height, true)} 2x
        `}
        key={width} />
      }

      {maxWidth >= viewports.sm && viewportKeys.map((identifier, key) => {
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
            media={viewportsJs[identifier]}
            key={imageSize + maxWidth} />
        );
      })}

      <img
        className={className}
        src={`${imageSrc}?${getParams(null, null)}`}
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
  color: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  float: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
};

export default styled(Picture)`
  float: ${props => props.float};
  width: ${props => props.width && `${props.width}px`};
  margin-right: ${props => props.float === 'left' && '8px'};
  margin-bottom: ${props => props.float && '8px'};
  margin-left: ${props => props.float === 'right' && '8px'};
  background-color: ${props => props.color};
`;
