import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import stylesheet from './Grid.css';

export const Grid = ({ withGutter, children }) => (
  <div className={classNames('Grid', { 'Grid--withGutter': withGutter })}>
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    { children }
  </div>
);

Grid.defaultProps = {
  withGutter: false,
};

Grid.propTypes = {
  withGutter: PropTypes.bool,
  children: PropTypes.func.isRequired,
};

export const GridCell = ({ sm, children }) => (
  <div className={classNames('Grid-cell', { [`u-sm-size${sm}`]: sm })}>
    { children }
  </div>
);

GridCell.defaultProps = {
  sm: false,
};

GridCell.propTypes = {
  sm: PropTypes.string,
  children: PropTypes.func.isRequired,
};

export default {
  Grid,
  GridCell,
};
