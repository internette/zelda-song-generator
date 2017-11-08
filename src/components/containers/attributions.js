import { connect } from 'react-redux'
import AttributionsPresenter from '../presenters/attributions'
import { toggleModal } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    is_attributions_visible: state.modals.modal_name === 'attributions' ? state.modals.visibility : false
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    hideAttributions: ()=> {
      dispatch(toggleModal(false, 'attributions'))
    }
  }
}

const Attributions = connect(mapStateToProps,mapDispatchToProps)(AttributionsPresenter)

export default Attributions