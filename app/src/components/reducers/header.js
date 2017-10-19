const header = (state = {}, action)=> {
  switch (action.type){
    case 'set-title':
      return Object.assign({}, state, {
        title: action.title
      })
    default: 
      return state
  }
}

export default header