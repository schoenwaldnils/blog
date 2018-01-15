import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const getParams = (width, height = false, retina = false) => {
  const paramWidth = `w=${retina ? width * 2 : width}`;
  const paramHeight = height ? `h=${retina ? height * 2 : height}` : '';
  const paramCrop = height ? 'fit=fill' : '';
  const paramsAdditional = 'fl=progressive';

  const params = [
    paramWidth,
    paramHeight,
    paramCrop,
    paramsAdditional,
  ].join('&');

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

  return (
    <picture>
      <source
        srcSet={`
          ${imageSrc}?${getParams(width, height)} 1x,
          ${imageSrc}?${getParams(width, height, true)} 2x
        `}
        key={width} />

      <img
        className={className}
        src={`${imageSrc}?${getParams(width, height)}`}
        alt={imageAlt}
        title={title}
        key="img" />
    </picture>
  );
};

Picture.defaultProps = {
  className: null,
  title: null,
  width: 1920,
  height: null,
  color: null,
  float: null,
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
