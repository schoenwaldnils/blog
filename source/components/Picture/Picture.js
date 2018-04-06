import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { viewports, viewportsJs } from '../../js/viewports';

const getParams = (width, height = false, retina = false) => {
  const paramWidth = width && `w=${retina ? width * 2 : width}`;
  const paramHeight = height && `h=${retina ? height * 2 : height}`;
  const paramCrop = height && 'fit=fill';
  const paramsAdditional = 'fl=progressive';

  const params = [
    paramWidth,
    paramHeight,
    paramCrop,
    paramsAdditional,
  ].filter(val => val).join('&');

  return params;
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

      {width >= viewports.sm && viewportKeys.map((identifier, key) => {
        const maxWidth = width || 2560;
        const currentViewport = viewports[identifier];
        const nextViewport = viewportKeys[key - 1] || null;
        const imageSize = viewports[nextViewport] || maxWidth;
        console.log(imageSize);

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
  width: ${props => props.width && `${props.width}px`};
  float: ${props => props.float};
  margin-right: ${props => props.float === 'left' && '8px'};
  margin-bottom: ${props => props.float && '8px'};
  margin-left: ${props => props.float === 'right' && '8px'};
  background-color: ${props => props.color};
`;
