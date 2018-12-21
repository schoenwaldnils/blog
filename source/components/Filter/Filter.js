import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import cn from 'classnames';
import './Filter.css';

const Filter = ({ tags, activeTag }) => (
  <form className="Filter js-Filter u-maxWidth">
    <div className="Filter-items">
      <a className={cn('Filter-item', { 'is-current': !activeTag })} href="/tag">all</a>
      {tags && tags.map(tag => (
        <Link href={`/tag/${tag}`} key={tag}>
          <a className={cn('Filter-item', { 'is-current': tag === activeTag })}>
            {tag}
          </a>
        </Link>
      ))}
    </div>
  </form>
);

Filter.defaultProps = {
  activeTag: null,
};

Filter.propTypes = {
  tags: PropTypes.array.isRequired,
  activeTag: PropTypes.string,
};

export default Filter;
