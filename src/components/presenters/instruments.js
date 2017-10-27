import React from 'react'
import PropTypes from 'prop-types'

import Instrument from '../containers/instrument'
import { Scrollbars } from 'react-custom-scrollbars'

import '../../styles/instruments.css'

const InstrumentsPresenter = (props) => {
  let content = null
  if(props.window_width > 768){
    content = <Scrollbars renderTrackVertical={({ style, ...scrollbar_props }) => <div {...scrollbar_props} className="instruments-list-scrollbar-track" style={{...style, height: '96%', width: '12px', left: 'auto', top: '2%', right: '3px'}}/> } renderThumbVertical={({ style, ...scrollbar_props }) => <div {...scrollbar_props} style={{ ...style }}/>} style={{width: '8.5rem', height: '100%'}}><div className="instrument-list">{ props.instruments.map((instrument, index)=> {return <Instrument key={index} {...instrument}/>}) }</div></Scrollbars>
  } else {
    content = <Scrollbars renderTrackVertical={() => <div/>} renderThumbVertical={() => <div/>} renderTrackHorizontal={({ style, ...scrollbar_props }) => <div {...scrollbar_props} className="instruments-list-scrollbar-track" style={{...style, height: '12px', width: '96%', left: '2%', right: 'auto', top: 'auto', bottom: '3px' }}/>} renderThumbHorizontal={({ style, ...scrollbar_props }) => <div {...scrollbar_props} style={{ ...style }}/>} style={{height: '8.75rem', width: '100%', whiteSpace: 'nowrap'}}><div className="instrument-list">{ props.instruments.map((instrument, index)=> {return <Instrument key={index} {...instrument}/>}) }</div></Scrollbars>
  }
  return (
    <div id="instruments">
      {content}
    </div>
  )
}

InstrumentsPresenter.propTypes = {
  window_width: PropTypes.number.isRequired,
  instruments: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    formatted_name: PropTypes.string.isRequired
  }).isRequired).isRequired,
}


export default InstrumentsPresenter