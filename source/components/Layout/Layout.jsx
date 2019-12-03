import React from 'react'
import PropTypes from 'prop-types'

import Header from '../Header/Header'
import Filter from '../Filter/Filter'
import Footer from '../Footer/Footer'

import './Layout.css'

const Layout = ({ type, tags, activeTag, children }) => {
  return (
    <>
      <Header className={`Header--${type}`} />
      {tags && <Filter activeTag={activeTag} tags={tags} />}
      <main className="Layout" role="main">
        {children}
      </main>
      <Footer />
    </>
  )
}

Layout.defaultProps = {
  type: undefined,
  tags: undefined,
  activeTag: undefined,
}

Layout.propTypes = {
  type: PropTypes.string,
  tags: PropTypes.array,
  activeTag: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
}

export default Layout
