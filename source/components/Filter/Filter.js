import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import classNames from 'classnames';
import stylesheet from './Filter.css';

const Filter = ({ tags, activeTag }) => [
  <style dangerouslySetInnerHTML={{ __html: stylesheet }} />,
  <form className="Filter js-Filter u-whiteBox u-boxPadding">
    <div className="Filter-items">
      <div className="Filter-item Filter-reset">all</div>
      {tags && tags.map(tag => (
        <Link href={`/tag/${tag}`} >
          <a className={classNames('Filter-item', 'Filter-label', { 'is-current': tag === activeTag })}>{tag}</a>
        </Link>
      ))}
    </div>
  </form>,
];

Filter.propTypes = {
  tags: PropTypes.array.isRequired,
  activeTag: PropTypes.string,
};

export default Filter;
