const header = (state = {}, action)=> {
  switch (action.type){
    case 'set-title':
      return Object.assign({}, state, {
        title: action.title
      })
    case 'store-window-width':
      return Object.assign({}, state, {
        window_width: action.width
      })
    default: 
      return state
  }
}

export default header