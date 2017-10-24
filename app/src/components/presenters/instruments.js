import React from 'react'
import PropTypes from 'prop-types'

import Instrument from '../containers/instrument'
import { Scrollbars } from 'react-custom-scrollbars'

import '../../styles/instruments.css'

const InstrumentsPresenter = (props) => {
  return (
    <div id="instruments">
      <Scrollbars renderTrackVertical={({ style, ...scrollbar_props }) =>
            <div {...scrollbar_props} className="instruments-list-scrollbar-track" style={{ ...style, height: '100%', backgroundColor: 'transparent', left: 'auto', right: '0' }}/>
        } renderThumbVertical={({ style, ...scrollbar_props }) =>
        <div {...scrollbar_props} style={{ ...style, backgroundColor: 'black' }}/>
    } renderView={props => <div {...props} className="instrument-list"/>} style={{ width: '8rem', height: '100%' }}>
          { props.instruments.map((instrument, index)=> {
            return <Instrument key={index} {...instrument}/>
          }) }
      </Scrollbars>
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