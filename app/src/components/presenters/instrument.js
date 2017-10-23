import React from 'react'
import PropTypes from 'prop-types'

const InstrumentPresenter = (props) => {
  const img_src = '/images/instruments/' + props.name + '.png'
  const alt = 'Click here to set the instrument to be ' + props.formatted_name
  const classes = props.active_instrument === props.instrument ? 'active instrument' : 'instrument'
  return (
    <button id={props.name} onClick={props.setInstrument} className={classes}>
      <div style={{backgroundImage: 'url('+img_src+')'}} title={props.formatted_name} className='img'></div>
      <span>{props.formatted_name}</span>
    </button>
  )
}

InstrumentPresenter.propTypes = {
  name: PropTypes.string.isRequired,
  formatted_name: PropTypes.string.isRequired,
  setInstrument: PropTypes.func.isRequired
}

export default InstrumentPresenter