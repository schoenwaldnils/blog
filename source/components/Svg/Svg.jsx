import React from 'react'
import PropTypes from 'prop-types'

import SchoenwaldLogo from './svgs/schoenwald-logo.svg'

const Svg = ({ name }) => {
  switch (name) {
    case 'schoenwald-logo':
      return <SchoenwaldLogo className="Svg Svg--schoenwaldLogo" />
    default:
      return null
  }
}

Svg.propTypes = {
  name: PropTypes.string.isRequired,
}

export default Svg
