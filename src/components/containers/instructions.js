import { connect } from 'react-redux'
import InstructionsPresenter from '../presenters/instructions'
import { toggleInstructions } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    is_visible: state.instructions.visibility
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    hideInstructions: ()=> {
      dispatch(toggleInstructions(false))
    }
  }
}

const Instructions = connect(mapStateToProps,mapDispatchToProps)(InstructionsPresenter)

export default Instructions