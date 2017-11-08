import React from 'react'
import PropTypes from 'prop-types'

const InstrumentPresenter = (props) => {
  const alt = 'Click here to set the instrument to be ' + props.formatted_name
  const classes = props.active_instrument === props.name ? 'active instrument' : 'instrument'
  return (
    <button id={props.name} onClick={()=> {
      props.setInstrument(props.name)
    }} className={classes}>
      <div title={alt} className={props.name + ' img'}></div>
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