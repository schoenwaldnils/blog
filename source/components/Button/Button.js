import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './Button.css';

const Button = ({
  children, type, className, ...props
}) => {
  const classNameList = cn(
    'Button',
    { [`Button--${type}`]: type },
    [className],
    'u-whiteBox',
  );

  return (
    <button
      className={classNameList}
      {...props}
      type="button">
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: null,
  className: null,
};

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
};

export default Button;
