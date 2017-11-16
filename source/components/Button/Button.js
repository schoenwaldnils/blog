import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import stylesheet from './Button.css';

const Button = ({
  children, type, className, ...props
}) => {
  const classNameList = cn(
    'Button',
    { [`Button--${type}`]: type },
    [className],
    'u-whiteBox',
  );

  return [
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} key="button-style" />,
    <button className={classNameList} {...props} key="button-button">{children}</button>,
  ];
};

Button.defaultProps = {
  type: null,
};

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.any.isRequired,
};

export default Button;
