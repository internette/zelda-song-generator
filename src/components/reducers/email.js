const email = (state = {}, action)=> {
  switch (action.type){
    case 'set-email':
      return Object.assign({}, state, {
        address: action.email_address
      })
    default: 
      return state
  }
}

export default email