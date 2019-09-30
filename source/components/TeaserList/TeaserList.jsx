import React from 'react'
import PropTypes from 'prop-types'
import './TeaserList.css'

export const TeaserList = ({ children }) => (
  <div className="TeaserList">{children}</div>
)

TeaserList.propTypes = {
  children: PropTypes.any.isRequired,
}

export const TeaserListChild = ({ children, href }) => (
  <a className="TeaserList-item" href={href}>
    {children}
  </a>
)

TeaserListChild.propTypes = {
  children: PropTypes.any.isRequired,
  href: PropTypes.any.isRequired,
}
