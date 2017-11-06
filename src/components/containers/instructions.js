import { connect } from 'react-redux'
import InstructionsPresenter from '../presenters/instructions'
import { toggleModal } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    is_visible: state.modals.modal_name === 'instructions' ? state.modals.visibility : false
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    hideInstructions: ()=> {
      dispatch(toggleModal(false, 'instructions'))
    }
  }
}

const Instructions = connect(mapStateToProps,mapDispatchToProps)(InstructionsPresenter)

export default Instructions