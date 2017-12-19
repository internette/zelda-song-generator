const musicSheet = (state = {}, action)=> {
  switch (action.type){
    case 'set-notes':
      return Object.assign({}, state, {
        notes: action.notes.slice(0)
      })
    default: 
      return state
  }
}

export default musicSheet