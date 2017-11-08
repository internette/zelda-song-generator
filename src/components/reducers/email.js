const email = (state = {}, action)=> {
  switch (action.type){
    case 'set-email':
      return Object.assign({}, state, {
        address: action.email_address
      })
    case 'set-visible-text':
      console.log('this was called')
      return Object.assign({}, state, {
        visible_text: action.visible_text
      })
    default: 
      return state
  }
}

export default email