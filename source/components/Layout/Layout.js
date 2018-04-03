import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Header from '../Header/Header';
import Filter from '../Filter/Filter';
import Footer from '../Footer/Footer';

import './Layout.css';

const Layout = ({
  type,
  tags,
  activeTag,
  children,
}) => {
  return (
    <Fragment>
      <Header className={`Header--${type}`} />
      {tags && <Filter activeTag={activeTag} tags={tags} />}
      <section className="Layout" role="main">
        { children }
      </section>
      <Footer />
    </Fragment>
  );
};

Layout.defaultProps = {
  type: undefined,
  tags: undefined,
  activeTag: undefined,
};

Layout.propTypes = {
  type: PropTypes.string,
  tags: PropTypes.array,
  activeTag: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
};

export default Layout;
