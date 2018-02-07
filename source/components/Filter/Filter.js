import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './Filter.css';

const Filter = ({ tags, activeTag }) => (
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

Filter.defaultProps = {
  activeTag: null,
};

Filter.propTypes = {
  tags: PropTypes.array.isRequired,
  activeTag: PropTypes.string,
};

export default Filter;
