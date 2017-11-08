import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import stylesheet from './Button.css';

const Button = ({
  children, id, className, ...props
}) => {
  const classNameList = cn(
    'Button',
    { [`Button--${id}`]: id },
    [className],
    'u-whiteBox',
  );

  return [
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />,
    <a className={classNameList} {...props}>{children}</a>,
  ];
};

Button.defaultProps = {
  id: null,
};

Button.propTypes = {
  id: PropTypes.string,
  children: PropTypes.any.isRequired,
};

export default Button;
