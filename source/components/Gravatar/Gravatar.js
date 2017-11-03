import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import gravatarUrl from '../../js/utils/gravatar-url';

const Gravatar = ({ className, email, size }) => (
  <picture>
    <source srcSet={gravatarUrl(email, size * 2)} media="(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)" />
    <source srcSet={gravatarUrl(email, size * 1.5)} media="(-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi)" />
    <img className={className} src={gravatarUrl(email, size)} alt="Gravatar Avatar" />
  </picture>
);

Gravatar.defaultProps = {
  className: null,
  size: 100,
};

Gravatar.propTypes = {
  className: PropTypes.string,
  email: PropTypes.string.isRequired,
  size: PropTypes.number,
};

export default styled(Gravatar)`
  width: ${props => props.size}px;
`;
