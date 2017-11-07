import { connect } from 'react-redux'
import InstrumentPresenter from '../presenters/instrument'
import { setInstrument } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    name: ownProps.name ? ownProps.name : '',
    formatted_name: ownProps.formatted_name ? ownProps.formatted_name : '',
    active_instrument: state.instrument.name
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setInstrument: (instrument)=> {
      dispatch(setInstrument(instrument))
    }
  }
}

const Instrument = connect(mapStateToProps,mapDispatchToProps)(InstrumentPresenter)

export default Instrument