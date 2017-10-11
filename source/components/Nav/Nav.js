import React from 'react';
import Link from 'next/link';
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
          <Link href={item.href} prefetch>
            <a className="Nav-link">{item.text}</a>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);
export default Nav;
