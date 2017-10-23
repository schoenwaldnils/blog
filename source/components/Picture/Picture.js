import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { viewports, viewportsJs } from '../../js/viewports';

const Picture = ({
  className, imageSrc, imageAlt, title, width, align,
}) => (
  <picture>
    { width >= viewports.sm &&
      <source
        srcSet={`${imageSrc}?w=${width * 2}&fl=progressive`}
        media={`${viewportsJs.sm}, (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)`} />
    }

    { width >= viewports.sm ?
      <source
        srcSet={`${imageSrc}?w=962&fl=progressive`}
        media="(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)" /> :
      <source
        srcSet={`${imageSrc}?w=${width * 2}&fl=progressive`}
        media="(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)" />
    }


    { width >= viewports.sm &&
      <source
        srcSet={`${imageSrc}?w=${width * 1.5}&fl=progressive`}
        media={`${viewportsJs.sm}, (-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi)`} />
    }

    { width >= viewports.sm ?
      <source
        srcSet={`${imageSrc}?w=722&fl=progressive`}
        media="(-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi)" /> :
      <source
        srcSet={`${imageSrc}?w=${width * 1.5}&fl=progressive`}
        media="(-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi)" />
    }

    <img
      className={className}
      src={`${imageSrc}?w=${width}&fl=progressive`}
      alt={imageAlt}
      title={title} />
  </picture>
);

Picture.defaultProps = {
  className: null,
  title: null,
  width: 700,
  align: null,
};

Picture.propTypes = {
  className: PropTypes.string,
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  title: PropTypes.string,
  width: PropTypes.number,
  align: PropTypes.string,
};

export default styled(Picture)`
  max-width: ${props => props.width && `${props.width}px`};
  float: ${props => props.align};
  margin-left: ${props => props.align === 'right' && 'var(--space-medium-px)'};
`;
