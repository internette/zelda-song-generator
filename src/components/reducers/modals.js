const modals = (state = {}, action)=> {
  switch (action.type){
    case 'toggle-modal':
      return Object.assign({}, state, {
        visibility: action.visibility,
        modal_name: action.modal_name
      })
    default: 
      return Object.assign({}, state, {
        visibility: false,
        modal_name: ''
      })
  }
}

export default modals

