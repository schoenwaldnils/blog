import React from 'react';
import classNames from 'classnames';
import stylesheet from './Nav.css';

const navItems = [
  {
    text: 'Home',
    href: '/',
  }, {
    text: 'About',
    href: '/about/',
  },
];

const isCurrent = false;

const Nav = () => (
  <nav className="Nav">
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <ul className="Nav-list">
      {navItems.map(item => (
        <li className={classNames('Nav-item', { 'is-current': isCurrent })} key={item.text}>
          <a className="Nav-link" href={item.href}>{item.text}</a>
        </li>
      ))}
    </ul>
  </nav>
);
export default Nav;
