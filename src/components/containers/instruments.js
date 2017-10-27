import { connect } from 'react-redux'
import InstrumentsPresenter from '../presenters/instruments'

const mapStateToProps = (state, ownProps) => {
  return {
    window_width: state.header.window_width,
    instruments: [
      {
        name: 'drums',
        formatted_name: "Goron Drums"
      }, {
        name: 'flute',
        formatted_name: "Skull Kid's Flute"
      }, {
        name: 'frog',
        formatted_name: "Frog Choir"
      }, {
        name: 'guitar',
        formatted_name: "Zora's Guitar"
      }, {
        name: 'harp',
        formatted_name: "Shiek's Harp"
      }, {
        name: 'impa',
        formatted_name: "Impa's Whistle"
      }, {
        name: 'malon',
        formatted_name: "Malon's Voice"
      }, {
        name: 'music_box',
        formatted_name: "Windmill Guy's Music Box"
      }, {
        name: 'ocarina',
        formatted_name: 'Ocarina'
      }, {
        name: 'pipes',
        formatted_name: "Deku Pipes"
      }
    ]
  }
}

const Instruments = connect(mapStateToProps)(InstrumentsPresenter)

export default Instruments