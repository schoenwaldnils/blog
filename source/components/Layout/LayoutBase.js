import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import '../../css/index.css';
import Header from '../Header/Header';
import Content from '../Content/Content';
import Footer from '../Footer/Footer';

const LayoutBase = ({ children }) => (
  <Fragment>
    <Header />
    <Content>
      { children }
    </Content>
    <Footer />
  </Fragment>
);

LayoutBase.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutBase;
