const instructions = (state = {}, action)=> {
  switch (action.type){
    case 'toggle-instructions':
      return Object.assign({}, state, {
        visibility: action.visibility
      })
    default: 
    return Object.assign({}, state, {
      visibility: false
    })
  }
}

export default instructions