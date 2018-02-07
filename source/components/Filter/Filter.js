import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './Filter.css';

const Filter = ({ tags, activeTag }) => {
  if (!tags) return false;
  return (
    <form className="Filter js-Filter u-whiteBox u-boxPadding">
      <div className="Filter-items">
        <a className={cn('Filter-item', { 'is-current': !activeTag })} href="/tag">all</a>
        {tags && tags.map(tag => (
          <a
            className={cn('Filter-item', { 'is-current': tag === activeTag })}
            href={`/tag/${tag}`}
            key={tag}>
            {tag}
          </a>
        ))}
      </div>
    </form>
  );
};

Filter.propTypes = {
  tags: PropTypes.array,
  activeTag: PropTypes.string,
};

export default Filter;
