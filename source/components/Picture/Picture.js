import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const pictureViewports = [
  700,
  600,
  500,
  400,
];

const Picture = ({
  className, imageSrc, imageAlt, title, width, float,
}) => (
  <picture>
    { width >= 400 && [
      pictureViewports.map((viewport) => {
        if (viewport >= width) return null;
        return (
          <source
            srcSet={`
              ${imageSrc}?w=${(viewport + 100)}&fl=progressive 1x,
              ${imageSrc}?w=${(viewport + 100) * 2}&fl=progressive 2x
            `}
            media={`(min-width: ${viewport}px)`}
            key={viewport} />
        );
      }),
      <source
        srcSet={`
          ${imageSrc}?w=${400}&fl=progressive 1x,
          ${imageSrc}?w=${400 * 2}&fl=progressive 2x
        `}
        key={400} />,
    ]}

    { width < 400 && [
      <source
        srcSet={`
          ${imageSrc}?w=${width}&fl=progressive 1x,
          ${imageSrc}?w=${width * 2}&fl=progressive 2x
        `}
        key={width} />,
    ]}

    <img
      className={className}
      src={`${imageSrc}?w=${width}&fl=progressive`}
      alt={imageAlt}
      title={title}
      key="img" />
  </picture>
);

Picture.defaultProps = {
  className: null,
  title: null,
  width: 700,
  float: null,
};

Picture.propTypes = {
  className: PropTypes.string,
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  title: PropTypes.string,
  width: PropTypes.number,
  float: PropTypes.string,
};

export default styled(Picture)`
  max-width: ${props => props.width && `${props.width}px`};
  float: ${props => props.float};
  margin-right: ${props => props.float === 'left' && '8px'};
  margin-bottom: ${props => props.float && '8px'};
  margin-left: ${props => props.float === 'right' && '8px'};
`;
