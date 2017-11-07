const musicSheet = (state = {}, action)=> {
  switch (action.type){
    case 'set-notes':
      return Object.assign({}, state, {
        notes: action.notes
      })
    default: 
      return state
  }
}

export default musicSheet