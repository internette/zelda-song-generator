import React from 'react'
import PropTypes from 'prop-types'

const InstrumentPresenter = (props) => {
  const img_src = '/images/instruments/' + props.name + '.png'
  const alt = 'Click here to set the instrument to be ' + props.formatted_name
  const classes = props.active_instrument === props.instrument ? 'active' : ''
  return (
    <button onClick={props.setInstrument} className={classes}>
      <img src={img_src} alt={props.formatted_name}/>
    </button>
  )
}

InstrumentPresenter.propTypes = {
  name: PropTypes.string.isRequired,
  formatted_name: PropTypes.string.isRequired,
  setInstrument: PropTypes.func.isRequired
}

export default InstrumentPresenter