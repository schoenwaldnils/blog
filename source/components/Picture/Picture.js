import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { viewports, viewportsJs } from '../../js/viewports';

const Picture = ({
  className, imageSrc, imageAlt, size,
}) => (
  <picture>
    {size >= viewports.sm &&
      <source
        srcSet={`${imageSrc}?w=${size * 2}&fl=progressive`}
        media={`${viewportsJs.sm}, (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)`} />
    }
    <source
      srcSet={`${imageSrc}?w=962&fl=progressive`}
      media="(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)" />


    {size >= viewports.sm &&
      <source
        srcSet={`${imageSrc}?w=${size * 1.5}&fl=progressive`}
        media={`${viewportsJs.sm}, (-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi)`} />
    }
    <source
      srcSet={`${imageSrc}?w=722&fl=progressive`}
      media="(-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi)" />

    <img
      className={className}
      src={`${imageSrc}?w=${size}&fl=progressive`}
      alt={imageAlt} />
  </picture>
);

Picture.defaultProps = {
  className: null,
  size: 700,
};

Picture.propTypes = {
  className: PropTypes.string,
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  size: PropTypes.number,
};

export default styled(Picture)`
  max-width: ${props => props.size}px;
`;
