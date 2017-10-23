const musicSheet = (state = {}, action)=> {
  switch (action.type){
    case 'set-notes':
      return Object.assign({}, state, {
        notes: action.notes
      })
    case 'set-audio-filename':
      return Object.assign({}, state, {
        filename: action.filename
      })
    default: 
      return state
  }
}

export default musicSheet