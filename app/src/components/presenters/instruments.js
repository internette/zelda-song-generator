import React from 'react'
import PropTypes from 'prop-types'

import Instrument from '../containers/instrument'

import '../../styles/instruments.css'

const InstrumentsPresenter = (props) => {
  return (
    <div id="instruments">
      { props.instruments.map((instrument, index)=> {
        return <Instrument key={index} {...instrument}/>
      }) }
    </div>
  )
}

InstrumentsPresenter.propTypes = {
  instruments: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    formatted_name: PropTypes.string.isRequired
  }).isRequired).isRequired,
}


export default InstrumentsPresenter