import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import classNames from 'classnames';
import stylesheet from './Filter.css';

const Filter = ({ tags, activeTag }) => {
  if (!tags) return false;
  return [
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} key="filter-style" />,
    <form className="Filter js-Filter u-whiteBox u-boxPadding" key="filter" >
      <div className="Filter-items">
        <a className={classNames('Filter-item', { 'is-current': !activeTag })} href="/tag">all</a>
        {tags && tags.map(tag => (
          <Link href={`/tag/${tag}`} key={tag} >
            <a className={classNames('Filter-item', { 'is-current': tag === activeTag })}>{tag}</a>
          </Link>
        ))}
      </div>
    </form>,
  ];
};

Filter.propTypes = {
  tags: PropTypes.array,
  activeTag: PropTypes.string,
};

export default Filter;
