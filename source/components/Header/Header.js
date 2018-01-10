import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import stylesheet from './Header.css';
import SchoenwaldLogo from '../Svg/svgs/schoenwald-logo.svg';

const Header = ({ className }) => {
  const classNames = cn(
    'Header',
    className,
  );
  return [
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} key="header-styles" />,
    <header className={classNames} key="header-content">
      <a className="Header-logo" href="/">
        <SchoenwaldLogo className="Svg" />
      </a>
    </header>,
  ];
};

Header.defaultProps = {
  className: null,
};

Header.propTypes = {
  className: PropTypes.string,
};


export default Header;
